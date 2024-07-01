import {AnalyticsPixel} from './pixel';
import type {
  CartLineUpdatePayload,
  CartViewPayload,
  CollectionViewPayload,
  PageViewPayload,
} from '@shopify/hydrogen';

export class GoogleAnalytics extends AnalyticsPixel {
  trackPageViewed(data: PageViewPayload): void {}

  trackProductViewed(data): void {
    const payload = {
      items: data.products.map((product) => ({
        item_id: product.id,
        item_name: product.title,
        price: product.price,
        item_variant: product.variantTitle,
        item_brand: product.vendor,
        quantity: product.quantity,
        ...product.customData,
      })),
      ...data.customData,
    };
    window.gtag('event', 'view_item', payload);
  }

  trackCollectionViewed(data: CollectionViewPayload): void {
    const payload = {
      item_list_id: data.collection.id,
      item_list_name: data.collection.handle,
      ...data.customData,
    };
    window.gtag('event', 'view_item_list', payload);
  }

  trackCartViewed(data: CartViewPayload): void {
    const payload = {
      value: data.cart?.cost?.totalAmount?.amount,
      currency: data.cart?.cost?.totalAmount?.currencyCode,
      items: data.cart?.lines.nodes.map((line) => ({
        item_id: line.merchandise?.product.id,
        item_name: line.merchandise?.product.title,
        price: line.merchandise.price.amount,
        quantity: line.quantity,
        item_variant: line.merchandise.title,
      })),
      ...data.customData,
    };
    window.gtag('event', 'view_cart', payload);
  }

  trackProductAddedToCart(data: CartLineUpdatePayload): void {
    const payload = {
      value: data.currentLine?.cost?.totalAmount?.amount,
      currency: data.currentLine?.cost?.totalAmount?.currencyCode,
      items: [
        {
          item_id: data.currentLine?.merchandise?.product.id,
          item_name: data.currentLine?.merchandise?.product.title,
          price: data.currentLine?.merchandise.price.amount,
          quantity: data.currentLine?.quantity,
          item_variant: data.currentLine?.merchandise.title,
        },
      ],
      ...data.customData,
    };
    window.gtag('event', 'add_to_cart', payload);
  }

  trackNewsletterSignup(data: any): void {
    const payload = {
      method: data.method,
      ...data.customData,
    };
    window.gtag('event', 'sign_up', payload);
  }

  trackSidecartViewed(data: any): void {
    const payload = {
      cart_id: data.cartId,
      ...data.customData,
    };
    window.gtag('event', 'sidecart_view', payload);
  }
}
