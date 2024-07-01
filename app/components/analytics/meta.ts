import {AnalyticsPixel} from './pixel';
import type {
  CartLineUpdatePayload,
  CartViewPayload,
  CollectionViewPayload,
} from '@shopify/hydrogen';
import {ProductViewPayload} from '@shopify/hydrogen';

export class MetaAnalytics extends AnalyticsPixel {
  // Meta Pixel tracks page views automatically, so no need to implement trackPageViewed
  trackPageViewed(data) {}
  trackProductViewed(data): void {
    const payload = {
      content_ids: data.products.map((product) => product.id),
      content_type: 'product',
      contents: data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: product.quantity,
        ...product.customData,
      })),
      ...data.customData,
    };
    window.fbq('track', 'ViewContent', payload);
  }

  trackCollectionViewed(data: CollectionViewPayload): void {
    const payload = {
      content_ids: [data.collection.id],
      content_type: 'product_group',
      contents: [{id: data.collection.id, handle: data.collection.handle}],
      ...data.customData,
    };
    window.fbq('track', 'ViewContent', payload);
  }

  trackCartViewed(data: CartViewPayload): void {
    const payload = {
      value: data.cart?.cost?.totalAmount?.amount,
      currency: data.cart?.cost?.totalAmount?.currencyCode,
      contents: data.cart?.lines.nodes.map((line) => ({
        id: line.merchandise?.product.id,
        name: line.merchandise.product.title,
        price: line.merchandise.price.amount,
        quantity: line.quantity,
      })),
      content_type: 'product',
      ...data.customData,
    };
    window.fbq('trackCustom', 'ViewCart', payload);
  }

  trackProductAddedToCart(data: CartLineUpdatePayload): void {
    const payload = {
      value: data.currentLine?.cost?.totalAmount.amount,
      currency: data.currentLine?.cost?.totalAmount.currencyCode,
      contents: [
        {
          id: data.currentLine?.merchandise?.product.id,
          name: data.currentLine?.merchandise.product.title,
          price: data.currentLine?.merchandise.price.amount,
          quantity: data.currentLine?.quantity,
        },
      ],
      content_type: 'product',
      ...data.customData,
    };
    window.fbq('track', 'AddToCart', payload);
  }

  trackNewsletterSignup(data: any): void {
    const payload = {
      ...data.customData,
    };
    window.fbq('track', 'Lead', payload);
  }

  trackSidecartViewed(data: any): void {
    const payload = {
      cart_id: data.cartId,
      ...data.customData,
    };
    window.fbq('trackCustom', 'SidecartViewed', payload);
  }
}
