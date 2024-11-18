import {useEffect} from 'react';
import {useAnalytics} from '@shopify/hydrogen';
const PIXEL_NAME = 'TestThirdPartyAnalyticsIntegration';
function log(...args: any) {
  if (process.env.DEBUG_TRACKING) {
    console.log(PIXEL_NAME, ...args);
  }
}
export function ThirdPartyAnalyticsIntegration() {
  const {subscribe, register} = useAnalytics();
  // Register this analytics integration - this will prevent any analytics events
  // from being sent until this integration is ready
  const {ready} = register(PIXEL_NAME);
  useEffect(() => {
    // Standard events
    subscribe('page_viewed', (data) => {
      console.log('Page viewed:', data);
    });
    subscribe('product_viewed', (data) => {
      log('Product viewed:', data);
    });
    subscribe('collection_viewed', (data) => {
      log('Collection viewed:', data);
    });
    subscribe('cart_viewed', (data) => {
      log(' Cart viewed:', data);
    });
    subscribe('cart_updated', (data) => {
      log('Cart updated:', data);
    });
    subscribe('product_added_to_cart', (data) => {
      log('Cart add to cart:', data);
    });
    // Custom events
    subscribe('custom_checkbox_toggled', (data) => {
      log('Custom checkbox toggled:', data);
    });

    // Mark this analytics integration as ready as soon as it's done setting up
    ready();
  }, []);

  return null;
}
