import {flattenConnection} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {ProductCard} from '~/components/ProductCard';
import {Heading, Section} from '~/components/Text';
import type {ApiAllProductsQuery} from '~/__generated__/storefrontapi.generated';
import {cn} from '~/lib/utils';
const mockProducts = {
  nodes: new Array(12).fill(''),
};
type ProductSwimlaneProps = ApiAllProductsQuery & {
  title?: string;
  count?: number;
};

export function ProductSwimlane({
  title,
  products,
  count = 12,
  ...props
}: ProductSwimlaneProps) {
  return (
    <Section padding="y" {...props}>
      {title && (
        <Heading size="lead" className={cn('px-gutter pb-gutter')}>
          {title}
        </Heading>
      )}
      <div className="swimlane hiddenScroll md:scroll-px-8 lg:scroll-px-8 px-4 md:px-6 lg:px-8 xl:px-10">
        {products.nodes.map((product, idx) => (
          <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
            idx={idx}
          />
        ))}
      </div>
    </Section>
  );
}
export const SkeletonProductSwimlane = ({
  title,
  count = 12,
}: {
  title?: string;
  count?: string;
}) => (
  <Section heading={title} padding="none" {...props}>
    <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-8 px-4 md:px-6 lg:px-8 xl:px-10">
      {flattenedProducts.map((product, idx) => (
        <ProductCard
          product={product}
          key={product.id}
          className="snap-start w-80"
          idx={idx}
        />
      ))}
    </div>
  </Section>
);
