import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Heading, Section, Text} from '~/components/Text';
import {useLoaderData, useNavigate} from '@remix-run/react';
import type {GetQuantitiesQuery} from '~/__generated__/storefrontapi.generated';
import {useEffect, useRef, useState} from 'react';
import {Transition} from '@headlessui/react';
import {CartForm} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {FeaturedSection} from '~/components/FeaturedShopifyContent';

type Asset = {
  color: string;
  p: string;
  t: string;
  b: string;
  d: string;
  s: string;
  id: string;
  totalInventory?: number; // Add optional property for mapping
  variantId?: string;
};

const productInfo: Asset[] = [
  {
    color: 'black',
    p: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733501084/mohair/blackbeanie_nhewfg.png',
    t: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502293/mohair/Frame15_b53ef099-23ce-466f-aef3-206f694fb968_1_2_ei7aih.png',
    b: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502290/mohair/Frame15_b53ef099-23ce-466f-aef3-206f694fb968_1_1_imxobl.png',
    d: 'Brown and Green abstract mohair blend jacquard beanie.\nOne size fits all.',
    s: '#3D3C36',
    id: '8680200700142',
  },
  {
    color: 'indigo',
    p: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733501084/mohair/bluebeanie_hh0vlx.png',
    t: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502293/mohair/Frame9_d5b08919-06ad-4d8f-9c9a-fbfa38509405_2_dqxhyw.png',
    b: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502291/mohair/Frame9_d5b08919-06ad-4d8f-9c9a-fbfa38509405_1_f2xymn.png',
    d: 'Indigo abstract mohair blend jacquard beanie.\nOne size fits all.',
    s: '#697192',
    id: '8680200143086',
  },
  {
    color: 'burgundy',
    p: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733501083/mohair/maroonbeanie_bnr65y.png',
    t: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502292/mohair/Frame22_71955b64-ac0b-4710-8f33-72fc902ce8e9_2_njddep.png',
    b: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502291/mohair/Frame22_71955b64-ac0b-4710-8f33-72fc902ce8e9_3_vdi40g.png',
    d: 'Burgundy and Grey abstract mohair blend jacquard beanie.\nOne size fits all.',
    s: '#7C4258',
    id: '8680200437998',
  },
  {
    color: 'green',
    p: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733501084/mohair/greenbeanie_slzywu.png',
    t: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502295/mohair/Frame20_1ccfce0a-8dd0-4543-a946-d0445a496abd_1_vye1mk.png',
    b: 'https://res.cloudinary.com/do8kdtxoi/image/upload/v1733502292/mohair/Frame20_1ccfce0a-8dd0-4543-a946-d0445a496abd_2_t5s3rj.png',
    d: 'Brown and Green abstract mohair blend jacquard beanie.\nOne size fits all.',
    s: '#E3C3B4',
    id: '8680199586030',
  },
];

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const collectionHandle = 'the-mohair-jacquard-beanie';
  const {collection} = await context.storefront.query(GET_PRODUCT_QUANTITIES, {
    variables: {
      first: 4,
      handle: collectionHandle,
      sortKey: 'MANUAL',
      reverse: false,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  const products = mapProductsToAssets(collection, productInfo);
  const selectedVariant = findFirstAvailableItem(products) || products[0];

  return {products, selectedVariant, locale: params.locale};
}

export default function Special() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <div>
      <header
        role="banner"
        className={
          'h-nav flex items-center bg-background z-40 top-0 justify-between w-full gap-8 gutter py-8 transition-colors duration-500'
        }
      >
        <div className="flex gap-12 w-full items-center">
          <div className="flex-1 flex items-center self-center leading-[3rem] md:leading-[4rem] justify-center grow w-full h-full">
            <div>
              <Heading
                size={'mid'}
                className="text-center uppercase text-2xl  whitespace-nowrap mb-0 mt-0"
                as={'h2'}
              >
                NO MAINTENANCE
              </Heading>
            </div>
          </div>
        </div>
      </header>
      <div className={'space-y-8 sm:hidden block'}>
        <Section className="px-6">
          <div className={'max-w-xl pt-12 mx-auto'}>
            <Heading as={'h1'} size={'mid'} className={'font-medium'}>
              Buy One, Get One Free
            </Heading>
            <p>
              TODAY ONLY we’re offering a select few members from our community
              a free Mohair Jacquard Beanie to go with the purchase of any item
              from our collection.
            </p>
          </div>
        </Section>
        <Product assets={products} />;
      </div>
      <div className={'hidden sm:block'}>
        <ProductDesktop assets={products} />
        <FeaturedSection />
      </div>
    </div>
  );
}

