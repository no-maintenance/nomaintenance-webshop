import {AnalyticsPixel} from './pixel';
import type {
  CartLineUpdatePayload,
  CartViewPayload,
  CollectionViewPayload,
} from '@shopify/hydrogen';

export class KlaviyoAnalytics extends AnalyticsPixel {
  track<T>(action: (data: T) => void, payload: T): void {
    // window.klaviyo
    //   .identify({
    //     email: 'chris6rock@gmail.com',
    //   })
    //   .then(() => {
    //     console.log('Identify has been completed');
    //     action(payload);
    //   });
  }

  // Klaviyo does not track page views automatically, so we implement trackPageViewed
  trackPageViewed(data): void {}

  trackProductViewed(data) {
    const product = data.products[0];
    const item = {
      Name: product.title,
      ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
      ImageURL: product.image,
      Handle: product.handle,
      Brand: product.vendor,
      Price: product.selectedVariant.price.amount,
      Metadata: {
        Brand: product.vendor,
        Price: product.selectedVariant.unitPrice,
        CompareAtPrice: product.selectedVariant.compareAtPrice,
      },
    };
    window.klaviyo.push(['track', 'Viewed Product', item]);
    window.klaviyo.push(['trackViewedItem', item]);
  }

  trackCollectionViewed(data: CollectionViewPayload): void {}

  trackCartViewed(data: CartViewPayload): void {}

  trackProductAddedToCart(data: CartLineUpdatePayload): void {
    const product = data.currentLine?.merchandise?.product;
    const item = {
      Name: product?.title,
      ProductID: product?.id.substring(product?.id.lastIndexOf('/') + 1),
      ImageURL: product?.variantBySelectedOptions?.image?.url,
      Handle: product?.handle,
      Brand: product?.vendor,
      Price: product?.variantBySelectedOptions?.price?.amount,
      ...data.customData,
    };
    window.klaviyo.push(['track', 'Added to Cart', item]);
  }

  trackNewsletterSignup(data: any): void {}

  trackSidecartViewed(data: any): void {}
}
