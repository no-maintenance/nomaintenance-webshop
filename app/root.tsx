import type {SeoConfig} from '@shopify/hydrogen';
import {
  CacheLong,
  getSeoMeta,
  getShopAnalytics,
  UNSTABLE_Analytics as Analytics,
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
import invariant from 'tiny-invariant';
import {Toaster} from '~/components/ui/toaster';
import {CustomAnalytics} from '~/components/analytics/CustomAnalytics';
import {Partytown} from '@builder.io/partytown/react';
import {maybeProxyRequest} from '~/lib/utils'; // import {parseAcceptLanguage} from 'intl-parse-accept-language';

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
  invariant(sData?.shop, 'No data returned from Shopify API');
  const seo = seoPayload.root({shop: sData.shop, url: request.url});
  console.log('seo ', JSON.stringify(seo, 4, null));
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
      },
      analyticsTokens: {
        gtm: context.env.GOOGLE_TAG_MANAGER_ID,
        klaviyo: context.env.KLAVIYO_COMPANY_ID,
        ga4: context.env.GA4_ID,
        meta: context.env.META_PIXEL_ID,
      },
    },
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
        // enable partytown atomic mode
        // @see: https://partytown.builder.io/atomics
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  );
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data!.seo as SeoConfig);
};

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();
  return (
    <Document
      nonce={nonce}
      lang={data.i18n.language.code}
      themes={data?.themes}
      tokens={data?.analyticsTokens}
    >
      <Analytics.Provider
        cart={data?.cart}
        shop={data?.shop}
        consent={data?.consent}
      >
        <Outlet />
        <CustomAnalytics />
      </Analytics.Provider>
      {/*<LazyMotion features={domAnimation}>*/}
      {/*  <AnimatePresence mode="popLayout">*/}
      {/*    <AnimatedOutlet key={nextMatch.id} />*/}
      {/*  </AnimatePresence>*/}
      {/*</LazyMotion>*/}
    </Document>
  );
}

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
  tokens?: {
    gtm?: string;
    klaviyo?: string;
    meta?: string;
    ga4?: string;
  };
}) {
  const t = createRootThemeCss(themes);
  return (
    <html dir={direction} lang={lang} className={`h-full`}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta name="msvalidate.01" content="A352E6A0AF9A652267361BBB572B8468" />
        {allowIndexing ? null : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <Partytown
          debug={true}
          forward={[
            'dataLayer.push',
            'gtag',
            'fbq',
            'klaviyo.push',
            'klaviyo.method',
            'klaviyo.identify',
          ]}
          nonce={nonce}
          resolveUrl={maybeProxyRequest}
        />
        {process.env.NODE_ENV === 'development' || !tokens?.gtm ? null : (
          <>
            <noscript>
              <iframe
                title={'google tag manager noscript'}
                src={`https://www.googletagmanager.com/ns.html?id=${tokens?.gtm}`}
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
              />
            </noscript>

            <script
              dangerouslySetInnerHTML={{
                __html: `
                dataLayer = window.dataLayer || [];

                function gtag(){
                  dataLayer.push(arguments)
                };

                gtag('js', new Date());
                gtag('config', "${tokens?.gtm}");
              `,
              }}
            />

            <script
              type="text/partytown"
              dangerouslySetInnerHTML={{
                __html: `
              console.log('Loaded GTM script via partytown 🎉');
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', "${tokens?.gtm}");
            `,
              }}
            />
          </>
        )}
        {process.env.NODE_ENV === 'development' || !tokens?.ga4 ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${tokens.ga4}`}
            ></script>

            <script
              type={'text/partytown'}
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];

                  function gtag(){dataLayer.push(arguments);}

                  gtag('js', new Date());

                  gtag('config', '${tokens.ga4}');
                `,
              }}
            ></script>
          </>
        )}
        {process.env.NODE_ENV === 'development' || !tokens?.klaviyo ? null : (
          <script
            type="text/partytown"
            src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${tokens?.klaviyo}`}
          ></script>
        )}
        {process.env.NODE_ENV === 'development' || !tokens?.meta ? null : (
          <>
            {/* for some reason this breaks the productilon build @TODO — INVESTIGATE */}
            {/*<noscript>*/}
            {/*  <img*/}
            {/*    height="1"*/}
            {/*    width="1"*/}
            {/*    style="display:none"*/}
            {/*    src={`https://www.facebook.com/tr?id=${tokens.meta}&ev=PageView&noscript=1`}*/}
            {/*  />*/}
            {/*</noscript>*/}

            <script
              type={'text/partytown'}
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${tokens.meta}');
            fbq('track', 'PageView');
              `,
              }}
            ></script>
          </>
        )}
        <Meta />
        <Links />
      </head>
      <GlobalThemeContext.Provider value={t?.themes ?? GLOBAL_DEFAULT_VALUE}>
        <ChildThemeContext.Provider
          value={t?.staticRoots?.normal ?? DEFAULT_CHILD_THEME}
        >
          <ThemeConsumer asChild>
            <body>
              {children}
              <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                  __html: `window.ENV = ${JSON.stringify(env)}`,
                }}
              />

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
