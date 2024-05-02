import {Image} from '@shopify/hydrogen';

import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {CollectionFeed} from '~/components/ShopMemos';
import {ProductCard} from '~/components/ProductCard';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Grid} from '~/components/Grid';
import {Link} from '~/components/Link';
import {Heading} from '~/components/Text';
import {getImageLoadingPriority} from '~/lib/const';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import {Button} from '~/components/ui/button';
import {cn} from '~/lib/utils';
import type {ProductConnection} from '@shopify/hydrogen-react/storefront-api-types';
import type {CollectionFeedQuery} from '~/__generated__/storefrontapi.generated';

export function CollectionBlock({gid}: BlockProps<'Collection'>) {
  const settings = useSettings();
  const {verticalPadding, horizontalPadding, reverseLayout, heading} = settings;
  let dataType = 'feed';
  const Component = ({
    collection,
  }: {
    collection: CollectionFeedQuery['collection'];
  }) => {
    if (!collection) return;
    switch (settings.alternateLayout) {
      case 'swimlanes':
        return (
          <SpacingWrapper
            spacing={{verticalPadding, horizontalPadding}}
            defaults={{vertical: 'gutter-y', horizontal: ''}}
          >
            <ProductSwimlane products={collection.products} count={12} />
          </SpacingWrapper>
        );
      case 'duplex':
        dataType = 'info';
        return (
          <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
            <div
              className={
                'grid grid-cols-2 gap-12 pb-12 md:pb-0 md:gap-4 mx-auto'
              }
              id={'drop'}
            >
              {collection.image && (
                <div
                  className={cn(
                    'md:col-span-1 col-span-2',
                    reverseLayout && 'md:order-2',
                  )}
                >
                  <Link to={`/collections/${collection.handle}`}>
                    <Image
                      sizes={'(min-width: 48em) 50vw, 100vw'}
                      loading={'lazy'}
                      data={collection.image}
                    />
                  </Link>
                </div>
              )}
              <div className={'flex items-center col-span-2 md:col-span-1 '}>
                <div
                  className={
                    'grid grid-cols-1 gap-8 gutter md:max-w-2xl mx-auto'
                  }
                >
                  <Heading as={'h2'} className={'pb-4 md:pb-8'}>
                    {heading ? heading : collection.title}
                  </Heading>
                  {collection.descriptionHtml && (
                    <div
                      className={'prose text-justify'}
                      dangerouslySetInnerHTML={{
                        __html: collection.descriptionHtml,
                      }}
                    />
                  )}
                  <Link to={`/collections/${collection.handle}`}>
                    <Button size={'lg'}>Shop now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </SpacingWrapper>
        );
      default:
        return (
          <SpacingWrapper spacing={{verticalPadding, horizontalPadding}}>
            <Feed products={collection.products} />
          </SpacingWrapper>
        );
    }
  };
  if (dataType === 'feed')
    return (
      <CollectionFeed gid={gid}>
        {({collection}) => <Component collection={collection} />}
      </CollectionFeed>
    );
  return (
    <></>
    // <HygraphCollection gid={gid} type={HygraphCollectionType.Feed}>
    //   {({collection}) => <Component collection={collection} />}
    // </HygraphCollection>
  );
}
function Feed({products}: {products: ProductConnection}) {
  return (
    <Grid layout={'products'}>
      {products &&
        products.nodes.map((product, i: number) => (
          <ProductCard
            key={`product-card--${i}--${product.id}`}
            product={product}
            idx={i}
            loading={getImageLoadingPriority(i)}
          />
        ))}
    </Grid>
  );
}
