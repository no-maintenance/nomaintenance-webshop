import {getCustomerPrivacy, useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';
import {
  trackViewedProduct as klaviyoTrackViewedProduct,
  trackAddedToCart as klaviyoTrackAddedToCart,
} from '~/components/analytics/Klaviyo';
import {
  metaAddToCart,
  metaNewsletterSignup,
  trackMetaEvent,
} from '~/components/analytics/Meta';

export function CustomAnalytics() {
  const {subscribe, canTrack} = useAnalytics();
  useEffect(() => {
    // Standard events
    subscribe('page_viewed', (data) => {
      console.log('CustomAnalytics - Page viewed:', data);
    });
    subscribe('product_viewed', (data) => {
      console.log('CustomAnalytics - Product viewed:', data);
      klaviyoTrackViewedProduct(data);
    });
    subscribe('collection_viewed', (data) => {
      console.log('CustomAnalytics - Collection viewed:', data);
    });
    subscribe('cart_viewed', (data) => {
      console.log('CustomAnalytics - Cart viewed:', data);
    });
    subscribe('product_added_to_cart', (data) => {
      console.log('CustomAnalytics - Product Added to Cart', data);
      klaviyoTrackAddedToCart(data);
      trackMetaEvent(metaAddToCart, data);
    });

    // Custom events
    subscribe('custom_newsletter_signup', (data) => {
      console.log('CustomAnalytics - Custom sidecart opened:', data);
      // trackMetaEvent(metaNewsletterSignup)
    });
    subscribe('custom_sidecart_viewed', (data) => {
      console.log('CustomAnalytics - Custom sidecart opened:', data);
    });
  }, []);

  return null;
}

const CONV_ADDED_TO_CART = 0.29;
const AOV = 235;

export function getAddToCartValue(v: number) {
  return CONV_ADDED_TO_CART * v;
}
