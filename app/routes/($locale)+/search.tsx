// noinspection ES6MissingAwait

import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, Form, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {
  getPaginationVariables,
  Pagination,
  UNSTABLE_Analytics as Analytics,
} from '@shopify/hydrogen';
import {useInView} from 'react-intersection-observer';

import {Heading, PageHeader, Section, Text} from '~/components/Text';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {Input} from '~/components/ui/input';
import {ProductCard} from '~/components/ProductCard';
import {Grid} from '~/components/Grid';
import {Button} from '~/components/ui/button';
import {ProductSwimlane} from '~/components/ProductSwimlane';

import {type FeaturedData, getFeaturedData} from '~/routes/featured-products';
import {FeaturedCollections} from '~/components/FeaturedShopifyContent';
import type {BaseI18n} from '~/i18n';

export async function loader({
  request,
  context: {storefront, i18n},
}: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get('q')!;
  const variables = getPaginationVariables(request, {pageBy: PAGINATION_SIZE});

  const {products} = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const shouldGetRecommendations = !searchTerm || products?.nodes?.length === 0;

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Search',
      handle: 'search',
      descriptionHtml: 'Search results',
      description: 'Search results',
      seo: {
        title: 'Search',
        description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
      },
      metafields: [],
      products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(storefront, i18n)
      : Promise.resolve(null),
  });
}

export default function Search() {
  const {searchTerm, products, noResultRecommendations} =
    useLoaderData<typeof loader>();
  const {ref, inView} = useInView();

  const noResults = products?.nodes?.length === 0;

  return (
    <>
      <PageHeader className={'gap-2'}>
        <Heading as="h1" size="copy">
          Search
        </Heading>
        <Form
          method="get"
          className="relative flex w-full text-heading h-[53px]"
        >
          <Input
            defaultValue={searchTerm}
            name="q"
            placeholder="Search…"
            type="search"
            className={'h-full text-heading'}
          />
          <button
            className="inset-y-0 absolute right-0 px-4 outline-offset-0"
            type="submit"
          >
            GO
          </button>
        </Form>
      </PageHeader>
      {!searchTerm || noResults ? (
        <NoResults
          noResults={noResults}
          recommendations={noResultRecommendations}
        />
      ) : (
        <Section>
          <Pagination connection={products}>
            {({nodes, isLoading, NextLink, PreviousLink}) => {
              const itemsMarkup = nodes.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  loading={getImageLoadingPriority(i)}
                  idx={i}
                />
              ));

              return (
                <>
                  <div className="flex items-center justify-center mt-6">
                    <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-foreground/10 bg-background text-foreground w-full">
                      {isLoading ? 'Loading...' : 'Previous'}
                    </PreviousLink>
                  </div>
                  <Grid layout={'products'}>{itemsMarkup}</Grid>
                  <div className="flex items-center justify-center">
                    <NextLink ref={ref}>
                      <Button variant={'link'}></Button>
                    </NextLink>
                  </div>
                </>
              );
            }}
          </Pagination>
          <Analytics.SearchView data={{searchTerm, searchResults: products}} />
        </Section>
      )}
    </>
  );
}

function NoResults({
  noResults,
  recommendations,
}: {
  noResults: boolean;
  recommendations: Promise<null | FeaturedData>;
}) {
  return (
    <>
      {noResults && (
        <Section padding="x">
          <Text className="opacity-50">
            No results, try a different search.
          </Text>
        </Section>
      )}
      <Suspense>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommendations}
        >
          {(result) => {
            if (!result) return null;
            const {featuredCollections, featuredProducts} = result;
            return (
              <Section padding={'y'}>
                <FeaturedCollections
                  title="Trending Collections"
                  collections={featuredCollections}
                />
                <ProductSwimlane
                  title="Trending Products"
                  products={featuredProducts}
                />
              </Section>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export function getNoResultRecommendations(
  storefront: LoaderFunctionArgs['context']['storefront'],
  i18n: BaseI18n,
) {
  return getFeaturedData(storefront, i18n, {pageBy: PAGINATION_SIZE});
}

const SEARCH_QUERY = `#graphql
query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String
    $startCursor: String
) @inContext(country: $country, language: $language) {
    products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        sortKey: RELEVANCE,
        query: $searchTerm
    ) {
        nodes {
            ...ProductCard
        }
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
    }
}

${PRODUCT_CARD_FRAGMENT}
` as const;
