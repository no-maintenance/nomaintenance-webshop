import type {SeoConfig} from '@shopify/hydrogen';
import {
  CacheLong,
  getSeoMeta,
  getShopAnalytics,
  useNonce,
} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import type {
  MetaArgs,
  type SerializeFrom,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useMatches,
  useRouteError,
  useLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
import appStyles from './styles/app.css?url';
import customFont from './styles/custom-font.css?url';
import appleTouchIcon from './assets/apple-touch-icon.png';
import chromeShortcutIcon from './assets/android-chrome-512x512.png';
import favicon32 from './assets/favicon-32x32.png';
import type {GetThemesQuery} from '~/__generated__/hygraph.generated';
import {
  createRootThemeCss,
  GLOBAL_DEFAULT_VALUE,
  GlobalThemeContext,
  ChildThemeContext,
  DEFAULT_CHILD_THEME,
  ThemeConsumer,
} from '~/components/ui/theme';
import {seoPayload} from '~/lib/seo.server';
import invariant from 'tiny-invariant';
import {Toaster} from '~/components/ui/toaster';
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
    },
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}
export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data!.seo as SeoConfig);
};

export function Document({
  children,
  nonce = '',
  lang = 'en',
  env = {},
  allowIndexing = true,
  direction = 'ltr',
  themes,
}: {
  themes?: GetThemesQuery;
  children: React.ReactNode;
  nonce?: string;
  lang?: string;
  env?: Record<string, string>;
  allowIndexing?: boolean;
  direction?: 'ltr' | 'rtl';
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
              <ScrollRestoration nonce={nonce} />
              <Scripts nonce={nonce} />
              <Toaster />
            </body>
          </ThemeConsumer>
        </ChildThemeContext.Provider>
      </GlobalThemeContext.Provider>
    </html>
  );
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();
  return (
    <Document
      nonce={nonce}
      lang={data.i18n.language.code}
      themes={data?.themes}
    >
      <Outlet />
    </Document>
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
