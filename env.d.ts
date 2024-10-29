/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {
  CustomerAccount,
  HydrogenCart,
  HydrogenEnv,
  HydrogenSessionData,
  Storefront,
} from '@shopify/hydrogen';
import type {AppSession} from '~/lib/session';
import {createHygraphClient} from '~/lib/createHygraphClient.server';
import {I18n} from '~/i18n';
import {createAppLoadContext} from '~/lib/context';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {
    env: {
      SENTRY_AUTH_TOKEN: string | undefined;
      SENTRY_DSN: string;
      NODE_ENV: 'production' | 'development';
      DEBUG_TRACKING: boolean | undefined;
    };
  };

  interface Window {
    klaviyo: any;
    fbq: (...args: any[]) => void;
    dataLayer: any;
    gtag: Gtag.Gtag;
  }

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env extends HydrogenEnv {
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
    KLAVIYO_PRIVATE_KEY: string;
    META_PIXEL_ID: string;
    GA4_ID: string;
    PINTEREST_ID: string;
    DEBUG_TRACKING: string;
  }
}

declare module '@shopify/remix-oxygen' {
  interface AppLoadContext
    extends Awaited<ReturnType<typeof createAppLoadContext>> {
    i18n: I18n;
    hygraph: ReturnType<typeof createHygraphClient>;
    // to change context type, change the return of createAppLoadContext() instead
  }

  interface SessionData extends HydrogenSessionData {
    // declare local additions to the Remix session data here
  }
}