function ProductDesktop({assets}: {assets: Asset[]}) {
  const {selectedVariant, locale} = useLoaderData<typeof loader>();
  const [selectedAsset, setSelectedAsset] = useState(selectedVariant);
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const isNavigating = useRef(false);
  const navigate = useNavigate();
  const handleAssetChange = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className={'grid-cols-2 gap-2 grid'}>
      {/* Transition for Main Image */}
      <Section className="relative w-full mb-8 col-span-1">
        <Transition
          show={!!selectedAsset}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {selectedAsset && (
            <img
              src={selectedAsset.t}
              alt="Main Beanie"
              className="object-contain w-full h-full"
            />
          )}
        </Transition>
      </Section>
      <Section className="px-6 col-span-1 flex items-center">
        <div>
          <Text size={'fine'} className={'opacity-50 uppercase'}>
            MOHAIR JACQUARD BEANIE
          </Text>
          <div className={'space-y-2'}>
            <Heading as={'h1'} className={'font-medium'}>
              Buy One, Get One Free
            </Heading>
            <p>
              TODAY ONLY we’re offering a select few members from our community
              a free Mohair Jacquard Beanie to go with the purchase of any item
              from our collection.
            </p>
          </div>
          <Heading as={'h2'} size={'mid'} className={'font-medium mt-10'}>
            Select Your Style
          </Heading>
          {/* Color Swatches */}
          <div className="flex space-x-4 my-4">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => handleAssetChange(asset)}
                className={`h-8 w-8 rounded-full outline-black outline-1 outline-offset-1 ${
                  selectedAsset?.id === asset.id ? 'outline ' : ''
                }`}
                style={{backgroundColor: asset.s}}
                aria-label={`Select ${asset.color}`}
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-800 mb-4">{selectedAsset?.d}</p>

          {/* Add to Cart Button */}
          <div>
            <AddToCartButton
              size={'lg'}
              lines={[{merchandiseId: selectedAsset.variantId!, quantity: 1}]}
            >
              Claim Your Reward
              <input
                type={'hidden'}
                name={'redirectTo'}
                value={
                  locale ? `/${locale}/mohair-redeemed` : '/mohair-redeemed'
                }
              />
            </AddToCartButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Product({assets}: {assets: Asset[]}) {
  const {selectedVariant, locale} = useLoaderData<typeof loader>();
  const [selectedAsset, setSelectedAsset] = useState(selectedVariant);
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const navigate = useNavigate();
  const handleAssetChange = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  // toggle cart drawer when adding to cart
  return (
    <div>
      {/* Transition for Main Image */}
      <div className="relative h-64 w-full mb-8">
        <Transition
          show={!!selectedAsset}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {selectedAsset && (
            <img
              src={selectedAsset.p}
              alt="Main Beanie"
              className="object-contain w-full h-full"
            />
          )}
        </Transition>
      </div>
      <Section className="px-6">
        <Text size={'fine'} className={'opacity-50 uppercase'}>
          MOHAIR JACQUARD BEANIE
        </Text>
        <Heading as={'h2'} size={'mid'} className={'font-medium'}>
          Select Your Style
        </Heading>
        {/* Color Swatches */}
        <div className="flex space-x-4 my-4">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => handleAssetChange(asset)}
              className={`h-8 w-8 rounded-full outline-black outline-1 outline-offset-1 ${
                selectedAsset?.id === asset.id ? 'outline ' : ''
              }`}
              style={{backgroundColor: asset.s}}
              aria-label={`Select ${asset.color}`}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-800 mb-4">{selectedAsset?.d}</p>

        {/* Add to Cart Button */}
        <div>
          <AddToCartButton
            size={'lg'}
            lines={[{merchandiseId: selectedAsset.variantId!, quantity: 1}]}
          >
            Claim Your Reward
            <input
              type={'hidden'}
              name={'redirectTo'}
              value={locale ? `/${locale}/mohair-redeemed` : '/mohair-redeemed'}
            />
          </AddToCartButton>
        </div>
      </Section>

      {/* Bottom Image */}
      {selectedAsset && (
        <div className="mt-8">
          <Transition
            show={!!selectedAsset}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <img
              src={selectedAsset.b}
              alt="Bottom Beanie"
              className="object-contain w-full"
            />
          </Transition>
        </div>
      )}
    </div>
  );
}

const mapProductsToAssets = (
  collection: GetQuantitiesQuery['collection'],
  assets: Asset[],
): Asset[] => {
  const products = collection?.products!;
  return assets.map((asset) => {
    const matchingProduct = products.nodes.find(
      (product) => product.id.split('/').pop() === asset.id,
    );
    if (matchingProduct) {
      return {
        ...asset,
        totalInventory: matchingProduct.totalInventory,
        variantId: matchingProduct.variants.nodes[0].id,
      };
    }
    return asset; // Return unchanged asset if no match is found
  });
};

const findFirstAvailableItem = (assets: Asset[]): Asset | null => {
  return (
    assets.find((asset) => asset.totalInventory && asset.totalInventory > 0) ||
    null
  );
};

const GET_PRODUCT_QUANTITIES = `#graphql

query GetQuantities(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
        products(
            first: $first,
            last: $last,
            before: $startCursor,
            after: $endCursor,
            filters: $filters,
            sortKey: $sortKey,
            reverse: $reverse
        ) {
            nodes {
                id
                totalInventory
                variants(first: 1) {
                    nodes {
                        id
                        availableForSale
                    }
                }
            }
        }
    }
}`;
