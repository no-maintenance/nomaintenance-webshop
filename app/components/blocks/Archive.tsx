import {BlockProps, useSettings} from '~/components/blocks/BlockFactory';
import {Heading} from '~/components/Text';
import {HygraphLink} from './fragment/HygraphLink';
import {Link} from '~/components/Link';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';

export function Archive({entries, id, media}: BlockProps<'Archive'>) {
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
                className={'col-span-1'}
              />
            );
          })}
        </div>
      </SpacingWrapper>
    );
  }
  if (!entries) return null;
  return (
    <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
      <div className={'pt-gutter'}>
        <ul
          className={
            'lg:px-gutter grid gap-4 md:gap-8 lg:gap-10 xl:gap-12 py-gutter'
          }
        >
          {entries.map(({title, slug, featuredMedia, id}) => (
            <div key={id} className={'relative'}>
              <Heading as={'h2'} size={'heading'}>
                <Link
                  className={'animated-underline uppercase'}
                  to={`/editorials/${slug}`}
                >
                  {title}
                </Link>
              </Heading>
              {featuredMedia && (
                <HygraphMultiMedia
                  className={'absolute hidden right-0 aspect-[4/5]'}
                  media={[featuredMedia]}
                />
              )}
            </div>
          ))}
        </ul>
      </div>
    </SpacingWrapper>
  );
}
