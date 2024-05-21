import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

import {
  PRODUCT_CARD_FRAGMENT,
  FEATURED_COLLECTION_FRAGMENT,
} from '~/lib/fragments';
import {BaseI18n, useLocale} from '~/i18n';

const PAGINATION_SIZE = 12;
export async function loader({
  context: {storefront, i18n},
  params,
}: LoaderFunctionArgs) {
  return json(await getFeaturedData(storefront, i18n));
}

export async function getFeaturedData(
  storefront: LoaderFunctionArgs['context']['storefront'],
  i18n: BaseI18n,
  variables: {pageBy?: number} = {},
) {
  const data = await storefront.query(FEATURED_ITEMS_QUERY, {
    variables: {
      pageBy: PAGINATION_SIZE,
      country: i18n.country.code,
      language: i18n.language.code.toUpperCase(),
      ...variables,
    },
  });

  invariant(data, 'No featured items data returned from Shopify API');

  return data;
}

export type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>;

export const FEATURED_ITEMS_QUERY = `#graphql
query FeaturedItems(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 12
) @inContext(country: $country, language: $language) {
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
        nodes {
            ...FeaturedCollectionDetails
        }
    }
    featuredProducts: products(first: $pageBy, query: "available_for_sale:true") {
        nodes {
            ...ProductCard
        }
    }
}

${PRODUCT_CARD_FRAGMENT}
${FEATURED_COLLECTION_FRAGMENT}
` as const;
