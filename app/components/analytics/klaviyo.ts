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
    const curr = data.currentLine?.merchandise?.product;
    const newline = {
      $value: parseInt(data.currentLine?.cost.amountPerQuantity.amount ?? ''),
      AddedItemProductName: curr?.title,
      AddedItemProductID: curr?.id.substring(curr?.id.lastIndexOf('/') + 1),
      AddedItemImageURL: data.currentLine?.merchandise?.image?.url,
      AddedItemURL: `https://nomaintenance.us/products/${curr?.handle ?? ''}`,
      Handle: curr?.handle,
      Brand: curr?.vendor,
      AddedItemQuantity: 1,
      AddedItemPrice: parseInt(
        data.currentLine?.cost.amountPerQuantity.amount ?? '0',
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
    console.log('payload', payload);
    window.klaviyo.push(['track', 'Added to Cart', payload]);
  }

  trackNewsletterSignup(data: any): void {}

  trackSidecartViewed(data: any): void {}
}
