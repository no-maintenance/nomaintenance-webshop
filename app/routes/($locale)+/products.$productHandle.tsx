import {useState, useRef, Suspense, Fragment, useEffect} from 'react';
import {Listbox} from '@headlessui/react';
import {
  MetaArgs,
  defer,
  redirect,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Await, useNavigate} from '@remix-run/react';
import {
  getSeoMeta,
  ShopifyAnalyticsProduct,
  Storefront,
} from '@shopify/hydrogen';
import {
  flattenConnection,
  AnalyticsPageType,
  Money,
  ShopPayButton,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  Metafield,
  Page,
} from '@shopify/hydrogen/storefront-api-types';
import {AnimatePresence, m} from 'framer-motion';

import type {
  VariantOption,
  VariantOptionValue,
} from '~/components/VariantSelector';
import {VariantSelector} from '~/components/VariantSelector';
import type {
  ProductQuery,
  ProductVariantFragmentFragment,
} from '~/__generated__/storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/lib/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {KlaviyoBackInStock} from '~/components/KlavivyoForm';
// import {Popup, usePopup} from '~/components/Popup';
import {useTranslation} from '~/i18n';
import {ProductGallery} from '~/components/ProductGallery';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Link} from '~/components/Link';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Button} from '~/components/ui/button';
import {Skeleton} from '~/components/ui/skeleton';
import {cn, parseNumberFromShopGid} from '~/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {convertSchemaToHtml} from '@thebeyondgroup/shopify-rich-text-renderer';
import {useMediaQuery} from '~/hooks/useMediaQuery';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {IconGlobe} from '~/components/Icon';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {Localizations} from '~/components/LocaleSelector';
import {useCopyToClipboard} from '~/hooks/useCopyToClipboard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

