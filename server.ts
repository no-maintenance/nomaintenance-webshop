// @ts-ignore
// Virtual entry point for the app
import * as remixBuild from 'virtual:remix/server-build';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createCustomerAccountClient,
  createStorefrontClient,
  storefrontRedirect,
} from '@shopify/hydrogen';
import type {
  CountryCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';

import {AppSession} from '~/lib/session';
import {subfolderLocaleParser} from '~/lib/utils';
import {getI18n} from '~/i18n/server';
import {createHygraphClient} from '~/lib/createHygraphClient.server';

import defaultCountry from './public/locales/country/US.json';
import defaultLanguage from './public/locales/language/en.json';

import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {HYGRAPH_CACHE_NAME} from '~/lib/const';

const DEFAULT_I18N = {
  isDefault: true,
  country: defaultCountry,
  language: defaultLanguage,
  prefix: subfolderLocaleParser({
    country: defaultCountry.code as CountryCode,
    language: defaultLanguage.code as LanguageCode,
  }),
};
/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      /**
       * Open a cache instance in the worker and a custom session instance.
       */
      if (!env?.SESSION_SECRET) {
        throw new Error('SESSION_SECRET environment variable is not set');
      }

      const [cache, session] = await Promise.all([
        caches.open('hydrogen'),
        AppSession.init(request, [env.SESSION_SECRET]),
      ]);
      const waitUntil = (promise: Promise<unknown>) =>
        executionContext.waitUntil(promise);

      // @ts-ignore
      const {i18n, i18nSfApi} = await getI18n<typeof DEFAULT_I18N>({
        cache,
        defaultI18n: DEFAULT_I18N,
        prefixParser: subfolderLocaleParser,
        request,
        strategy: 'subfolder',
        waitUntil,
      });

      /**
       * Create Hydrogen's Storefront client.
       */
      const {storefront} = createStorefrontClient({
        cache,
        waitUntil,
        i18n: i18nSfApi,
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
      });
      const hygraph = createHygraphClient({
        env,
        cache: await caches.open(HYGRAPH_CACHE_NAME),
        waitUntil,
        request,
      });
      /**
       * Create a client for Customer Account API.
       */
      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        shopId: env.SHOP_ID,
      });

      /*
       * Create a cart handler that will be used to
       * create and update the cart in the session.
       */
      const cart = createCartHandler({
        storefront,
        customerAccount,
        getCartId: cartGetIdDefault(request.headers),
        setCartId: cartSetIdDefault(),
        cartQueryFragment: CART_QUERY_FRAGMENT,
      });
      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          session,
          waitUntil,
          i18n,
          storefront,
          customerAccount,
          cart,
          env,
          hygraph,
        }),
      });

      const response = await handleRequest(request);
      if (session.isPending) {
        response.headers.set('Set-Cookie', await session.commit());
      }
      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
