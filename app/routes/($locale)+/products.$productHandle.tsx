import {Suspense, useEffect, useRef, useState} from 'react';
import type {type LoaderFunctionArgs, MetaArgs} from '@shopify/remix-oxygen';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData, useLocation, useNavigate} from '@remix-run/react';

import type {ShopifyAnalyticsProduct, Storefront} from '@shopify/hydrogen';
import {
  Analytics,
  AnalyticsPageType,
  flattenConnection,
  getSelectedProductOptions,
  getSeoMeta,
  Money,
  ShopPayButton,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  Metafield,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';

import type {VariantOption} from '~/components/VariantSelector';
import {VariantSelector} from '~/components/VariantSelector';
import type {
  ProductQuery,
  ProductVariantFragmentFragment,
} from '~/__generated__/storefrontapi.generated';
import {Heading, Section, Text} from '~/components/Text';
import {seoPayload} from '~/lib/seo.server';
import {CacheBalanced, routeHeaders} from '~/lib/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments'; // import {KlaviyoBackInStock} from '~/components/KlavivyoForm';
import {ProductGallery} from '~/components/ProductGallery';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Link} from '~/components/Link';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Skeleton} from '~/components/ui/skeleton';
import {cn, parseNumberFromShopGid} from '~/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'; // @ts-ignore
import {convertSchemaToHtml} from '@thebeyondgroup/shopify-rich-text-renderer';
import {useMediaQuery} from 'usehooks-ts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {useCopyToClipboard} from '~/hooks/useCopyToClipboard';
import {SoldOutButton} from '~/components/blocks/ProductBlock';
import {Button} from '~/components/ui/button';
import {MinusIcon, PlusIcon} from 'lucide-react';

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid') &&
      !option.name.startsWith('gclid') &&
      !option.name.startsWith('utm') &&
      !option.name.startsWith('_kx'),
  );

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  if (!product?.id) {
    throw new Response('product', {status: 404});
  }
  product.metafields = product.metafields.filter(Boolean);

  /**
   * Metafields endpoint returns an invalid gid for pages, using the ObjectName 'OnlineStorePage', rather than 'Page'.
   * This is a bug from Shopify.
   * Instead, we grab the legacy Id, then construct our own valid gid for the request.
   */
  const sizeGuideLegacyId = product.metafields
    ? parseNumberFromShopGid(getMetafield('size_guide', product.metafields))
    : null;
  const sizeGuidePromise = sizeGuideLegacyId
    ? context.storefront.query(SIZE_GUIDE_QUERY, {
        variables: {
          id: `gid://shopify/Page/${sizeGuideLegacyId}`,
        },
      })
    : null;
  if (!product.selectedVariant) {
    throw redirectToFirstVariant({product, request});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);

  // TODO: firstVariant is never used because we will always have a selectedVariant due to redirect
  // Investigate if we can avoid the redirect for product pages with no search params for first variant
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };
  const {combinedListings: cListingRes} = await context.hygraph
    .query(CacheBalanced)
    .GetCombinedListings({
      where: {products_some: {gid: product.id}},
    });
  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });
  const combinedListing = cListingRes[0];
  return defer({
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    hasSizeGuide: Boolean(sizeGuideLegacyId),
    sizeGuide: sizeGuidePromise,
    combinedListing,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductQuery['product'];
  request: Request;
}) {
  const url = new URL(request.url);

  const searchParams = new URLSearchParams(url.search);
  const flattenedVariants = flattenConnection(product!.variants);
  const firstVariant = getFirstAvailableVariant(flattenedVariants);
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  url.search = searchParams.toString();

  return redirect(url.href.replace(url.origin, ''), 302);
}

