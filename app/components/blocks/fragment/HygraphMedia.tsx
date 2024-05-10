import clsx from 'clsx';
import type {ReactNode} from 'react';
import React from 'react';

import type {
  AssetDetailsFragment,
  ResponsiveAssetFragment,
} from '~/__generated__/hygraph.generated';
// import {Carousel} from '~/components/Carousel';
import {cn} from '~/lib/utils';
import {Skeleton} from '~/components/ui/skeleton';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselWithCounter,
} from '~/components/ui/carousel';
import {Image, Video} from '@shopify/hydrogen';
import type {MediaFragment} from '~/__generated__/storefrontapi.generated';
// @todo create function overload
// function PolymorphicMedia({
//   media,
//   className,
//   hasCarousel,
//   setPortrait,
// }: {
//   className?: string;
//   media: ResponsiveAssetFragment[];
//   hasCarousel?: boolean;
//   setPortrait?: boolean;
// }): JSX.Element;
//
// function PolymorphicMedia({
//   media,
//   className,
//   hasCarousel,
//   setPortrait,
// }: {
//   className?: string;
//   media: MediaFragment[];
//   hasCarousel?: boolean;
//   setPortrait?: boolean;
// }): JSX.Element;

export function HygraphMultiMedia({
  media,
  className,
  hasCarousel,
  setPortrait = true,
  aspect = 'fluid',
}: {
  className?: string;
  media: ResponsiveAssetFragment[];
  hasCarousel?: boolean;
  setPortrait?: boolean;
  aspect?: '4/5' | '16/9' | 'square' | 'fluid';
}) {
  if (!media[0]) return <></>;
  const ResponsiveAsset = ({...asset}: ResponsiveAssetFragment) =>
    !setPortrait || !asset.portrait ? (
      <HygraphMedia
        className={cn(
          'object-cover',
          aspect === '4/5'
            ? 'aspect-[4/5]'
            : aspect === 'square'
            ? 'aspect-square'
            : aspect === '16/9'
            ? 'aspect-[16/9]'
            : aspect === 'fluid' && 'h-full',
          className,
        )}
        {...asset}
      />
    ) : (
      <>
        <HygraphMedia
          className={cn(
            aspect === '4/5'
              ? 'aspect-[4/5]'
              : aspect === 'square'
              ? 'aspect-square'
              : aspect === '16/9' && 'aspect-[16/9]',
            className,
            'portrait:hidden',
          )}
          {...asset}
        />
        <HygraphMedia
          className={cn(
            aspect === '4/5'
              ? 'aspect-[4/5]'
              : aspect === 'square'
              ? 'aspect-square'
              : aspect === '16/9' && 'aspect-[16/9]',
            className,
            'landscape:hidden',
          )}
          {...asset}
        />
      </>
    );

  return hasCarousel && media.length > 1 ? (
    <>
      <CarouselWithCounter>
        <CarouselContent>
          {media.map((asset, i) => (
            <CarouselItem key={asset.id}>
              <ResponsiveAsset {...asset} key={asset.id} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious isInline={true} />
        <CarouselNext isInline={true} />
      </CarouselWithCounter>
    </>
  ) : (
    <ResponsiveAsset {...media[0]} />
  );
}

function HygraphMedia({
  thumbnail,
  small,
  medium,
  large,
  xlarge,
  url,
  mimeType,
  alt,
  className,
  id,
  srcset,
}: AssetDetailsFragment & {srcset?: string; className?: string}) {
  if (!mimeType) {
    console.warn(
      `Could not load image/video. Invalid mimetype for Asset ( ${id} )`,
    );
    return <Skeleton className={className} />;
  }
  const src = `${small} 320w, ${medium} 680w, ${large} 960w, ${xlarge} 1980w`;
  const classes = clsx(className && className);
  return mimeType.startsWith('image/') ? (
    <img className={classes} srcSet={src} src={url} alt={alt ?? ''} />
  ) : mimeType.startsWith('video/') ? (
    <video className={classes} controls src={url} />
  ) : null;
}
