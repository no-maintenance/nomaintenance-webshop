import {BlockProps, useSettings} from '~/components/blocks/BlockFactory';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';

export function Gallery({media}: BlockProps<'Gallery'>) {
  const settings = useSettings();
  const {verticalPadding, horizontalPadding} = settings;
  if (media.length) {
    return (
      <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          {media.map((asset) => {
            return (
              <HygraphMultiMedia
                key={asset.id}
                media={[asset]}
                className={'col-span-1 h-full w-full'}
              />
            );
          })}
        </div>
      </SpacingWrapper>
    );
  }
}
