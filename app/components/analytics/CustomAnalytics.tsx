import {unstable_useAnalytics as useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';
import {
  trackAddedToCart as klaviyoTrackAddedToCart,
  trackViewedProduct as klaviyoTrackViewedProduct,
} from '~/components/analytics/Klaviyo';

export function CustomAnalytics() {
  const {subscribe} = useAnalytics();

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
    subscribe('cart_updated', (data) => {
      console.log('CustomAnalytics - Cart updated:', data);
      const newQuantity = data.cart?.totalQuantity;
      const oldQuantity = data.prevCart?.totalQuantity || 0;
      if (newQuantity > oldQuantity) {
        klaviyoTrackAddedToCart(data);
      }
    });

    // Custom events
    subscribe('custom_sidecart_viewed', (data) => {
      console.log('CustomAnalytics - Custom sidecart opened:', data);
    });
  }, []);

  return null;
}
