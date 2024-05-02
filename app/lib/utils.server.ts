import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {
  EntityTypeName,
  PageWhereUniqueInput,
} from '~/__generated__/hygraph.generated';
import {CacheLong} from '@shopify/hydrogen';

export async function getHygraphLoaderContent(
  context: AppLoadContext,
  where: PageWhereUniqueInput,
) {
  const {page} = await context.hygraph.query(CacheLong()).GetPage({where});
  if (!page || !page.layout?.id) {
    throw new Response(null, {status: 404});
  }
  const sections = page.layout.sections
    .map((entity) => {
      const {__typename, id, stage} = entity;
      return {typename: __typename as EntityTypeName, id, stage};
    })
    .filter((e) => !!e.typename);
  const {entities} = sections
    ? await context.hygraph.query(CacheLong()).GetEntities({
        where: [...sections],
      })
    : {entities: []};
  return {
    page,
    blocks: entities,
  };
}

export async function getCriticalPageData(
  context: AppLoadContext,
  where: PageWhereUniqueInput,
) {
  const {page} = await context.hygraph.query(CacheLong()).GetPage({where});
  if (!page || !page.layout?.id) {
    return null;
  }
  const sections = page.layout.sections
    .map((entity) => {
      const {__typename, id, stage} = entity;
      return {typename: __typename as EntityTypeName, id, stage};
    })
    .filter((e) => !!e.typename);
  return {page, sections};
}