type ProductDisplaySettings = {
  variantSelector: 'listbox' | 'buttons';
  preselectFirstAvailableVariant: boolean;
};
const settings: ProductDisplaySettings = {
  variantSelector: 'buttons',
  preselectFirstAvailableVariant: true,
};
export default function Product() {
  const lastData = useRef({});
  const data = useLoaderData<typeof loader>() || lastData.current;
  const {product, storeDomain, recommended} = data || lastData.current;
  const {media, title, vendor, descriptionHtml, metafields} = product;
  const selectedVariant = product.selectedVariant!;
  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    parseFloat(selectedVariant?.price?.amount) <
      parseFloat(selectedVariant?.compareAtPrice?.amount);

  useEffect(() => {
    if (data) lastData.current = data;
  }, [data]);
  return (
    <>
      <Section className="px-0 pt-0 md:px-6 lg:px-8 xl:px-10">
        <div className="grid items-start md:grid-cols-2 grid-cols-1">
          <div className={'col-span-1'}>
            <ProductGallery media={media.nodes} />
          </div>
          <div className="px-8 md:px-0 sticky col-span-1 md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full gap-8 md:p-8 md:pt-20 md:mx-auto md:max-w-lg ">
              <div className={'md:max-w-sm md:px-0 grid gap-4'}>
                <div className="grid">
                  <div className={'flex justify-between w-full'}>
                    {vendor && (
                      <Text size={'fine'} className={'opacity-50 uppercase'}>
                        {vendor}
                      </Text>
                    )}
                    <Text className={'pl-2'}>
                      <Money
                        withoutTrailingZeros
                        data={selectedVariant?.price!}
                        as="span"
                        data-test="price"
                        className={cn(isOnSale && 'text-primary')}
                      />
                      {isOnSale && (
                        <Money
                          withoutTrailingZeros
                          data={selectedVariant?.compareAtPrice!}
                          as="span"
                          className="opacity-50 strike ml-3"
                        />
                      )}
                    </Text>
                  </div>
                  <Heading
                    size={'copy'}
                    as="h1"
                    className="whitespace-normal uppercase font-normal my-0"
                  >
                    {title}
                  </Heading>
                </div>

                <ProductForm
                  key={product.handle}
                  variants={product?.variants.nodes || []}
                />
              </div>
              <ProductInfoPopups />
              <Suspense>
                <Await resolve={metafields}>
                  <ProductDetails
                    metafields={metafields}
                    descriptionHtml={descriptionHtml}
                  />
                </Await>
              </Suspense>
            </section>
          </div>
        </div>
      </Section>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
          )}
        </Await>
      </Suspense>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              image: selectedVariant.image.url,
              handle: product.handle,
              compareAtPrice: selectedVariant.compareAtPrice,
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

function ProductInfoPopups() {
  return (
    <nav className={'flex justify-between md:max-w-sm'}>
      <SizeGuide />
      <SupportPopup />
    </nav>
  );
}

function ProductVariantSelector({
  variants,
  showVariantTitle,
}: {
  showVariantTitle: boolean;
  variants: ProductVariantFragmentFragment[];
}) {
  const {product} = useLoaderData<typeof loader>();
  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={variants}
    >
      {({option}) => {
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap gap-y-2 last:mb-0"
          >
            {showVariantTitle && (
              <Heading as="legend" size="lead" className="min-w-[4rem]">
                {option.name}
              </Heading>
            )}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {settings.variantSelector === 'listbox' ? (
                <ProductListbox option={option} />
              ) : (
                option.values.map(({value, isAvailable, isActive, to}) => (
                  <Link
                    key={option.name + value}
                    to={to}
                    preventScrollReset
                    prefetch="intent"
                    replace
                    className={clsx(
                      'text-fine subpixel-antialiased leading-none py-1 cursor-pointer transition-all duration-200',
                      isActive ? 'font-semibold underline' : 'font-normal',
                      isAvailable ? 'opacity-100' : 'opacity-50',
                    )}
                  >
                    {value}
                  </Link>
                ))
              )}
            </div>
          </div>
        );
      }}
    </VariantSelector>
  );
}

