import {Image, MediaFile} from '@shopify/hydrogen';
import {ReactNode, useContext} from 'react';

import {
  HeaderStyle,
  HeroesFragment,
  LinkFragment,
} from '~/__generated__/hygraph.generated';
import {useBaseLayoutData} from '~/routes/($locale)+/_layout';
import {Link} from '~/components/Link';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {
  getDestination,
  HygraphLink,
} from '~/components/blocks/fragment/HygraphLink';
import {CollectionInfo, HygraphProduct} from '~/components/ShopMemos';
import type {TileHeaderProps, TileProps} from '~/components/ui/tile';
import {
  Tile,
  TileBackground,
  TileDescription,
  TileHeader,
  TileTitle,
} from '~/components/ui/tile';
import {CounterSize} from '~/components/Countdown';
import {EventCounter} from '~/components/blocks/EventBlock';
import {cn} from '~/lib/utils';
import {Skeleton} from '~/components/ui/skeleton';
import {LayoutContext} from '~/components/Layout';

enum HeroMode {
  Duplex = 'duplex',
  Singular = 'singular',
  Sticky = 'sticky',
}

type HeroProps = {
  hero: HeroesFragment;
  size: TileProps['size'];
  posX: TileHeaderProps['posX'];
  posY: TileHeaderProps['posY'];
  mode: HeroMode;
  showExcerpt?: boolean;
};
type HeroSettings = Omit<HeroProps, 'hero'>;
export function HeroFactory({
  heroes,
  reverseLayout,
}: {
  heroes: HeroesFragment[];
  reverseLayout: boolean;
}) {
  const {layoutConfig} = useBaseLayoutData();
  const isFluid = layoutConfig.header === HeaderStyle.Fluid;
  if (heroes.length === 1) {
    const settings: HeroSettings = {
      size: isFluid ? 'screen' : 'navOffset',
      posX: 'left',
      posY: 'bottom',
      mode: HeroMode.Singular,
    };
    const hero = heroes[0];
    return <HeroSwitcher hero={hero} {...settings} />;
  }
  if (heroes.length === 2) {
    const settings: HeroSettings = {
      size: 'fluid',
      posX: 'right',
      posY: 'bottom',
      showExcerpt: false,
      mode: HeroMode.Duplex,
    };
    const col1 = {
      hero: heroes[0],
      ...settings,
    };
    const col2 = {
      hero: heroes[1],
      ...settings,
    };
    return <DuplexHero col1={col1} col2={col2} />;
  }
  if (heroes.length > 2) {
    const settings: HeroSettings = {
      size: 'fluid',
      posX: 'right',
      posY: 'bottom',
      showExcerpt: false,
      mode: HeroMode.Sticky,
    };
    return (
      <StickyHero
        reverseLayout={reverseLayout}
        settings={settings}
        heroes={heroes}
      />
    );
  }
  return <></>;
}
function StickyHero({
  settings,
  heroes,
  reverseLayout,
}: {
  reverseLayout: boolean;
  settings: HeroSettings;
  heroes: HeroesFragment[];
}) {
  const [stickyHero, ...gridHeroes] = heroes;
  const layout = useContext(LayoutContext);
  const isFluid = layout.header === HeaderStyle.Fluid;
  return (
    <section className={'grid grid-cols-1 md:grid-cols-2 w-full gap-0'}>
      <div className={cn('h-full', reverseLayout ? 'order-2' : 'order-1')}>
        <div className={cn(isFluid ? 'top-0' : 'top-nav', 'sticky')}>
          <HeroSwitcher
            hero={stickyHero}
            {...settings}
            size={isFluid ? 'screen' : 'navOffset'}
            mode={HeroMode.Singular}
          />
        </div>
      </div>
      <div className={'grid grid-cols-1 order-1'}>
        {gridHeroes &&
          gridHeroes.map((hero) => (
            <HeroSwitcher key={hero.id} hero={hero} {...settings} />
          ))}
      </div>
    </section>
  );
}
function DuplexHero({col1, col2}: {col1: HeroProps; col2: HeroProps}) {
  return (
    <div dir={'rtl'} className={'grid grid-cols-1 md:grid-cols-2'}>
      <HeroSwitcher {...col1} />
      <HeroSwitcher {...col2} />
    </div>
  );
}

