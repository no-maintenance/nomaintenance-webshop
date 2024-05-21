import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {cn, isEqual} from '~/lib/utils';
import {
  flattenConnection,
  Image,
  Money,
  type ShopifyAnalyticsProduct,
  ShopPayButton,
  Video,
} from '@shopify/hydrogen';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import {HygraphProduct} from '~/components/ShopMemos';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselWithCounter,
} from '~/components/ui/carousel';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Heading, Text} from '~/components/Text';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {
  getFirstAvailableVariant,
  SoldOutButton,
} from '~/routes/($locale)+/products.$productHandle';
import type {ProductVariantFragmentFragment} from '~/__generated__/storefrontapi.generated';
import {AddToCartButton} from '~/components/AddToCartButton';
import {VariantSelector} from '~/components/VariantSelector';

export function ProductBlock({gid}: BlockProps<'Product'>) {
  return (
    <HygraphProduct gid={gid}>
      {({product}) => product && <FeaturedProduct product={product} />}
    </HygraphProduct>
  );
}

function FeaturedProduct({product}: {product: Product}) {
  const {verticalPadding, horizontalPadding, reverseLayout} = useSettings();
  const flattenedVariants = flattenConnection(product.variants);
  const firstVariant = getFirstAvailableVariant(flattenedVariants);

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(firstVariant);
  useEffect(() => {
    const matchedVariant = flattenedVariants.find((variant) =>
      isEqual(variant.selectedOptions[0], selectedVariant.selectedOptions[0]),
    );
    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
    } else {
      setSelectedVariant(getFirstAvailableVariant(flattenedVariants));
    }
  }, [product]);
  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;
  const analytics = {
    products: [
      {
        productGid: product.id,
        variantGid: selectedVariant.id,
        name: product.title,
        variantName: selectedVariant.title,
        brand: product.vendor,
        price: selectedVariant.price.amount,
      },
    ],
  };
  return (
    <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
      <div
        className={'grid grid-cols-2 gap-12 pb-12 md:pb-0 md:gap-4 mx-auto'}
        id={'drop'}
      >
        {product.media.nodes && (
          <div
            className={cn(
              'md:col-span-1 col-span-2',
              reverseLayout && 'md:order-2',
            )}
          >
            <CarouselWithCounter>
              <CarouselContent>
                {product.media.nodes.map((data, i) => {
                  return data.__typename === 'MediaImage' && data.image ? (
                    <CarouselItem key={data.id} className={'aspect-[4/5]'}>
                      <Image
                        loading={i === 0 ? 'eager' : 'lazy'}
                        data={data.image}
                        aspectRatio="4/5"
                        sizes={'(min-width: 48em) 60vw, 100vw'}
                        className="object-cover flex-1"
                      />
                    </CarouselItem>
                  ) : (
                    data.__typename === 'Video' && (
                      <Video
                        className="object-cover w-full h-full  fadeIn"
                        autoPlay
                        muted
                        controls={false}
                        data={data}
                      />
                    )
                  );
                })}
              </CarouselContent>
              <CarouselPrevious isInline={true} />
              <CarouselNext isInline={true} />
            </CarouselWithCounter>
          </div>
        )}
        <div className={'flex items-center col-span-2 md:col-span-1 '}>
          <div
            className={
              'grid grid-cols-1 gap-8 gutter mx-auto  md:mx-auto md:max-w-xl '
            }
          >
            <div className="grid">
              <div className={'flex justify-between w-full'}>
                {product.vendor && (
                  <Text size={'fine'} className={'opacity-50 uppercase'}>
                    {product.vendor}
                  </Text>
                )}
                <Text className={'pl-2'}>
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant?.price!}
                    as="span"
                    data-test="price"
                    className={cn(isOnSale && 'text-primary')}
                  />
                  {isOnSale && (
                    <Money
                      withoutTrailingZeros
                      data={selectedVariant?.compareAtPrice!}
                      as="span"
                      className="opacity-50 strike ml-3"
                    />
                  )}
                </Text>
              </div>
              <Heading
                size={'copy'}
                as="h1"
                className="whitespace-normal uppercase font-normal my-0"
              >
                {product.title}
              </Heading>
            </div>
            <ProductForm
              setSelectedVariant={setSelectedVariant}
              product={product}
              analytics={analytics}
              storeDomain={'https://no-maintenance.myshopify.com'}
              variants={flattenedVariants}
              selectedVariant={selectedVariant}
            />
            {product.descriptionHtml && (
              <div
                className={'prose text-justify'}
                dangerouslySetInnerHTML={{
                  __html: product.descriptionHtml,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </SpacingWrapper>
  );
}

function ProductForm({
  product,
  storeDomain,
  analytics,
  variants,
  showVariantTitle = false,
  selectedVariant,
  setSelectedVariant,
}: {
  product: Product;
  analytics: any;
  storeDomain: string;
  showVariantTitle?: boolean;
  variants: ProductVariantFragmentFragment[];
  selectedVariant: any;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariant>>;
}) {
  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const isOutOfStock = !selectedVariant?.availableForSale;

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity: 1,
  };

  return (
    <div className="grid gap-10">
      <div className="grid gap-10">
        <ProductVariantSelector
          setSelectedVariant={setSelectedVariant}
          product={product}
          variants={variants}
          showVariantTitle={showVariantTitle}
          selectedVariant={selectedVariant}
        />
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <SoldOutButton product={product} variants={variants} />
            ) : (
              <AddToCartButton
                size={'sm'}
                className={'w-full'}
                lines={[
                  {
                    merchandiseId: selectedVariant.id!,
                    quantity: 1,
                  },
                ]}
                data-test="add-to-cart"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price),
                }}
              >
                <Text
                  as="span"
                  size={'fine'}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Add to Cart</span>
                </Text>
              </AddToCartButton>
            )}
            {!isOutOfStock && (
              <div
                className={'leading-[0px] h-[var(--shop-pay-button-height)]'}
              >
                <ShopPayButton
                  width="100%"
                  variantIds={[selectedVariant?.id!]}
                  storeDomain={storeDomain}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductVariantSelector({
  variants,
  showVariantTitle,
  product,
  setSelectedVariant,
  selectedVariant,
}: {
  showVariantTitle: boolean;
  variants: ProductVariantFragmentFragment[];
  product: Product;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariant>>;
  selectedVariant: ProductVariant;
}) {
  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={variants}
    >
      {({option}) => {
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap gap-y-2 last:mb-0"
          >
            {showVariantTitle && (
              <Heading as="legend" size="lead" className="min-w-[4rem]">
                {option.name}
              </Heading>
            )}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {option.values.map(({value, isAvailable, variant}) => (
                <button
                  key={option.name + value}
                  onClick={() => setSelectedVariant(variant as ProductVariant)}
                  className={cn(
                    'text-fine subpixel-antialiased leading-none py-1 cursor-pointer transition-all duration-200',
                    variant?.id === selectedVariant.id
                      ? 'font-semibold'
                      : 'font-normal',
                    isAvailable ? 'opacity-100' : 'opacity-50',
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      }}
    </VariantSelector>
  );
}
