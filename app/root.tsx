import {captureRemixErrorBoundaryError} from '@sentry/remix';
import type {SeoConfig} from '@shopify/hydrogen';
import {
  Analytics,
  CacheLong,
  getSeoMeta,
  getShopAnalytics,
  Script,
  useNonce,
} from '@shopify/hydrogen';
import type {
  LoaderFunctionArgs,
  MetaArgs,
  SerializeFrom,
} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  useLoaderData,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import appStyles from './styles/app.css?url';
import customFont from './styles/custom-font.css?url';
import appleTouchIcon from './assets/apple-touch-icon.png';
import chromeShortcutIcon from './assets/android-chrome-512x512.png';
import favicon32 from './assets/favicon-32x32.png';
import type {GetThemesQuery} from '~/__generated__/hygraph.generated';
import {
  ChildThemeContext,
  createRootThemeCss,
  DEFAULT_CHILD_THEME,
  GLOBAL_DEFAULT_VALUE,
  GlobalThemeContext,
  ThemeConsumer,
} from '~/components/ui/theme';
import {seoPayload} from '~/lib/seo.server';
import {Toaster} from '~/components/ui/toaster';
import {SEO_PLACEHOLDER} from '~/lib/const';
import {Pixels} from '~/components/analytics/CustomAnalytics';
import yn from 'yn'; // import {parseAcceptLanguage} from 'intl-parse-accept-language';

// import {parseAcceptLanguage} from 'intl-parse-accept-language';
// import {parseAcceptLanguage} from 'intl-parse-accept-language';
/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: customFont},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon32},
    {rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIcon},
    {rel: 'shortcut icon', sizes: '512x512', href: chromeShortcutIcon},
  ];
}

/**
 * Access the result of the root loader from a React component.
 */
export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront, customerAccount, session, cart} = context;
  const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN;
  const shopPromise = storefront.query(LAYOUT_QUERY, {
    variables: {
      language: context.i18n.language.code,
    },
  });

  // const acceptsLang = request.headers.get('accept-language');
  // const switchedDefaultLocale = session.get('switched-default-locale');
  // if (acceptsLang && !switchedDefaultLocale) {
  //   const preferredLocale = parseAcceptLanguage(acceptsLang, {
  //     validate: Intl.DateTimeFormat.supportedLocalesOf,
  //   });
  //   console.log(preferredLocale);
  // }

  const isLoggedInPromise = customerAccount.isLoggedIn();
  const cartPromise = cart.get();
  const navigations = context.hygraph.query(CacheLong()).GetNavigations();
  const themesPromise = context.hygraph.query(CacheLong()).GetThemes();
  const [tData, sData] = await Promise.all([themesPromise, shopPromise]);
  const seo = seoPayload.root({shop: sData.shop, url: request.url});
  return defer(
    {
      seo,
      cart: cartPromise,
      navigations,
      isLoggedIn: isLoggedInPromise,
      publicStoreDomain,
      shop: getShopAnalytics({
        storefront,
        publicStorefrontId: context.env.PUBLIC_STOREFRONT_ID,
      }),
      i18n: context.i18n,
      themes: tData,
      consent: {
        checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
        storefrontAccessToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
        // localize the privacy banner
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
      analyticsTokens: {
        gtm: context.env.GOOGLE_TAG_MANAGER_ID,
        klaviyo: context.env.KLAVIYO_COMPANY_ID,
        ga4: context.env.GA4_ID,
        meta: context.env.META_PIXEL_ID,
        pinterest: context.env.PINTEREST_ID,
      },
      ENV: {
        DEBUG_TRACKING: yn(context.env.DEBUG_TRACKING, {default: false}),
        NODE_ENV: process.env.NODE_ENV,
      },
    },
    {
      headers: {
        // // enable partytown atomic mode
        // // @see: https://partytown.builder.io/atomics
        // 'Cross-Origin-Embedder-Policy': 'credentialless',
        // 'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  );
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  const seo = data?.seo || SEO_PLACEHOLDER;
  return getSeoMeta(seo as SeoConfig);
};

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();
  return (
    <Document
      nonce={nonce}
      lang={data?.i18n?.language?.code}
      themes={data?.themes}
      tokens={data?.analyticsTokens}
    >
      <Analytics.Provider
        cart={data.cart}
        shop={data.shop}
        consent={data.consent}
      >
        <Outlet />
        <Script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: data.ENV,
            })}`,
          }}
        />
        <Pixels tokens={data?.analyticsTokens} nonce={nonce} />
      </Analytics.Provider>
    </Document>
  );
}

// export default withSentry(App); @TODO investigate why this breaks miniflare build in production

export function Document({
  children,
  nonce = '',
  lang = 'en',
  env = {},
  allowIndexing = true,
  direction = 'ltr',
  themes,
  tokens,
}: {
  themes?: GetThemesQuery;
  children: React.ReactNode;
  nonce?: string;
  lang?: string;
  env?: Record<string, string>;
  allowIndexing?: boolean;
  direction?: 'ltr' | 'rtl';
  tokens: {
    gtm?: string;
    klaviyo?: string;
    meta?: string;
    ga4?: string;
    pinterest?: string;
  };
}) {
  const t = createRootThemeCss(themes);
  return (
    <html dir={direction} lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
        />
        <meta name="msvalidate.01" content="A352E6A0AF9A652267361BBB572B8468" />
        {allowIndexing ? null : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <Meta />
        <Links />
      </head>
      <GlobalThemeContext.Provider value={t?.themes ?? GLOBAL_DEFAULT_VALUE}>
        <ChildThemeContext.Provider
          value={t?.staticRoots?.normal ?? DEFAULT_CHILD_THEME}
        >
          <ThemeConsumer asChild>
            <body suppressHydrationWarning={true}>
              {children}
              <Toaster />
              <ScrollRestoration nonce={nonce} />
              <Scripts nonce={nonce} />
            </body>
          </ThemeConsumer>
        </ChildThemeContext.Provider>
      </GlobalThemeContext.Provider>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const rootData = useRootLoaderData();
  const nonce = useNonce();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (process.env.NODE_ENV === 'production') {
    captureRemixErrorBoundaryError(error);
  }

  return (
    <Document
      nonce={nonce}
      lang={rootData?.i18n?.language?.code ?? 'en'}
      themes={rootData?.themes}
    >
      <div className="route-error">
        <h1>Oops</h1>
        <h2>{errorStatus}</h2>
        {errorMessage && (
          <fieldset>
            <pre>{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </Document>
  );
}

// const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
//   const RouterContext = getRouterContext();
//
//   const routerContext = useContext(RouterContext);
//
//   const renderedContext = useRef(routerContext);
//
//   const isPresent = useIsPresent();
//
//   if (isPresent) {
//     renderedContext.current = cloneDeep(routerContext);
//   }
//
//   return (
//     <m.div ref={ref} {...transitionProps}>
//       <RouterContext.Provider value={renderedContext.current}>
//         <Outlet />
//       </RouterContext.Provider>
//     </m.div>
//   );
// });
const LAYOUT_QUERY = `#graphql
query layout(
    $language: LanguageCode
) @inContext(language: $language) {
    shop {
        ...Shop
    }

}
fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
        url
    }
    brand {
        logo {
            image {
                url
            }
        }
    }
}
` as const;