export function ProductForm({
  variants,
  showVariantTitle = false,
}: {
  showVariantTitle?: boolean;
  variants: ProductVariantFragmentFragment[];
}) {
  const {product, analytics, storeDomain, combinedListing} =
    useLoaderData<typeof loader>();
  const [quantity, setQuantity] = useState(1);
  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant!;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity,
  };

  return (
    <div className="grid gap-10">
      <div className="grid gap-10">
        <ProductVariantSelector
          product={product}
          variants={variants}
          showVariantTitle={showVariantTitle}
        />
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            <div className={'flex gap-4'}>
              {combinedListing && (
                <div className={'flex-1'}>
                  <CombinedListingSelectBox key={product.handle} />
                </div>
              )}
              {getMetafield('quantity_selector', product.metafields) && (
                <div className={'flex-1'}>
                  <Button variant="outline" asChild className={'px-0'}>
                    <div className={'flex w-full'}>
                      <Button
                        variant="link"
                        className={'flex-1 px-0'}
                        disabled={quantity <= 1}
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        <MinusIcon size={7} />
                      </Button>
                      <div className={'flex-1 px-4'}>
                        <input
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                          type={'number'}
                          className={
                            'p-0 border-0 text-center no-arrows w-16 text-fine'
                          }
                          value={quantity}
                        />
                      </div>

                      <Button
                        variant="link"
                        className={'flex-1 px-0 text-right'}
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <PlusIcon size={7} />
                      </Button>
                    </div>
                  </Button>
                </div>
              )}
            </div>
            {isOutOfStock ? (
              <SoldOutButton
                initSelectedVariant={selectedVariant}
                product={product}
                variants={variants}
              />
            ) : (
              <AddToCartButton
                className={'w-full'}
                lines={[
                  {
                    merchandiseId: selectedVariant.id!,
                    quantity,
                  },
                ]}
                data-test="add-to-cart"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price) * quantity,
                }}
              >
                <Text
                  as="span"
                  size={'fine'}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Add to Cart</span>
                </Text>
              </AddToCartButton>
            )}
            {!isOutOfStock && (
              <div
                className={'leading-[0px] h-[var(--shop-pay-button-height)]'}
              >
                <ShopPayButton
                  width="100%"
                  variantIds={[selectedVariant?.id!]}
                  storeDomain={storeDomain}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function CombinedListingSelectBox() {
  const {product, combinedListing} = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(product.handle);
  return (
    <Select
      onValueChange={(e) => {
        navigate(e + location.search);
      }}
      defaultValue={`/products/${product.handle}`}
    >
      <SelectTrigger>
        <SelectValue className={'text-fine'} />
      </SelectTrigger>
      <SelectContent>
        {combinedListing.products.map((p) => (
          <SelectItem key={p.gid} value={`/products/${p.slug}`}>
            {p.alias}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function ProductListbox({option}: {option: VariantOption}) {
  const {product} = useLoaderData<typeof loader>();
  const selectedVariant = product.selectedVariant!;
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Select
        value={option.value}
        onValueChange={(selectedOption) => {
          const value = option.values.find((v) => v.value === selectedOption);

          if (value) {
            navigate(value.to);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Size" />
        </SelectTrigger>
        <SelectContent className={'bg-background'}>
          {option.values.map(
            ({value, to, isActive, isAvailable, quantityAvailable}) => (
              <SelectItem
                key={value}
                value={value}
                className={'cursor-pointer'}
              >
                {value}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

function GetVariantLabel(value: string, quantityAvailable?: Maybe<number>) {
  const urgencyLabel = () => {
    if (!value) return <></>;
    if (quantityAvailable === 0) {
      return <span>Sold Out</span>;
    }
    if (quantityAvailable && quantityAvailable < 5 && quantityAvailable > 0) {
      return <span>Only {quantityAvailable} remaining</span>;
    }
    return <></>;
  };
  return (
    <>
      <span>{value}</span>
      {urgencyLabel()}
    </>
  );
}

function ProductDetails({
  metafields,
  descriptionHtml,
}: {
  metafields: Maybe<Pick<Metafield, 'value' | 'key'>>[];
  descriptionHtml: string;
}) {
  const rawDetails = getMetafield('details', metafields);
  const details = rawDetails ? JSON.parse(rawDetails) : null;
  return (
    <Accordion
      defaultValue="item-1"
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <div
            className={'prose'}
            dangerouslySetInnerHTML={{__html: descriptionHtml}}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          <div
            className={'prose'}
            dangerouslySetInnerHTML={{
              __html: convertSchemaToHtml(details),
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function getMetafield(
  key: string,
  arr: Maybe<Pick<Metafield, 'value' | 'key'>>[],
) {
  const metaObject = arr.find((obj) => obj.key === key);
  return metaObject ? metaObject.value : undefined;
}

function SizeGuide() {
  const [open, setOpen] = useState(false);
  const {sizeGuide} = useLoaderData<typeof loader>();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const title = 'Size Guide';
  const Trigger = () => (
    <button className={'underline hover:text-foreground text-muted-foreground'}>
      Size Guide
    </button>
  );
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={'underline hover:text-foreground text-muted-foreground'}
        >
          Size Guide
        </DialogTrigger>
        <DialogContent>
          <div className={'size-chart'}>
            <Suspense>
              <Await resolve={sizeGuide}>
                {(res) =>
                  res?.page?.body && (
                    <div dangerouslySetInnerHTML={{__html: res.page.body}} />
                  )
                }
              </Await>
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={'underline hover:text-foreground text-muted-foreground'}
      >
        Size Guide
      </DrawerTrigger>
      <DrawerContent>
        {/*<DrawerHeader className="text-left">*/}
        {/*  <DrawerTitle>{title}</DrawerTitle>*/}
        {/*  /!*<DrawerDescription>{description}</DrawerDescription>*!/*/}
        {/*</DrawerHeader>*/}
        <div className={'size-chart p-gutter'}>
          <Suspense>
            <Await resolve={sizeGuide}>
              {(res) =>
                res?.page?.body && (
                  <div dangerouslySetInnerHTML={{__html: res.page.body}} />
                )
              }
            </Await>
          </Suspense>
          {/*<div className={'p-4'}>*/}
          {/*  <div dangerouslySetInnerHTML={{__html: sizeGuide}} />*/}
          {/*<DrawerClose asChild>*/}
          {/*  <Button className={'w-full'} variant="outline">*/}
          {/*    Cancel*/}
          {/*  </Button>*/}
          {/*</DrawerClose>*/}
          {/*</div>*/}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SupportPopup() {
  const [open, setOpen] = useState(false);
  const {sizeGuide} = useLoaderData<typeof loader>();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [_, copy] = useCopyToClipboard();
  const [tooltipText, setTooltipText] = useState('Copy to Clipboard');
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setTooltipText('Copied to Clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy!', error);
      });
  };

  const title = 'SUPPORT';

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={'underline hover:text-foreground text-muted-foreground'}
        >
          Support?
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className={'pb-gutter grid gap-4'}>
            <div>
              <Heading as={'h5'} size={'copy'} className={'font-medium'}>
                Email
              </Heading>
              <span>support@nomaintenance.us</span>
              {/*<TooltipProvider>*/}
              {/*  <Tooltip delayDuration={0}>*/}
              {/*    <TooltipTrigger*/}
              {/*      onClick={(event) => {*/}
              {/*        event.preventDefault();*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <span*/}
              {/*        onClick={(event) => {*/}
              {/*          console.log('clicked');*/}
              {/*          handleCopy('support@nomaintenance.us');*/}
              {/*          event.preventDefault();*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        support@nomaintenance.us*/}
              {/*      </span>*/}
              {/*    </TooltipTrigger>*/}
              {/*    <TooltipContent*/}
              {/*      onPointerDownOutside={(event) => {*/}
              {/*        event.preventDefault();*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <p>{tooltipText}</p>*/}
              {/*    </TooltipContent>*/}
              {/*  </Tooltip>*/}
              {/*</TooltipProvider>*/}
            </div>
            <div>
              <Heading as={'h5'} size={'copy'} className={'font-medium'}>
                Log In
              </Heading>
              <p>
                <Link to={'/account'} className={'underline'}>
                  Sign in to your account
                </Link>{' '}
                to request a return or ask a question
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={'underline hover:text-foreground text-muted-foreground'}
      >
        Support?
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className={'size-chart p-gutter'}>
          <div className={'pb-gutter grid gap-4'}>
            <div>
              <Heading as={'h5'} size={'copy'} className={'font-medium'}>
                Email
              </Heading>
              <span>support@nomaintenance.us</span>
              {/*<TooltipProvider>*/}
              {/*  <Tooltip delayDuration={0}>*/}
              {/*    <TooltipTrigger*/}
              {/*      onClick={(event) => {*/}
              {/*        event.preventDefault();*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <span*/}
              {/*        onClick={(event) => {*/}
              {/*          console.log('clicked');*/}
              {/*          handleCopy('support@nomaintenance.us');*/}
              {/*          event.preventDefault();*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        support@nomaintenance.us*/}
              {/*      </span>*/}
              {/*    </TooltipTrigger>*/}
              {/*    <TooltipContent*/}
              {/*      onPointerDownOutside={(event) => {*/}
              {/*        event.preventDefault();*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <p>{tooltipText}</p>*/}
              {/*    </TooltipContent>*/}
              {/*  </Tooltip>*/}
              {/*</TooltipProvider>*/}
            </div>
            <div>
              <Heading as={'h5'} size={'copy'} className={'font-medium'}>
                Log In
              </Heading>
              <p>
                <Link to={'/account'} className={'underline'}>
                  Sign in to your account
                </Link>{' '}
                to request a return or ask a question
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    quantityAvailable
    selectedOptions {
        name
        value
    }
    image {
        id
        url
        altText
        width
        height
    }
    price {
        amount
        currencyCode
    }
    compareAtPrice {
        amount
        currencyCode
    }
    sku
    title
    unitPrice {
        amount
        currencyCode
    }
    product {
        title
        handle
    }
}
`;

const PRODUCT_QUERY = `#graphql
query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
        id
        title
        vendor
        handle
        descriptionHtml
        description
        options {
            name
            values
        }
        selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
            ...ProductVariantFragment
        }
        media(first: 7) {
            nodes {
                ...Media
            }
        }
        metafields(identifiers: [
            {namespace: "product_tab", key: "description"},
            {namespace: "product_tab", key: "size_guide"},
            {namespace: "product_tab", key: "details"},
            {namespace: "product_tab", key: "measurements"},
            {namespace: "product_tab", key: "size"},
            {namespace: "custom", key: "show_policies_product_tab"},
            {namespace: "display", key: "quantity_selector"}
        ]) {
            value
            key
        }
        variants(first: 10) {
            nodes {
                ...ProductVariantFragment
            }
        }
        seo {
            description
            title
        }
    }
    shop {
        name
        primaryDomain {
            url
        }
        shippingPolicy {
            body
            handle
        }
        refundPolicy {
            body
            handle
        }
    }
}
${MEDIA_FRAGMENT}
${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
        variants(first: 250) {
            nodes {
                ...ProductVariantFragment
            }
        }
    }
}
${PRODUCT_VARIANT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
        ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
        nodes {
            ...ProductCard
        }
    }
}
${PRODUCT_CARD_FRAGMENT}
` as const;

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}

const SIZE_GUIDE_QUERY = `#graphql
query SizeGuide($language: LanguageCode, $id: ID!)
@inContext(language: $language) {
    page(id: $id) {
        body
    }
}
` as const;
export const getFirstAvailableVariant = (v: ProductVariant[]) => {
  for (let i = 0; i < v.length; i++) {
    if (v[i].availableForSale) return v[i];
  }
  return v[0];
};
