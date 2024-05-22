import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {cn} from '~/lib/utils';
import {Heading} from '~/components/Text';
import {Button} from '~/components/ui/button';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import type {
  LinkFragment,
  Maybe,
  ResponsiveAssetFragment,
} from '~/__generated__/hygraph.generated';
import type {ReactNode} from 'react';
import {HygraphLink} from '~/components/blocks/fragment/HygraphLink';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {RichText} from '~/components/rich-text/RichText';
import {DEFAULT_RENDERERS} from '~/components/rich-text/defaultElements';

export function MixedMedia({
  __typename,
  body,
  ...props
}: BlockProps<'MixedMedia'>) {
  return (
    <DuplexHygraph {...props}>
      {body && (
        <RichText
          content={body.json}
          references={body.references}
          renderers={DEFAULT_RENDERERS}
        />
      )}
    </DuplexHygraph>
  );
}

export function DuplexHygraph({
  media,
  title,
  children,
  link,
}: {
  link?: Maybe<LinkFragment>;
  children: ReactNode;
  title?: Maybe<string>;
  media?: ResponsiveAssetFragment[];
}) {
  const {verticalPadding, horizontalPadding, reverseLayout, alternateLayout} =
    useSettings();
  const mediaAspectRatio =
    alternateLayout === 'duplex1_1'
      ? 'square'
      : alternateLayout === 'duplexTile'
      ? 'fluid'
      : '4/5';
  const maxHeight = 'md:max-h-[940px]';
  return (
    <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
      <div
        className={cn(
          'grid-cols-2 pb-12 md:pb-0 md:gap-0 mx-auto',
          media && media?.length ? 'grid' : 'flex justify-center',
          maxHeight,
        )}
      >
        {media && media?.length > 0 && (
          <div
            className={cn(
              !children && !title ? 'col-span-2' : 'md:col-span-1 col-span-2',
              reverseLayout && 'md:order-2',
              maxHeight,
            )}
          >
            {link && media.length < 2 ? (
              <HygraphLink hygraphLink={link}>
                <HygraphMultiMedia
                  className={cn('w-full', maxHeight)}
                  aspect={mediaAspectRatio}
                  media={media}
                />
              </HygraphLink>
            ) : (
              <HygraphMultiMedia
                hasCarousel
                className={cn('w-full', maxHeight)}
                media={media}
                aspect={mediaAspectRatio}
              />
            )}
          </div>
        )}

        <div
          className={cn(
            'flex items-center',
            media && media?.length > 0
              ? 'col-span-2 md:col-span-1'
              : 'col-span-2 justify-center max-w-2xl',
          )}
        >
          <div
            className={'grid grid-cols-1 gap-2 p-gutter md:max-w-2xl mx-auto'}
          >
            {title && <Heading as={'h2'}>{title}</Heading>}
            {children}
            {link && link.label && (
              <HygraphLink hygraphLink={link}>
                <Button size={'lg'}>{link.label}</Button>
              </HygraphLink>
            )}
          </div>
        </div>
      </div>
    </SpacingWrapper>
  );
}