function HeroSwitcher({hero, ...settings}: HeroProps) {
  switch (hero.__typename) {
    case 'Collection':
    case 'Product':
      return <ShopifyHero hero={hero} {...settings} />;
    default:
      return <HygraphHero hero={hero} {...settings} />;
  }
}

const LinkWrap = ({
  children,
  to,
  ...props
}: {
  children: ReactNode;
  to?: string;
}) =>
  !to ? (
    <>{children}</>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  );

function SkeletonTile({...settings}: HeroSettings) {
  const {size, posX, posY, showExcerpt, mode} = settings;
  return (
    <Tile size={size} mode={mode}>
      <TileHeader posX={posX} posY={posY}>
        <TileTitle>
          <Skeleton className={'h-32 w-1/4'} />
        </TileTitle>
        {showExcerpt && (
          <TileDescription>
            <Skeleton className={'h-32 w-1/2'} />
          </TileDescription>
        )}
      </TileHeader>
      <Skeleton className={'absolute inset-0'} />
    </Tile>
  );
}

type ShopifyHeroDiscriminates =
  | {__typename: 'Collection'}
  | {__typename: 'Product'};
type HygraphHeroDiscriminates =
  | {__typename: 'Page'}
  | {__typename: 'Event'}
  | {__typename: 'MixedMedia'}
  | {__typename: 'Editorial'};

type DiscriminatedHero<E> = HeroSettings & {
  hero: Extract<HeroesFragment, E>;
};

function HygraphHero({
  hero,
  ...props
}: DiscriminatedHero<HygraphHeroDiscriminates>) {
  const Wrap = ({
    children,
    to,
    ...props
  }: {
    children: ReactNode;
    to?: LinkFragment | string | null;
  }) => {
    if (!to) return <>{children}</>;
    if (typeof to !== 'string')
      return <HygraphLink hygraphLink={to}>{children}</HygraphLink>;
    return (
      <Link to={to} prefetch={'intent'} {...props}>
        {children}
      </Link>
    );
  };

  const {__typename, title} = hero;
  let media, excerpt, to, id;
  switch (__typename) {
    case 'MixedMedia':
      to = hero?.link;
      media = hero.media;
      excerpt = hero?.excerpt?.html;
      break;
    case 'Editorial':
      to = getDestination({slug: hero.slug, __typename});
      media = [hero.featuredMedia].filter(Boolean);
      excerpt = hero?.excerpt?.html;
      break;
    case 'Page':
      to = getDestination({
        slug: hero.slug,
        __typename,
        staticPage: hero.staticPage,
      });
      media = [hero.featuredMedia].filter(Boolean);
      excerpt = null;
      break;
    case 'Event':
      to = hero.hasReleasePage
        ? getDestination({slug: hero.slug, __typename})
        : null;
      media = [hero.featuredMedia].filter(Boolean);
      excerpt = hero?.excerpt?.html;
      let overrideClasses = '';
      if (!media) {
        props.posY = 'middle';
        props.posX = 'center';
        overrideClasses = 'text-foreground';
      }
      return (
        <Wrap to={to}>
          <Tile size={props.size} mode={props.mode}>
            <TileHeader
              posX={props.posX}
              posY={props.posY}
              className={overrideClasses}
            >
              <EventCounter
                size={
                  props.mode === HeroMode.Singular
                    ? CounterSize.Large
                    : CounterSize.Small
                }
                hero={hero}
              />
              {excerpt && props.showExcerpt && (
                <TileDescription dangerouslySetInnerHTML={{__html: excerpt}} />
              )}
            </TileHeader>
            {media && (
              <TileBackground asChild>
                <HygraphMultiMedia
                  media={media}
                  aspect={'fluid'}
                  className={'inset-0 object-cover'}
                />
              </TileBackground>
            )}
          </Tile>
        </Wrap>
      );
  }
  let overrideClasses = '';
  if (!media.length) {
    props.posY = 'middle';
    props.posX = 'center';
    overrideClasses = 'text-foreground';
  }
  return (
    <Wrap to={to}>
      <Tile size={props.size} mode={props.mode}>
        <TileHeader
          posX={props.posX}
          posY={props.posY}
          className={overrideClasses}
        >
          {title && <TileTitle>{title}</TileTitle>}
          {excerpt && props.showExcerpt && (
            <TileDescription dangerouslySetInnerHTML={{__html: excerpt}} />
          )}
        </TileHeader>
        {media && (
          <TileBackground asChild>
            <HygraphMultiMedia
              media={media}
              aspect={'fluid'}
              className={'inset-0 object-cover'}
            />
          </TileBackground>
        )}
      </Tile>
    </Wrap>
  );
}

