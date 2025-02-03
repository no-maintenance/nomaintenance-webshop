import type {ShouldRevalidateFunction} from '@remix-run/react';
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type {
  ActionFunctionArgs,
  AppLoadContext,
  LoaderFunctionArgs,
  SerializeFrom,
} from '@shopify/remix-oxygen';
import {defer, json} from '@shopify/remix-oxygen';
import {useRouteLoaderData} from 'react-router';
import {CacheLong, CacheShort, useNonce} from '@shopify/hydrogen'; // import LockLayout from '~/components/LockLayout';
import {getLock, hasLockPasswordCookie} from '~/lib/locks.server';
import {GenericError, NotFound} from '~/components/Error';
import type {
  EntityTypeName,
  GetEntitiesQuery,
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
import {delocalizePath} from '~/i18n';
import {LockScreen} from '~/components/LockScreen';
import React from 'react';
import {LazyMotion} from 'framer-motion';
import {CacheBalanced} from '~/lib/cache';
import invariant from 'tiny-invariant';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
}) => {
  if (currentUrl !== nextUrl) return true;
  return false;
};
// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   formMethod,
//   currentUrl,
//   nextUrl,
// }) => {
//   // revalidate when a mutation is performed e.g add to cart, login...
//   if (formMethod && formMethod !== 'GET') {
//     return true;
//   }
//
//   // revalidate when manually revalidating via useRevalidator
//   if (currentUrl.toString() === nextUrl.toString()) {
//     return true;
//   }
//
//   return false;
// };

enum CollectionQueryTypes {
  Hero,
  Feed,
}

export function getPathSlug({request, context, params}: LoaderFunctionArgs) {
  const {pageHandle: hygraphSlug, editorialHandle} = params;
  // if slug is undefined, fallback with random number to ensure that "layoutsWhere" does not return any results.
  const path = new URL(request.url).pathname;
  const delocalizedPath = delocalizePath(path, context.i18n);
  return delocalizedPath === '/' ? 'home' : hygraphSlug ?? editorialHandle;
}

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const pw = String(formData.get('password'));
  const id = String(formData.get('lock_id'));
  invariant(id, 'Error ID is required');
  const {lock} = await context.hygraph.query().GetLock({where: {id}});
  if (!lock?.password) {
    return json({
      status: 500,
      message: 'Sorry an unknown error has occurred. Please try again later.',
    });
  }
  if (lock.password === pw) {
    await context.session.set('bypass-page-protection', id);
    return json({
      status: 200,
      message: '',
    });
  } else {
    return json({
      status: 401,
      message: 'Please double check your password and try again.',
    });
  }
  return json({
    status: 500,
    message: 'Sorry an unknown error has occurred. Please try again later.',
  });
}

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {pageHandle: hygraphSlug, editorialHandle} = params;
  const slug =
    getPathSlug({request, context, params}) ??
    '73801813333362060615849066158275';

  const {locks, layouts} = await context.hygraph
    .query(CacheShort())
    .GetGlobals({
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
  const {blocks, ...layoutConfig} = getAppearance(context, lock, pageLayout);
  const {products, collectionsFeed, collectionsInfo} =
    await getOnPageShopifyGids(context, layoutConfig.id);
  return defer({
    lock,
    hasLockPassword: hasLockPasswordCookie(context.session, lock),
    customLockContent: blocks,
    layoutConfig,
    products: getProducts(context, products),
    collectionsFeed: getCollectionFeeds(context, collectionsFeed),
    collectionsInfo: getCollectionHeroes(context, collectionsInfo),
  });
}

export default function BaseLayout() {
  const {layoutConfig, lock, customLockContent} =
    useLoaderData<typeof loader>();
  return (
    <Layout layoutConfig={layoutConfig as LayoutConfig}>
      {!lock ? (
        <Outlet />
      ) : (
        <LazyMotion
          features={async () => (await import('~/lib/features')).default}
        >
          <LockScreen
            lock={lock}
            sections={customLockContent as Promise<GetEntitiesQuery>}
          />
        </LazyMotion>
      )}
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

type LayoutContent = LayoutConfig & {blocks: Promise<GetEntitiesQuery> | null};

function getAppearance(
  context: AppLoadContext,
  lock: Maybe<LockFragment>,
  pageLayout?: LayoutConfigFragment,
): LayoutContent {
  const layoutType: LayoutContent = {
    header: HeaderStyle.Default,
    footer: FooterStyle.Default,
    id: '',
    theme: null,
    blocks: null,
  };
  if (lock) {
    if (lock.customLockScreen) {
      const {headerStyle, footerStyle, id, theme} = lock.customLockScreen;
      layoutType.header = headerStyle ?? HeaderStyle.Default;
      layoutType.footer = footerStyle ?? FooterStyle.Default;
      if (id) layoutType.id = id;
      if (theme?.slug) layoutType.theme = theme.slug;
      const sections = lock.customLockScreen.sections
        .map((entity) => {
          const {__typename, id, stage} = entity;
          return {typename: __typename as EntityTypeName, id, stage};
        })
        .filter((e) => !!e.typename);
      const blocksPromise = sections.length
        ? context.hygraph.query(CacheBalanced).GetEntities({
            where: [...sections],
          })
        : null;
      layoutType.blocks = blocksPromise;
    } else {
      layoutType.header = HeaderStyle.None;
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

async function getOnPageShopifyGids(
  context: AppLoadContext,
  layoutId?: string,
) {
  return layoutId
    ? await context.hygraph.query(CacheShort()).GetOnPageShopData({
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