export const headers = routeHeaders;

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

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

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.
  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: productHandle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

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

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    hasSizeGuide: Boolean(sizeGuideLegacyId),
    sizeGuide: sizeGuidePromise,
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

  const firstVariant = product!.variants.nodes[0];
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
  console.log('Product');
  const lastData = useRef({});
  const data = useLoaderData<typeof loader>() || lastData.current;
  const {product, shop, recommended, variants, sizeGuide, hasSizeGuide} =
    data || lastData.current;
  const {media, title, vendor, descriptionHtml, metafields} = product;
  const selectedVariant = product.selectedVariant!;
  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

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
                <Suspense fallback={<ProductForm variants={[]} />}>
                  <Await
                    errorElement="There was a problem loading related products"
                    resolve={variants}
                  >
                    {(resp) => (
                      <ProductForm
                        variants={resp.product?.variants.nodes || []}
                      />
                    )}
                  </Await>
                </Suspense>
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
                      isActive ? 'font-semibold' : 'font-normal',
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
  const {product, analytics, storeDomain} = useLoaderData<typeof loader>();

  const closeRef = useRef<HTMLButtonElement>(null);

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant!;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity: 1,
  };

  return (
    <div className="grid gap-10">
      <div className="grid gap-10">
        <ProductVariantSelector
          variants={variants}
          showVariantTitle={showVariantTitle}
        />
        {selectedVariant && (
          <div className="grid items-stretch gap-4">
            {isOutOfStock ? (
              <SoldOutButton variants={variants} />
            ) : (
              <AddToCartButton
                size={'sm'}
                className={'w-full'}
                lines={[
                  {
                    merchandiseId: selectedVariant.id!,
                    quantity: 1,
                  },
                ]}
                data-test="add-to-cart"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price),
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

function SoldOutButton({
  variants,
}: {
  variants: ProductVariantFragmentFragment[];
}) {
  const {t} = useTranslation();
  // const {isOpen, openPopup, closePopup} = usePopup();
  const {product} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState(
    product.selectedVariant?.id ?? '',
  );

  return (
    <div>
      <Button
        variant={'outline'}
        size={'sm'}
        className={'text-fine font-semibold cursor-pointer w-full'}
      >
        {t('product.soldOut')} — {t('product.notifyMe')}
      </Button>
      {/*<Popup open={isOpen} onClose={closePopup} fullScreenOnMobile={false}>*/}
      {/*  <div className={'p-6'}>*/}
      {/*    <section>*/}
      {/*      <Heading as={'h2'} className={'uppercase font-medium text-lead'}>*/}
      {/*        NOTIFY ME WHEN BACK IN STOCK*/}
      {/*      </Heading>*/}
      {/*      <div>*/}
      {/*        <Text>*/}
      {/*          We will send you a notification when this product is back in*/}
      {/*          stock.*/}
      {/*        </Text>*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*    <Section padding={'y'}>*/}
      {/*      <div className={'pb-6'}>*/}
      {/*        <Heading as={'h4'} size={'copy'} className={'mb-2'}>*/}
      {/*          {product.title}*/}
      {/*        </Heading>*/}
      {/*        <div className={'w-full'}>*/}
      {/*          <ProductVariantSelector*/}
      {/*            showVariantTitle={false}*/}
      {/*            variants={variants}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <KlaviyoBackInStock source={'popup'} variantId={selectedVariant} />*/}
      {/*    </Section>*/}
      {/*    <section>*/}
      {/*      <Heading size={'copy'} className={'font-medium'}>*/}
      {/*        Log In*/}
      {/*      </Heading>*/}
      {/*      <Link to={`/account`} className={'underline'}>*/}
      {/*        Sign in*/}
      {/*      </Link>{' '}*/}
      {/*      to your account to request a return or ask a question*/}
      {/*    </section>*/}
      {/*  </div>*/}
      {/*</Popup>*/}
    </div>
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
      {/*<Listbox value={selectedOption} onChange={handleSelection}>*/}
      {/*  {({open}) => (*/}
      {/*    <>*/}
      {/*      <Listbox.Button as={Fragment}>*/}
      {/*        <Button*/}
      {/*          className={'text-fine flex items-center justify-between w-full'}*/}
      {/*          variant={'outline'}*/}

      {/*        >*/}
      {/*          {selectedOption.value &&*/}
      {/*            GetVariantLabel(*/}
      {/*              selectedOption.value,*/}
      {/*              selectedVariant.quantityAvailable,*/}
      {/*            )}*/}
      {/*        </Button>*/}
      {/*      </Listbox.Button>*/}
      {/*      <Listbox.Options*/}
      {/*        className={clsx(*/}
      {/*          'border-foreground/10 bg-background absolute bottom-12 z-30 grid w-full overflow-y-scroll  border py-2 transition-[max-height] duration-150 sm:bottom-auto border-t-0 md:border-b',*/}
      {/*          open ? 'max-h-60' : 'max-h-0',*/}
      {/*        )}*/}
      {/*      >*/}
      {/*        {option.values.map(*/}
      {/*          ({value, to, isActive, isAvailable, quantityAvailable}) => (*/}
      {/*            <Listbox.Option*/}
      {/*              key={`option-${option.name}-${value}`}*/}
      {/*              value={{value, to, quantityAvailable}}*/}
      {/*              as={Fragment}*/}
      {/*            >*/}
      {/*              {({active}) => (*/}
      {/*                <li*/}
      {/*                  className={clsx(*/}
      {/*                    'text-foreground w-full py-2 text-copy transition flex justify-between items-center text-left cursor-pointer px-4',*/}
      {/*                    active && 'bg-primary/10',*/}
      {/*                  )}*/}
      {/*                >*/}
      {/*                  {GetVariantLabel(value, quantityAvailable)}*/}
      {/*                </li>*/}
      {/*              )}*/}
      {/*            </Listbox.Option>*/}
      {/*          ),*/}
      {/*        )}*/}
      {/*      </Listbox.Options>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</Listbox>*/}
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
    console.log('handleCopy');
    copy(text)
      .then(() => {
        console.log('Copied!', {text});
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

function ProductDetailsOld({
  metafields,
  descriptionHtml,
}: {
  metafields: Metafield[];
  descriptionHtml: string;
}) {
  const [openTab, setOpenTab] = useState<number>(0);
  const tabs = getMetafieldDefsV2(metafields, descriptionHtml);
  return (
    <div>
      <div
        className={
          'flex justify-between w-full gap-4 uppercase md:max-w-sm md:px-0'
        }
      >
        {tabs.map((tab, idx: number) => (
          <button key={tab.id} onClick={() => setOpenTab(idx)}>
            <Heading
              className={`uppercase ${
                openTab === idx ? 'font-semibold text-copy ' : ''
              }`}
              as={'h4'}
              size={'copy'}
            >
              {tab.name}
            </Heading>
          </button>
        ))}
      </div>
      <div className={'min-h-[200px] max-w-xl  md:max-w-md md:px-0 pt-6'}>
        {tabs.map(
          (tab, idx: number) =>
            openTab === idx && <m.div key={tab.id}>{tab.component}</m.div>,
        )}
      </div>
    </div>
  );
}

function getMfDescriptionV2(mf: Metafield[]) {
  const res = mf.find((f) => f.key === 'description');
  return res?.value;
}

function getMetafieldDefsV2(mf: Metafield[], descriptionHTML: string) {
  const res = [
    {
      name: 'Description',
      id: 'description',
      component: (
        <div className={'rte text-copy text-foreground/50 size-chart'}></div>
        // <div
        //   className={"rte text-copy text-foreground/50 size-chart"}
        //   dangerouslySetInnerHTML={{
        //     __html: convertSchemaToHtml(getMfDescriptionV2(mf))
        //   }}
        // ></div>
      ),
    },
  ];

  for (let i = 0; i < mf.length; i++) {
    const pf = {name: '', component: <></>, id: ''};
    const f = mf[i];

    if (!f) continue;
    if (f.key === 'details') {
      pf.name = 'Details';
      pf.id = 'details';
      pf.component = (
        <div className={'h-full flex items-center'}>
          <div className={'rte text-copy text-foreground/50'}></div>
        </div>
      );
      res.push(pf);
    }
    if (f.key === 'show_policies_product_tab' && f.value == 'true') {
      pf.name = 'Policies';
      pf.id = 'policies';
      pf.component = <Policies />;
      res.push(pf);
    }
  }
  res.push({
    name: 'Measurements',
    id: 'measurements',
    component: (
      <div
        className={'rte text-copy text-foreground/50 size-chart'}
        dangerouslySetInnerHTML={{__html: descriptionHTML}}
      ></div>
    ),
  });
  return res;
}

function Policies() {
  const {shop} = useLoaderData<typeof loader>();

  if (!shop) return <></>;
  const {shippingPolicy, refundPolicy} = shop;
  const p = [
    {id: 0, name: 'Refund Policy', policy: refundPolicy?.body},
    {id: 1, name: 'Shipping Policy', policy: shippingPolicy?.body},
  ];
  const Title = ({name, isOpen}: {name: string; isOpen: boolean}) => {
    return (
      <Heading as={'h3'} size={'copy'}>
        {name}
      </Heading>
    );
  };
  const Description = ({policy}: {policy: string}) => {
    return (
      <div className={'rte'} dangerouslySetInnerHTML={{__html: policy}}></div>
    );
  };
  return (
    <div className={'mx-auto h-full w-full flex items-center'}>
      <div className={'w-full overflow-auto max-h-full'}>
        {shippingPolicy?.body && (
          <div className={'py-6 border-b border-black'}>
            {/*<Accordion*/}
            {/*  isHTML={true}*/}
            {/*  question={'Shipping Policy'}*/}
            {/*  answer={shippingPolicy.body}*/}
            {/*/>*/}
          </div>
        )}
        {refundPolicy?.body && (
          <div className={'py-6'}>
            {/*<Accordion*/}
            {/*  isHTML={true}*/}
            {/*  question={'Refund Policy'}*/}
            {/*  answer={refundPolicy.body}*/}
            {/*/>*/}
          </div>
        )}
      </div>
    </div>
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
            {namespace: "custom", key: "show_policies_product_tab"}
        ]) {
            value
            key
        }
        variants(first: 1) {
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
