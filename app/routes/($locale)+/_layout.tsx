import type {ShouldRevalidateFunction} from '@remix-run/react';
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type {
  AppLoadContext,
  LoaderFunctionArgs,
  SerializeFrom,
} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {useRouteLoaderData} from 'react-router';
import {CacheLong, useNonce} from '@shopify/hydrogen';

// import LockLayout from '~/components/LockLayout';
import {getLock, isHome} from '~/lib/locks.server';
import {GenericError, NotFound} from '~/components/Error';
import type {
  LayoutConfigFragment,
  LockFragment,
  Maybe,
} from '~/__generated__/hygraph.generated';
import {FooterStyle, HeaderStyle} from '~/__generated__/hygraph.generated';
import type {LayoutConfig} from '~/components/Layout';
import {Layout} from '~/components/Layout';
import {
  getCollectionFeeds,
  getCollectionHeroes,
  getProducts,
} from '~/components/ShopMemos';
import {DEFAULT_CHILD_THEME} from '~/components/ui/theme';
import {delocalizePath} from '~/i18n';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
}) => {
  if (currentUrl !== nextUrl) return true;
  return false;
};
enum CollectionQueryTypes {
  Hero,
  Feed,
}

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {pageHandle: hygraphSlug, editorialHandle} = params;
  // if slug is undefined, fallback with random number to ensure that "layoutsWhere" does not return any results.
  const path = new URL(request.url).pathname;
  const delocalizedPath = delocalizePath(path, context.i18n);
  const slug =
    delocalizedPath === '/'
      ? 'home'
      : hygraphSlug ?? editorialHandle ?? '73801813333362060615849066158275';
  const {env} = context;

  const {locks, layouts} = await context.hygraph.query(CacheLong()).GetGlobals({
    locksWhere: {
      isEnabled: true,
    },
    layoutsWhere: {
      pages_some: {
        slug,
      },
    },
  });
  const lock = getLock(context, request, params, locks);
  const pageLayout = layouts[0];
  const layoutConfig = getAppearance(lock, pageLayout);
  const {products, collectionsFeed, collectionsInfo} =
    await getOnPageShopifyGids(context, layoutConfig.id);
  return defer({
    lock,
    layoutConfig,
    products: getProducts(context, products),
    collectionsFeed: getCollectionFeeds(context, collectionsFeed),
    collectionsInfo: getCollectionHeroes(context, collectionsInfo),
  });
}
export default function BaseLayout() {
  const {layoutConfig} = useLoaderData<typeof loader>();
  return (
    <Layout layoutConfig={layoutConfig as LayoutConfig}>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const nonce = useNonce();
  const routeError = useRouteError();

  const layout = useBaseLayoutData();

  const isRouteError = isRouteErrorResponse(routeError);
  let title = 'Error';
  let pageType = 'page';
  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }
  // if (layout?.lock) {
  //   return (
  //     <Document>
  //       <LockLayout lock={layout?.lock as LockFragment} />
  //     </Document>
  //   );
  // }
  return (
    <>
      {isRouteError ? (
        <Layout layoutConfig={layout?.layoutConfig}>
          <NotFound type={pageType} />
        </Layout>
      ) : (
        <Layout layoutConfig={layout?.layoutConfig}>
          <GenericError error={error instanceof Error ? error : undefined} />
        </Layout>
      )}
    </>
  );
}

function getAppearance(
  lock: Maybe<LockFragment>,
  pageLayout?: LayoutConfigFragment,
): LayoutConfig {
  const layoutType: LayoutConfig = {
    header: HeaderStyle.Default,
    footer: FooterStyle.Default,
    id: '',
    theme: null,
  };
  if (lock) {
    if (lock.customLockScreen) {
      const {headerStyle, footerStyle, id, theme} = lock.customLockScreen;
      layoutType.header = headerStyle ?? HeaderStyle.Default;
      layoutType.footer = footerStyle ?? FooterStyle.Default;
      if (id) layoutType.id = id;
      if (theme?.slug) layoutType.theme = theme.slug;
    } else {
      layoutType.header = HeaderStyle.MinimalNewsletterCta;
      layoutType.footer = FooterStyle.Minimal;
    }
  } else if (pageLayout) {
    const f = pageLayout;
    if (f.headerStyle) layoutType.header = f.headerStyle;
    if (f.footerStyle) layoutType.footer = f.footerStyle;
    if (f.id) layoutType.id = f.id;
    if (f.theme?.slug) layoutType.theme = f.theme.slug;
  }
  return layoutType;
}

type CollectionInfo = {
  type: 'collection-info';
  data: ReturnType<typeof getCollectionHeroes>;
};
type CollectionFeed = {
  type: 'collection-feed';
  data: ReturnType<typeof getCollectionHeroes>;
};
type HygraphProduct = {
  type: 'product';
  data: ReturnType<typeof getProducts>;
};

async function getOnPageShopifyGids(
  context: AppLoadContext,
  layoutId?: string,
) {
  return layoutId
    ? await context.hygraph.query(CacheLong()).GetOnPageShopData({
        collectionsInfo: {
          heroes_some: {
            id: layoutId,
          },
        },
        collectionsFeed: {
          OR: [
            {
              customizedSections_some: {
                layouts_some: {
                  id: layoutId,
                },
              },
            },
            {
              layouts_some: {
                id: layoutId,
              },
            },
          ],
        },
        productsWhere: {
          OR: [
            {
              layouts_some: {
                id: layoutId,
              },
            },
            {
              heroes_some: {
                id: layoutId,
              },
            },
          ],
        },
      })
    : {products: [], collectionsInfo: [], collectionsFeed: []};
}

export const useBaseLayoutData = () => {
  const m = useRouteLoaderData('routes/($locale)+/_layout');
  return m as SerializeFrom<typeof loader>;
};
