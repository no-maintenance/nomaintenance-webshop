import clsx from 'clsx';
import type {ShopifyAnalyticsProduct, Video} from '@shopify/hydrogen';
import {flattenConnection, MediaFile, Money, useMoney} from '@shopify/hydrogen';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';
import type {ComponentProps} from 'react';
import type {HydrogenImageProps} from '@shopify/hydrogen-react/Image';

import type {
  MediaFragment,
  ProductCardFragment,
} from '~/__generated__/storefrontapi.generated';
import {Link} from '~/components/Link';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Button} from '~/components/ui/button';
import {Text} from '~/components/Text';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {useTranslation} from '~/i18n';
import {Skeleton} from '~/components/ui/skeleton';
import {AspectRatio} from '~/components/ui/aspect-ratio';
import {Badge} from '~/components/ui/badge';

type ProductCardProps = {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
  idx: number;
};

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  idx,
}: ProductCardProps) {
  let cardLabel;
  const {t} = useTranslation();
  const cardProduct: Product = product as Product;
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {price, compareAtPrice} = firstVariant;
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = t('cart_actions.new');
  }
  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };
  const {media, handle, title, variants} = product;

  function isSoldOut(product: ProductCardFragment): boolean {
    return product.variants.nodes.every((variant) => !variant.availableForSale);
  }

  console.log(isSoldOut(product));
  return (
    <Link
      onClick={onClick}
      to={`/products/${handle}`}
      prefetch="intent"
      className={'group outline-offset-8'}
    >
      <div className="flex flex-col gap-2 product-card">
        <div className={clsx('grid gap-3', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5 relative group">
            {media.nodes && (
              <ProductCardImage
                loading={loading}
                media={media.nodes}
                title={title}
              />
            )}
            {cardLabel && (
              <Badge className="absolute top-0 right-0 m-4">{cardLabel}</Badge>
            )}
          </div>
          <div className="grid gap-1">
            <Text
              className="w-full overflow-hidden whitespace-nowrap text-ellipsis uppercase"
              as="h3"
            >
              {title}
            </Text>
            <div className={'truncate-e h-10 group'}>
              <div className=" gap-4 group-hover:hidden block">
                {isSoldOut(product) ? (
                  <Text className="flex gap-4 opacity-50">SOLD OUT</Text>
                ) : (
                  <Text className="flex gap-4">
                    <Money withoutTrailingZeros data={price!} />
                    {isDiscounted(
                      price as MoneyV2,
                      compareAtPrice as MoneyV2,
                    ) && (
                      <CompareAtPrice
                        className={'opacity-50'}
                        data={compareAtPrice as MoneyV2}
                      />
                    )}
                  </Text>
                )}
              </div>
              <div className={'hidden group-hover:block'}>
                <div className={'flex gap-x-3  flex-wrap '}>
                  <ProductCardVariants variants={variants} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {quickAdd && firstVariant.availableForSale && (
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            variant="secondary"
            className="mt-2"
            analytics={{
              products: [productAnalytics],
              totalValue: parseFloat(productAnalytics.price),
            }}
          >
            <Text as="span" className="flex items-center justify-center gap-2">
              {t('product.addToCart')}
            </Text>
          </AddToCartButton>
        )}
        {quickAdd && !firstVariant.availableForSale && (
          <Button variant="inverted" className="mt-2" disabled>
            <Text as="span" className="flex items-center justify-center gap-2">
              {t('product.soldOut')}
            </Text>
          </Button>
        )}
      </div>
    </Link>
  );
}

function ProductCardVariants({
  variants,
}: {
  variants: ProductCardFragment['variants'];
}) {
  return (
    <>
      {variants.nodes.map((variant, idx) => (
        <h4 key={`variant-${idx}`} className={'inline text-copy'}>
          {variant.availableForSale ? (
            variant.title
          ) : (
            <span
              className={clsx(['strike', variant.title.length < 4 && 'small'])}
            >
              {variant.title}
            </span>
          )}
        </h4>
      ))}
    </>
  );
}

function ProductCardImage({
  media,
  title,
  loading,
}: {
  media: MediaFragment[];
  title: string;
  loading?: HTMLImageElement['loading'];
}) {
  const [primary, secondary] = media;
  const baseClasses = 'object-cover w-full absolute inset-0';
  if (!primary)
    return (
      <AspectRatio ratio={4 / 5}>
        <Skeleton className={baseClasses} />
      </AspectRatio>
    );
  return (
    <>
      <MediaFile
        data={primary}
        className={clsx(
          baseClasses,
          'transition-opacity duration-200 ease-in-out group-hover:opacity-0',
        )}
        mediaOptions={getMediaOptions(
          primary.alt || `Picture of ${title}`,
          primary.previewImage?.url ?? '',
          loading,
        )}
      />
      {secondary && (
        <MediaFile
          className={clsx(
            baseClasses,
            'transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100',
          )}
          mediaOptions={getMediaOptions(
            secondary.alt || `Picture of ${title}`,
            secondary.previewImage?.url ?? '',
            'lazy',
          )}
          data={secondary}
        />
      )}
    </>
  );
}

export function getMediaOptions(
  alt: string,
  previewImgUrl?: string,
  loading?: 'eager' | 'lazy',
  sizes = '(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw',
): {
  video: Omit<ComponentProps<typeof Video>, 'data'>;
  image: Omit<HydrogenImageProps, 'data'>;
} {
  return {
    video: {
      controls: false,
      muted: true,
      loop: true,
      playsInline: true,
      autoPlay: true,
      previewImageOptions: {src: previewImgUrl ?? ''},
    },
    image: {
      loading,
      crop: 'center',
      sizes,
      alt,
    },
  };
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
