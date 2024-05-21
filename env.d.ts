/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {
  Storefront,
  CustomerAccount,
  HydrogenCart,
  HydrogenSessionData,
} from '@shopify/hydrogen';
import type {AppSession} from '~/lib/session';
import {createHygraphClient} from '~/lib/createHygraphClient.server';
import {I18n} from '~/i18n';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};
  interface Window {
    klaviyo: any;
  }
  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    HYGRAPH_ENV: string;
    HYGRAPH_DEV_TOKEN: string;
    HYGRAPH_PROD_TOKEN: string;
    HYGRAPH_URL: string;
    KV_URL: string;
    NOTION_TOKEN: string;
    SENTRY_DSN: string;
    GOOGLE_TAG_MANAGER_ID: string;
    KLAVIYO_COMPANY_ID: string;
  }
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  interface AppLoadContext {
    env: Env;
    cart: HydrogenCart;
    storefront: Storefront;
    customerAccount: CustomerAccount;
    session: AppSession;
    waitUntil: ExecutionContext['waitUntil'];
    i18n: I18n;
    hygraph: ReturnType<typeof createHygraphClient>;
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}