function ShopifyHero({
  hero,
  ...props
}: DiscriminatedHero<ShopifyHeroDiscriminates>) {
  const imgSizes =
    props.mode === HeroMode.Singular
      ? '(min-width: 48em) 50vw, 100vw'
      : '100vw';
  switch (hero.__typename) {
    case 'Collection':
      return (
        <CollectionInfo gid={hero.gid} Fallback={<SkeletonTile {...props} />}>
          {({collection}) => {
            console.log('collection', collection);
            let overrideClasses = '';
            if (!collection?.image) {
              props.posY = 'middle';
              props.posX = 'center';
              overrideClasses = 'text-foreground';
            }
            console.log('collection', collection);
            return (
              <LinkWrap
                to={
                  collection?.handle
                    ? `/collections/${collection.handle}`
                    : undefined
                }
              >
                <Tile mode={props.mode} size={props.size}>
                  <TileHeader
                    posX={props.posX}
                    posY={props.posY}
                    className={overrideClasses}
                  >
                    <TileTitle>{collection?.title}</TileTitle>
                    {props.showExcerpt && collection?.descriptionHtml && (
                      <TileDescription
                        dangerouslySetInnerHTML={{
                          __html: collection.descriptionHtml,
                        }}
                      ></TileDescription>
                    )}
                  </TileHeader>
                  <TileBackground asChild>
                    {collection?.image && (
                      <Image sizes={imgSizes} data={collection?.image} />
                    )}
                  </TileBackground>
                </Tile>
              </LinkWrap>
            );
          }}
        </CollectionInfo>
      );
    case 'Product':
      return (
        <HygraphProduct gid={hero.gid} Fallback={<SkeletonTile {...props} />}>
          {({product}) => {
            const [primary, secondary] = product.media.nodes;
            return (
              <LinkWrap
                to={product?.handle ? `/products/${product.handle}` : undefined}
              >
                <Tile size={props.size} mode={props.mode}>
                  <TileHeader
                    posX={props.posX}
                    posY={props.posY}
                    className={cn(!primary && 'text-foreground')}
                  >
                    <TileTitle>{product?.title}</TileTitle>
                    {props.showExcerpt && product?.descriptionHtml && (
                      <TileDescription
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      ></TileDescription>
                    )}
                  </TileHeader>
                  {primary && (
                    <TileBackground asChild>
                      {props.mode === HeroMode.Singular ? (
                        <MediaFile data={primary} />
                      ) : (
                        <div className={'grid grid-cols-1 md:grid-cols-2'}>
                          <MediaFile
                            className={'inset-0 object-cover h-full'}
                            data={primary}
                          />
                          {secondary && (
                            <MediaFile
                              className={
                                'inset-0 object-cover hidden md:block h-full'
                              }
                              data={secondary}
                            />
                          )}
                        </div>
                      )}
                    </TileBackground>
                  )}
                </Tile>
              </LinkWrap>
            );
          }}
        </HygraphProduct>
      );
  }
}
