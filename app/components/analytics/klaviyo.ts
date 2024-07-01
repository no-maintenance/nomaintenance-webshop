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
      Price: product.price,
      Metadata: {
        Brand: product.vendor,
        Price: product.price,
        CompareAtPrice: product.compareAtPrice,
      },
    };
    window.klaviyo.push(['track', 'Viewed Product', item]);
    window.klaviyo.push(['trackViewedItem', item]);
  }

  trackCollectionViewed(data: CollectionViewPayload): void {}

  trackCartViewed(data: CartViewPayload): void {}

  trackProductAddedToCart(data: CartLineUpdatePayload): void {
    const product = data.currentLine?.merchandise?.product;
    const newline = {
      $value: parseInt(product?.variantBySelectedOptions?.price?.amount ?? '0'),
      AddedItemProductName: product?.title,
      AddedItemProductID: product?.id.substring(
        product?.id.lastIndexOf('/') + 1,
      ),
      AddedItemImageURL: product?.variantBySelectedOptions?.image?.url,
      AddedItemURL: `https://nomaintenance.us/products/${
        product?.handle ?? ''
      }`,
      Handle: product?.handle,
      Brand: product?.vendor,
      AddedItemQuantity: 1,
      AddedItemPrice: parseInt(
        product?.variantBySelectedOptions?.price?.amount ?? '0',
      ),
      CheckoutURL: data?.cart?.checkoutUrl,
      ...data.customData,
    };
    const payload = {
      ...newline,
      Items: data.cart?.lines.nodes.map((i) => ({
        ProductID: i.id,
        ProductName: i?.merchandise?.product?.title,
        Quantity: i.quantity,
        ItemPrice: parseInt(i.cost.amountPerQuantity.amount),
        RowTotal: parseInt(i.cost.totalAmount.amount),
        ProductURL: `https://nomaintenance.us/products/${i.merchandise.product.handle}`,
        ImageURL: i.merchandise.image?.url,
      })),
    };
    window.klaviyo.push(['track', 'Added to Cart', payload]);
  }

  trackNewsletterSignup(data: any): void {}

  trackSidecartViewed(data: any): void {}
}
