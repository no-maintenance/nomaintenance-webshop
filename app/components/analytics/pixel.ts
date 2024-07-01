import type {
  CartLineUpdatePayload,
  CartViewPayload,
  CollectionViewPayload,
  PageViewPayload,
  ProductViewPayload,
} from '@shopify/hydrogen';

export abstract class AnalyticsPixel {
  abstract trackPageViewed(data: PageViewPayload): void;

  abstract trackProductViewed(data: ProductViewPayload): void;

  abstract trackCollectionViewed(data: CollectionViewPayload): void;

  abstract trackCartViewed(data: CartViewPayload): void;

  abstract trackProductAddedToCart(data: CartLineUpdatePayload): void;

  abstract trackNewsletterSignup(data: any): void;

  abstract trackSidecartViewed(data: any): void;
}
