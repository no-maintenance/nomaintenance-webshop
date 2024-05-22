import {CartLineUpdatePayload} from '@shopify/hydrogen';
import {getAddToCartValue} from '~/components/analytics/CustomAnalytics';

/**
 * A wrapper for meta pixel events
 *
 * All events are based on spec outlined in Meta Pixel's Standard Events
 * @see https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/
 * @param action
 * @param data
 */
export function trackMetaEvent<T>(action: (data: T) => void, data: T) {
  const fbq = window.fbq;
  if (!fbq) return; // @TODO add error handling
  action(data);
}

/**
 * When a product is added to the shopping cart.
 *
 * A person clicks on an add to cart button.
 * @param data
 */
export function metaAddToCart(data: CartLineUpdatePayload) {
  const m = data?.currentLine?.merchandise;
  const p = m?.product;
  window.fbq('track', 'AddToCart', {
    currency: m?.price?.currencyCode,
    value: getAddToCartValue(parseInt(m?.price?.amount ?? '0')),
    content_ids: [m?.id],
    content_name: p?.title,
    content_type: 'product',
    content: [{id: m?.id, quantity: data?.currentLine}],
  });
}

/**
 * When a registration form is completed. The `CompleteRegistration` event
 *
 * A person submits a completed subscription or signup form.
 *
 */
export function metaNewsletterSignup() {
  window.fbq('track', 'CompleteRegistration');
}

/**
 * A visit to a web page you care about (for example, a product page or landing page).
 *
 * `ViewContent` tells you if someone visits a web page's URL, but not what they see or do on that page.
 * A person lands on a product details page.
 */
// export function metaViewedItem(data: ProductViewPayload) {
//   window.fbq('track', 'ViewContent',
//     {
//       currency: m?.price?.currencyCode,
//       value: m?.price?.amount,
//       content_ids: [m?.id],
//       content_name: p?.title,
//       content_type: 'product',
//       content: [{id: m?.id, quantity: data?.currentLine}],
//     })
// }

/**
 * When a search is made.
 *
 * A person searches for a product on your website.
 */
export function metaSearch() {}

/**
 * When a person books an appointment to visit one of your locations. The `Schedule` event.
 *
 * A person selects a date and time for a tennis lesson.
 */
export function metaBookAppointment() {}

export function metaLead() {}
