import type {LoaderFunctionArgs, MetaArgs} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import React, {Suspense} from 'react';

import {getCriticalPageData} from '~/lib/utils.server';
import type {
  GetEntitiesQuery,
  HeroesFragment,
} from '~/__generated__/hygraph.generated';
import {isValidLocaleServer} from '~/i18n/isValidLocaleServer';
import {
  BlockFactory,
  BlockSkeletonFactory,
} from '~/components/blocks/BlockFactory';
import {CacheLong, getSeoMeta} from '@shopify/hydrogen';
import {Heading, PageHeader, Section} from '~/components/Text';
import {cn, isAfterDate} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {CacheBalanced} from '~/lib/cache';
import {HeroFactory} from '~/components/Hero';

export async function loader({params, context, request}: LoaderFunctionArgs) {
  if (!isValidLocaleServer(context, params)) {
    throw new Response(null, {status: 404});
  }
  const data = await getCriticalPageData(context, {
    slug: 'mohair-redeemed',
  });
  if (!data) {
    throw new Response(null, {status: 404});
  }
  const {page, sections} = data;
  const blocksPromise = sections.length
    ? context.hygraph.query(CacheBalanced).GetEntities({
        where: [...sections],
      })
    : null;
  const {seo, layout} = page;
  return defer({
    layout,
    blocks: blocksPromise,
    blockOutline: sections,
    seo: seo ? seoPayload.page({seo, url: request.url}) : null,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Page() {
  const {layout, blocks, blockOutline} = useLoaderData<typeof loader>();
  return (
    <>
      {layout?.heroes && (
        <HeroFactory
          size={layout?.isFluidHero ? 'fluid' : 'screen'}
          reverseLayout={!!layout?.mirrorLayout}
          heroes={layout.heroes as HeroesFragment[]}
        />
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
