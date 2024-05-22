import {
  getCustomerPrivacy,
  unstable_useAnalytics as useAnalytics,
} from '@shopify/hydrogen';
import {useEffect} from 'react';
import {
  trackViewedProduct as klaviyoTrackViewedProduct,
  trackAddedToCart as klaviyoTrackAddedToCart,
} from '~/components/analytics/Klaviyo';
import {metaAddToCart, trackMetaEvent} from '~/components/analytics/Meta';

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
    subscribe('cart_updated', (data) => {
      // const newQuantity = data.cart?.totalQuantity || 0;
      // const oldQuantity = data.prevCart?.totalQuantity || 0;
      // if (newQuantity > oldQuantity) {
      // }
    });

    // Custom events
    // subscribe('newsletter_signup', (data) => {
    //   console.log('CustomAnalytics - Custom sidecart opened:', data);
    // });
    subscribe('custom_sidecart_viewed', (data) => {
      console.log('CustomAnalytics - Custom sidecart opened:', data);
    });
  }, []);

  return null;
}
