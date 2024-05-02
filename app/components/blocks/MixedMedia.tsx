import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {cn} from '~/lib/utils';
import {Heading} from '~/components/Text';
import {Button} from '~/components/ui/button';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import type {
  LinkFragment,
  ResponsiveAssetFragment,
} from '~/__generated__/hygraph.generated';
import type {ReactNode} from 'react';
import {HygraphLink} from '~/components/blocks/fragment/HygraphLink';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {DEFAULT_RENDERERS, RichText} from '~/components/rich-text';

export function MixedMedia({
  __typename,
  body,
  ...props
}: BlockProps<'MixedMedia'>) {
  console.log(props);
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
  link?: LinkFragment;
  children: ReactNode;
  title?: string;
  media?: ResponsiveAssetFragment[];
}) {
  const {verticalPadding, horizontalPadding, reverseLayout} = useSettings();
  return (
    <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
      <div
        className={'grid grid-cols-2 gap-12 pb-12 md:pb-0 md:gap-4 mx-auto'}
        id={'drop'}
      >
        {media && (
          <div
            className={cn(
              !children && !title ? 'col-span-2' : 'md:col-span-1 col-span-2',
              reverseLayout && 'md:order-2',
            )}
          >
            {media.length > 1 && link ? (
              <HygraphLink hygraphLink={link}>
                <HygraphMultiMedia aspect={'4/5'} media={media} />
              </HygraphLink>
            ) : (
              <HygraphMultiMedia media={media} aspect={'4/5'} />
            )}
          </div>
        )}

        <div
          className={cn(
            'flex items-center ',
            media?.length
              ? 'col-span-2 md:col-span-1'
              : 'col-span-2 justify-center max-w-2xl',
          )}
        >
          <div className={'grid grid-cols-1 gap-8 gutter md:max-w-2xl mx-auto'}>
            {title && (
              <Heading as={'h2'} className={'pb-4 md:pb-8'}>
                {title}
              </Heading>
            )}
            {children}
            {link && (
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
