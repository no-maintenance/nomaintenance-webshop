import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import {ComponentType, ElementType, ReactElement, ReactNode} from 'react';
import React, {createElement, Fragment, Suspense, useMemo} from 'react';
import {Await} from '@remix-run/react';

import {useBaseLayoutData} from '~/routes/($locale)+/_layout';
import type {
  CollectionFeedQuery,
  CollectionInfoQuery,
} from '~/__generated__/storefrontapi.generated';
import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {
  CollectionGidFragment,
  ProductGidFragment,
} from '~/__generated__/hygraph.generated';
import {COLLECTION_FEED_QUERY, PRODUCT_WIDGET_BY_IDS} from '~/lib/fragments';
import {flattenConnection} from '@shopify/hydrogen';

export function HygraphProduct({
  gid,
  children,
  Fallback,
}: {
  Fallback?: ReactNode;
  gid: string;
  children: ({product}: {product: Product}) => ReactNode;
}) {
  const {products} = useBaseLayoutData();

  return (
    <Suspense fallback={Fallback}>
      <Await resolve={products}>
        {(products) => {
          if (!products) return <></>;
          const p = products.filter((p) => {
            return p && p.id === gid;
          });
          if (!p) return <></>;
          const product = p[0];
          return (
            <MemoizedProduct product={product}>{children}</MemoizedProduct>
          );
        }}
      </Await>
    </Suspense>
  );
}

function MemoizedProduct({
  children,
  product,
}: {
  product: Product;
  children: ({product}: {product: Product}) => ReactNode;
}) {
  return createElement(
    Fragment,
    null,
    useMemo(() => {
      return children({product});
    }, [children, product]),
  );
}

export function CollectionInfo({
  gid,
  Fallback,
  children,
}: {
  children: ({
    collection,
  }: {
    collection: CollectionInfoQuery['collection'];
  }) => ReactNode;
  gid: string;
  Fallback?: ReactNode;
}) {
  const {collectionsInfo} = useBaseLayoutData();
  if (!children) return;

  // const collections = useMemo(async () => await Promise.all([collectionsFeed]), [collectionsFeed])
  return (
    <Suspense fallback={Fallback}>
      <Await resolve={collectionsInfo}>
        {(collections) => {
          const coll = collections?.filter((c) => {
            return c?.collection?.id === gid;
          });
          const collection = coll[0]?.collection;
          if (!collection) {
            // @TODO add error handling with sentry
            return;
          }
          return createElement(Fragment, null, children({collection}));
        }}
      </Await>
    </Suspense>
  );
}
export function CollectionFeed({
  gid,
  Fallback = Fragment,
  children,
}: {
  children: ({
    collection,
  }: {
    collection: CollectionFeedQuery['collection'];
  }) => ReactNode;
  gid: string;
  Fallback?: ElementType;
}) {
  const {collectionsFeed} = useBaseLayoutData();
  if (!children) return;

  // const collections = useMemo(async () => await Promise.all([collectionsFeed]), [collectionsFeed])
  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={collectionsFeed}>
        {(collections) => {
          const coll = collections?.filter((c) => {
            return c?.collection?.id === gid;
          });
          const collection = coll[0]?.collection;
          if (!collection) {
            // @TODO add error handling with sentry
            return;
          }
          return createElement(Fragment, null, children({collection}));
        }}
      </Await>
    </Suspense>
  );
}
export async function getCollectionFeeds(
  context: AppLoadContext,
  collections: CollectionGidFragment[],
) {
  if (!collections) return;
  const {query, i18n} = context.storefront;
  return await Promise.all(
    collections.map(({gid}) => {
      return query(COLLECTION_FEED_QUERY, {
        variables: {
          id: gid,
          country: i18n.country,
          language: i18n.language,
          first: 18,
        },
      });
    }),
  );
}

export async function getCollectionHeroes(
  context: AppLoadContext,
  collections: CollectionGidFragment[],
) {
  const {query, i18n} = context.storefront;
  return await Promise.all(
    collections.map(({gid}) => {
      return query(HERO_COLLECTION_QUERY, {
        variables: {
          id: gid,
          country: i18n.country,
          language: i18n.language,
        },
      });
    }),
  );
}

export async function getProducts(
  context: AppLoadContext,
  products: ProductGidFragment[],
) {
  const gids = products.map(({gid}) => gid);
  if (!gids) return;
  const {query, i18n} = context.storefront;
  const p = await query<{nodes: Product[]}>(PRODUCT_WIDGET_BY_IDS, {
    variables: {
      ids: gids,
      country: i18n.country,
      language: i18n.language,
    },
  });
  return flattenConnection(p);
}

export const HERO_COLLECTION_QUERY = `#graphql
query CollectionInfo(
    $id: ID!
    $country: CountryCode
    $language: LanguageCode
) @inContext(country: $country, language: $language) {
    collection(id: $id) {
        id
        handle
        title
        descriptionHtml
        image {
            id
            url
            width
            height
            altText
        }
    }
}
` as const;
