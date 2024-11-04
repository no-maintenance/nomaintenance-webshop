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
import type {Dispatch, SetStateAction} from 'react';
import React, {useEffect, useState} from 'react';
import {Heading, Section, Text} from '~/components/Text';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {getFirstAvailableVariant} from '~/routes/($locale)+/products.$productHandle';
import type {ProductVariantFragmentFragment} from '~/__generated__/storefrontapi.generated';
import {AddToCartButton} from '~/components/AddToCartButton';
import {VariantSelector} from '~/components/VariantSelector';
import {useTranslation} from '~/i18n';
import {useMediaQuery} from 'usehooks-ts';
import {Dialog, DialogContent, DialogTrigger} from '~/components/ui/dialog';
import {Button} from '~/components/ui/button';
import {KlaviyoBackInStock} from '~/components/KlaviyoNewsletter';
import {Link} from '~/components/Link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

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
              <SoldOutButton
                initSelectedVariant={selectedVariant}
                product={product}
                variants={variants}
              />
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

export function SoldOutButton({
  variants,
  product,
  initSelectedVariant,
}: {
  variants: ProductVariantFragmentFragment[];
  product: Product;
  initSelectedVariant: ProductVariant;
}) {
  const {t} = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState(false);
  const flattenedVariants = flattenConnection(product.variants);
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initSelectedVariant);
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className={'text-fine font-semibold cursor-pointer w-full'}
        >
          <Button variant={'outline'}>
            {t('product.soldOut')} — {t('product.notifyMe')}
          </Button>
        </DialogTrigger>
        <DialogContent variant={'tall'}>
          <div className={'p-6 flex flex-col gap-6'}>
            <section>
              <Heading as={'h2'} className={'uppercase font-medium text-lead'}>
                NOTIFY ME WHEN BACK IN STOCK
              </Heading>
              <div>
                <Text>
                  We will send you a notification when this product is back in
                  stock.
                </Text>
              </div>
            </section>
            <Section padding={'y'} className={'flex-1'}>
              <div className={''}>
                <Heading as={'h4'} size={'copy'} className={'mb-2'}>
                  {product.title}
                </Heading>
                <div className={'w-full'}>
                  <ProductVariantSelector
                    type={'buttons'}
                    product={product}
                    setSelectedVariant={setSelectedVariant}
                    selectedVariant={selectedVariant}
                    showVariantTitle={false}
                    variants={variants}
                  />
                </div>
              </div>
              <KlaviyoBackInStock
                source={'popup'}
                variantId={selectedVariant.id}
                cb={() => setOpen(false)}
              />
            </Section>
            <section>
              <Heading size={'copy'} className={'font-medium'}>
                Log In
              </Heading>
              <Link to={`/account`} className={'underline'}>
                Sign in
              </Link>{' '}
              to your account to request a return or ask a question
            </section>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        className={'text-fine font-semibold cursor-pointer w-full'}
      >
        <Button variant={'outline'}>
          {t('product.soldOut')} — {t('product.notifyMe')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className={'p-6'}>
          <section>
            <Heading as={'h2'} className={'uppercase font-medium text-lead'}>
              NOTIFY ME WHEN BACK IN STOCK
            </Heading>
            <div>
              <Text>
                We will send you a notification when this product is back in
                stock.
              </Text>
            </div>
          </section>
          <Section padding={'y'}>
            <div className={'pb-6'}>
              <Heading as={'h4'} size={'copy'} className={'mb-2'}>
                {product.title}
              </Heading>
              <div className={'w-full'}>
                <ProductVariantSelector
                  type={'listbox'}
                  product={product}
                  setSelectedVariant={setSelectedVariant}
                  selectedVariant={selectedVariant}
                  showVariantTitle={false}
                  variants={variants}
                />
              </div>
            </div>
            <KlaviyoBackInStock
              source={'popup'}
              variantId={selectedVariant.id}
              cb={() => setOpen(false)}
            />
            <DrawerClose asChild>
              <Button className={'w-full mt-4'} variant={'outline'}>
                Cancel
              </Button>
            </DrawerClose>
          </Section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProductVariantSelector({
  variants,
  showVariantTitle,
  product,
  setSelectedVariant,
  selectedVariant,
  type = 'buttons',
}: {
  showVariantTitle: boolean;
  variants: ProductVariantFragmentFragment[];
  product: Product;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariant>>;
  selectedVariant: ProductVariant;
  type?: 'buttons' | 'listbox';
}) {
  return (
    <VariantSelector
      handle={product.handle}
      options={product.options.filter(
        (option) => option.optionValues.length > 1,
      )}
      variants={variants}
    >
      {({option}) => {
        if (type === 'buttons')
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
                    onClick={() =>
                      setSelectedVariant(variant as ProductVariant)
                    }
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
        if (type === 'listbox')
          return (
            <Select
              value={selectedVariant.selectedOptions[0].value}
              onValueChange={(selectedOption) => {
                const opt = option.values.find(
                  (v) => v.value === selectedOption,
                );
                if (opt) {
                  setSelectedVariant(opt.variant as ProductVariant);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Size" />
              </SelectTrigger>
              <SelectContent className={'bg-background'}>
                {option.values.map(
                  ({value, to, isActive, isAvailable, quantityAvailable}) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className={'cursor-pointer'}
                    >
                      {value}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          );
      }}
    </VariantSelector>
  );
}
