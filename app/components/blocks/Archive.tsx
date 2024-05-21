import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {Heading} from '~/components/Text';
import {HygraphLink} from './fragment/HygraphLink';
import {Link} from '~/components/Link';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';

export function Archive({entries, id, media}: BlockProps<'Archive'>) {
  const settings = useSettings();
  const {verticalPadding, horizontalPadding} = settings;
  if (!entries) return null;
  return (
    <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
      <div className={'pt-gutter'}>
        <ul className={'md:px-gutter grid gap-8 md:gap-10 xl:gap-12'}>
          {entries.map(({title, slug, featuredMedia, id}) => (
            <li key={id} className={''}>
              <div className={'group inline-block'}>
                {featuredMedia && (
                  <HygraphMultiMedia
                    className={
                      'fixed gutter hidden md:group-hover:block aspect-[4/5] top-1/2 right-0 transform -translate-y-1/2 max-w-[50%] z-10 max-h-[800px]'
                    }
                    media={[featuredMedia]}
                  />
                )}
                <Heading as={'h2'} size={'heading'}>
                  <Link
                    className={'animated-underline uppercase z-20'}
                    to={`/editorials/${slug}`}
                  >
                    {title}
                  </Link>
                </Heading>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SpacingWrapper>
  );
}
