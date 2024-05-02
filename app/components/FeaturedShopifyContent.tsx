import {useFetcher, useParams} from '@remix-run/react';
import type {FeaturedData} from '~/routes/featured-products';
import {useEffect, useId, useMemo} from 'react';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import type {ProductSortKeys} from '@shopify/hydrogen/storefront-api-types';
import type {
  HomepageFeaturedCollectionsQuery,
  ProductCardFragment,
} from '~/__generated__/storefrontapi.generated';
import {Skeleton} from '~/components/ui/skeleton';
import {Heading, Section, Text} from '~/components/Text';
import {ProductCard} from '~/components/ProductCard';
import {getImageLoadingPriority} from '~/lib/const';
import clsx from 'clsx';
import {Grid} from '~/components/Grid';
import {Link} from '~/components/Link';
import {Image} from '@shopify/hydrogen';

type FeaturedCollectionsProps = HomepageFeaturedCollectionsQuery & {
  title?: string;
  [key: string]: any;
};

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}: FeaturedCollectionsProps) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes.filter((item) => item.image);
  if (!collectionsWithImage.length) return null;
  return (
    <Section {...props} heading={title}>
      <Grid items={collectionsWithImage.length}>
        {collectionsWithImage.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[3/2]">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                <Heading size="copy">{collection.title}</Heading>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}

export function FeaturedSection() {
  const {load, data} = useFetcher<FeaturedData>();
  const params = useParams();
  const path = '/featured-products';
  useEffect(() => {
    load(path);
  }, [load, path]);

  if (!data) return null;

  const {featuredCollections, featuredProducts} = data;

  return (
    <>
      {featuredCollections.nodes.length < 2 && (
        <FeaturedCollections
          title="Popular Collections"
          collections={featuredCollections}
        />
      )}
      <ProductSwimlane products={featuredProducts} />
    </>
  );
}

interface FeaturedProductsProps {
  count: number;
  heading: string;
  layout?: 'drawer' | 'page';
  onClose?: () => void;
  query?: string;
  reverse?: boolean;
  sortKey: ProductSortKeys;
}

/**
 * Display a grid of products and a heading based on some options.
 * This components uses the storefront API products query
 * @param count number of products to display
 * @param heading
 * @param layout
 * @param onClose
 * @param query a filtering query
 * @param reverse wether to reverse the product results
 * @param sortKey Sort the underlying list by the given key.
 * @see query https://shopify.dev/api/storefront/current/queries/products
 * @see filters https://shopify.dev/api/storefront/current/queries/products#argument-products-query
 */
export function FeaturedProducts({
  count = 4,
  heading = 'Shop Best Sellers',
  layout = 'drawer',
  onClose,
  query,
  reverse,
  sortKey = 'BEST_SELLING',
}: FeaturedProductsProps) {
  const {load, data} = useFetcher<{
    products: ProductCardFragment[];
  }>();
  const params = useParams();
  const queryString = useMemo(
    () =>
      Object.entries({count, sortKey, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [count, sortKey, query, reverse],
  );
  const productsApiPath = params.locale
    ? `${params.locale}/api/products?${queryString}`
    : `/api/products?${queryString}`;

  useEffect(() => {
    load(productsApiPath);
  }, [load, productsApiPath]);

  return (
    <>
      <Heading format size="copy" className="t-4">
        {heading}
      </Heading>
      <div
        className={clsx([
          `grid grid-cols-2 gap-x-6 gap-y-8`,
          layout === 'page' ? 'md:grid-cols-4 sm:grid-col-4' : '',
        ])}
      >
        <FeatureProductsContent
          count={count}
          onClick={onClose}
          products={data?.products}
        />
      </div>
    </>
  );
}

/**
 * Render the FeaturedProducts content based on the fetcher's state. "loading", "empty" or "products"
 */
function FeatureProductsContent({
  count = 4,
  onClick,
  products,
}: {
  count: FeaturedProductsProps['count'];
  products: ProductCardFragment[] | undefined;
  onClick?: () => void;
}) {
  const id = useId();
  if (!products) {
    return (
      <>
        {[...new Array(count)].map((_, i) => (
          <div key={`${id + i}`} className="grid gap-2">
            <Skeleton className="aspect-[4/5]" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </>
    );
  }

  if (products?.length === 0) {
    return <Text format>No products found.</Text>;
  }

  return (
    <>
      {products.map((product, i) => (
        <ProductCard
          product={product}
          key={product.id}
          onClick={onClick}
          loading={getImageLoadingPriority(i)}
          idx={i}
        />
      ))}
    </>
  );
}

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
    collections(
        first: 4,
        sortKey: UPDATED_AT
    ) {
        nodes {
            id
            title
            handle
            image {
                altText
                width
                height
                url
            }
        }
    }
}
` as const;
