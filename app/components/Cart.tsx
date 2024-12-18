import clsx from 'clsx';
import {useRef, useState} from 'react';
import {useScroll} from 'react-use';
import {
  CartForm,
  type CartReturn,
  flattenConnection,
  Image,
  Money,
  OptimisticInput,
  Analytics,
  useOptimisticData,
} from '@shopify/hydrogen';
import type {
  Cart as CartType,
  CartCost,
  CartLine,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';

import {useTranslation} from '~/i18n';
import {IconRemove} from '~/components/Icon';
import {Link} from '~/components/Link';
import {Heading, Text} from '~/components/Text';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {FeaturedProducts} from '~/components/FeaturedShopifyContent';

type Layouts = 'page' | 'drawer';

export function Cart({
  layout,
  onClose,
  cart,
}: {
  layout: Layouts;
  onClose?: () => void;
  cart: CartReturn | null;
}) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0); // @TODO investigate why my cart lines return nodes rather than edges

  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
      <Analytics.CartView />
    </>
  );
}

export function CartDetails({
  layout,
  cart,
}: {
  layout: Layouts;
  cart: CartType | null;
}) {
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return (
    <div className={container[layout]}>
      {cartHasItems && (
        <CartSummary
          quantity={cart.totalQuantity}
          cost={cart.cost}
          layout={layout}
        >
          <div>
            <CartDiscounts discountCodes={cart.discountCodes} />
            <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
          </div>
        </CartSummary>
      )}
      <CartLines lines={cart?.lines} layout={layout} />
    </div>
  );
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */

function CartDiscounts({
  discountCodes,
}: {
  discountCodes: CartType['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes.length ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <Text as="dd">{codes}</Text>
            <UpdateDiscountForm>
              <div className={'pl-2 flex items-center'}>
                <button>
                  <IconRemove
                    aria-hidden="true"
                    style={{height: 18, marginRight: 4}}
                  />
                </button>
              </div>
            </UpdateDiscountForm>
          </div>
        </div>
      </dl>

      {/* No discounts, show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div
          className={clsx(
            codes.length ? 'hidden' : 'flex',
            'items-center gap-4 justify-between text-copy',
          )}
        >
          <Input
            type="text"
            name="discountCode"
            placeholder="Apply discount code"
          />

          <Button variant={'outline'}>Apply Discount</Button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLines({
  layout = 'drawer',
  lines: cartLines,
}: {
  layout: Layouts;
  lines: CartType['lines'] | undefined;
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow md:translate-y-4'
      : 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <ul className="grid gap-6 md:gap-10">
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line as CartLine} />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-4">
      <a href={checkoutUrl} target="_self">
        <Button size="lg" className={'w-full'}>
          Continue to Checkout
        </Button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({
  cost,
  layout,
  quantity,
  children = null,
}: {
  quantity: number;
  children?: React.ReactNode;
  cost: CartCost;
  layout: Layouts;
}) {
  const summary = {
    drawer: 'grid-cols-1 grid gap-6 pt-6 pb-6 px-4 md:px-6',
    page: ' sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-background rounded w-full',
  };
  const {t} = useTranslation();
  return (
    <section aria-labelledby="summary-heading" className={summary[layout]}>
      <h2 id="summary-heading" className="sr-only">
        {t('layout.cart.orderSummary')}
      </h2>
      <dl className={`grid ${layout === 'drawer' ? 'gap-0' : 'gap-4'}`}>
        <div className="flex items-center  justify-between font-medium">
          <Text as="dt" className={'text-color/30'}>
            {quantity} {quantity > 1 ? 'Items' : 'item'}
          </Text>
          <Text as="dd" data-test="subtotal">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt" className={''}>
            {t('layout.cart.shipping')}
          </Text>
          <Text
            as="dd"
            className={'text-foreground/30 whitespace-nowrap'}
            data-test="subtotal"
          >
            {t('layout.cart.calculatedAt')}
          </Text>
        </div>

        <div className="flex items-center justify-between font-medium">
          <div className={'flex flex-wrap'}>
            <Text
              as="dt"
              className={'w-full tracking-wider uppercase whitespace-nowrap'}
              size={'copy'}
            >
              {t('layout.cart.total')}
            </Text>
            <Text as="dt" className={'w-full text-foreground/60'}>
              VAT Included
            </Text>
          </div>

          <Text
            as="dd"
            data-test="subtotal"
            className={'text-heading tracking-widest whitespace-nowrap flex'}
          >
            {cost.subtotalAmount?.amount &&
              cost.totalAmount?.amount &&
              cost.subtotalAmount.amount > cost.totalAmount?.amount && (
                <span className={'text-destructive line-through mr-4'}>
                  <Money data={cost?.subtotalAmount} />
                </span>
              )}
            {cost?.totalAmount?.amount ? (
              <Money data={cost?.totalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
      </dl>
      {children}
      <div className={'grow'}></div>
    </section>
  );
}

type OptimisticData = {
  action?: string;
  quantity?: number;
};

function CartLineItem({line}: {line: CartLine}) {
  const optimisticData = useOptimisticData<OptimisticData>(line?.id);

  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li
      key={id}
      className="flex gap-4"
      style={{
        // Hide the line item if the optimistic data action is remove
        // Do not remove the form from the DOM
        display: optimisticData?.action === 'remove' ? 'none' : 'flex',
      }}
    >
      <div className="shrink">
        {merchandise.image && (
          <Image
            width={300}
            height={300}
            data={merchandise.image}
            className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
            alt={merchandise.title}
          />
        )}
      </div>

      <div className="flex justify-between grow">
        <div className="grid gap-2">
          <Heading as="h3" size="copy">
            {merchandise?.product?.handle ? (
              <Link to={`/products/${merchandise.product.handle}`}>
                {merchandise?.product?.title || ''}
              </Link>
            ) : (
              <Text>{merchandise?.product?.title || ''}</Text>
            )}
          </Heading>

          <div className="grid pb-2">
            {(merchandise?.selectedOptions || []).map((option) => (
              <Text color="subtle" key={option.name}>
                {option.name}: {option.value}
              </Text>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-start text-copy">
              <CartLineQuantityAdjust line={line} />
            </div>
            <ItemRemoveButton lineId={id} />
          </div>
        </div>
        <Text>
          <CartLinePrice line={line} as="span" />
        </Text>
      </div>
    </li>
  );
}

function ItemRemoveButton({lineId}: {lineId: CartLine['id']}) {
  const {t} = useTranslation();
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{
        lineIds: [lineId],
      }}
    >
      <button
        className="flex items-center justify-center w-10 h-10 border rounded group hover:bg-destructive "
        type="submit"
      >
        <span className="sr-only">{t('layout.cart.actions.removeItem')}</span>
        <IconRemove
          height={'16'}
          width={'16'}
          viewBox={'0 0 20 20'}
          aria-hidden="true"
          className={'group-hover:stroke-destructive-foreground'}
        />
      </button>
      <OptimisticInput id={lineId} data={{action: 'remove'}} />
    </CartForm>
  );
}

function CartLineQuantityAdjust({line}: {line: CartLine}) {
  const optimisticId = line?.id;
  const optimisticData = useOptimisticData<OptimisticData>(optimisticId);

  if (!line || typeof line?.quantity === 'undefined') return null;

  const optimisticQuantity = optimisticData?.quantity || line.quantity;

  const {id: lineId} = line;
  const prevQuantity = Number(Math.max(0, optimisticQuantity - 1).toFixed(0));
  const nextQuantity = Number((optimisticQuantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {optimisticQuantity}
      </label>
      <div className="flex items-center border rounded">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="w-10 h-10 transition text-foreground/50 hover:text-foreground disabled:text-foreground/10"
            value={prevQuantity}
            disabled={optimisticQuantity <= 1}
          >
            <span>&#8722;</span>
            <OptimisticInput
              id={optimisticId}
              data={{quantity: prevQuantity}}
            />
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center" data-test="item-quantity">
          {optimisticQuantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="w-10 h-10 transition text-foreground/50 hover:text-foreground"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
            <OptimisticInput
              id={optimisticId}
              data={{quantity: nextQuantity}}
            />
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines,
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
  [key: string]: any;
}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

export function CartEmpty({
  hidden = false,
  layout = 'drawer',
  onClose,
}: {
  hidden: boolean;
  layout?: Layouts;
  onClose?: () => void;
}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);
  const {t} = useTranslation();

  const container = {
    drawer: clsx([
      'content-start gap-4 pb-8 transition overflow-y-scroll md:gap-12 px-4 md:px-6 h-screen-no-nav md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  return (
    <div ref={scrollRef} className={container[layout]} hidden={hidden}>
      <section className="grid gap-6">
        <Text format>{t('layout.cart.empty')}</Text>
        <div>
          <Button onClick={onClose}>{t('layout.cart.continueShopping')}</Button>
        </div>
      </section>
      <section className="grid gap-8 pt-16">
        <FeaturedProducts
          count={4}
          heading={t('layout.sections.featuredProducts.shopBestSellers')}
          layout={layout}
          onClose={onClose}
          query={'available_for_sale:true'}
          sortKey="BEST_SELLING"
        />
      </section>
    </div>
  );
}

export function CartLoading() {
  return (
    <div className="flex w-full h-screen-no-nav justify-center items-center">
      {/* @todo better spinner? */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={38}
        height={38}
        viewBox="0 0 38 38"
      >
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stopColor="#fff" stopOpacity={0} offset="0%" />
            <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
            <stop stopColor="#fff" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              id="Oval-2"
              stroke="url(#a)"
              strokeWidth={2}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
            <circle fill="#fff" cx={36} cy={18} r={1}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
