import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import React, {Suspense} from 'react';

import {getCriticalPageData} from '~/lib/utils.server';
import type {
  GetEntitiesQuery,
  HeroesFragment,
} from '~/__generated__/hygraph.generated';
import {StaticPage} from '~/__generated__/hygraph.generated';
import {isValidLocaleServer} from '~/i18n/isValidLocaleServer';
import {HeroFactory} from '~/components/Hero';
import {
  BlockFactory,
  BlockSkeletonFactory,
} from '~/components/blocks/BlockFactory';
import {CacheLong} from '@shopify/hydrogen';
import {PageHeader} from '~/components/Text';
import {cn} from '~/lib/utils';

export async function loader({params, context, request}: LoaderFunctionArgs) {
  if (!isValidLocaleServer(context, params)) {
    throw new Response(null, {status: 404});
  }
  const {pageHandle} = params;
  const data = await getCriticalPageData(context, {
    slug: pageHandle,
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
    layout,
    blocks: blocksPromise,
    blockOutline: sections,
    seo,
  });
}

export default function Layout() {
  const {layout, blocks, blockOutline} = useLoaderData<typeof loader>();
  return (
    <>
      {layout?.heroes && (
        <HeroFactory heroes={layout.heroes as HeroesFragment[]} />
      )}
      {layout?.displayTitle && layout?.title && (
        <PageHeader variant={'page'} heading={layout.title} />
      )}
      <div
        className={cn(
          !layout?.heroes &&
            !layout?.displayTitle &&
            !layout?.title &&
            'pt-gutter mt-gutter',
        )}
      >
        <Suspense fallback={<BlockSkeletonFactory outline={blockOutline} />}>
          <Await resolve={blocks}>
            {(b) => b && <BlockFactory blocks={b as GetEntitiesQuery} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}