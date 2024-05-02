import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import React, {Suspense} from 'react';

import {getCriticalPageData, getHygraphLoaderContent} from '~/lib/utils.server';
import type {
  BlockFragment,
  GetEntitiesQuery,
  HeroesFragment,
} from '~/__generated__/hygraph.generated';
import {StaticPage} from '~/__generated__/hygraph.generated';
import {isValidLocaleServer} from '~/i18n/isValidLocaleServer';
import {HeroFactory} from '~/components/Hero';
import {
  BlockFactory,
  BlockSkeletonFactory,
  BlocksSkeleton,
} from '~/components/blocks/BlockFactory';
import {CacheLong} from '@shopify/hydrogen';

export async function loader({params, context, request}: LoaderFunctionArgs) {
  if (!isValidLocaleServer(context, params)) {
    throw new Response(null, {status: 404});
  }
  const data = await getCriticalPageData(context, {
    staticPage: StaticPage.Editorial,
  });
  if (!data) {
    throw new Response(null, {status: 404});
  }
  const {page, sections} = data;
  const blocksPromise = sections
    ? context.hygraph.query(CacheLong()).GetEntities({
        where: [...sections],
      })
    : null;
  const {seo, layout} = page;
  return defer({
    heroes: layout?.heroes,
    blocks: blocksPromise,
    blockOutline: sections,
    seo,
  });
}

export default function Layout() {
  const {heroes, blocks, blockOutline} = useLoaderData<typeof loader>();
  return (
    <>
      {heroes && <HeroFactory heroes={heroes as HeroesFragment[]} />}
      <Suspense fallback={<BlockSkeletonFactory outline={blockOutline} />}>
        <Await resolve={blocks}>
          {(b) => b && <BlockFactory blocks={b as GetEntitiesQuery} />}
        </Await>
      </Suspense>
    </>
  );
}
