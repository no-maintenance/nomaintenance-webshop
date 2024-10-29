import {useAnalytics, useLoadScript} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';
import ReactPixel from '~/lib/pixels/fb';
import {getAddToCartValue} from '~/components/analytics/CustomAnalytics';
export function FacebookPixel({id}: {id: string}) {
  const {register, subscribe, cart} = useAnalytics();
  const {ready} = register('Facebook');
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!window) return;
    if (!loaded) {
      ReactPixel.init(
        id,
        {},
        {
          autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
          debug: !!process.env.DEBUG_TRACKING, // enable logs
        },
      );
      setLoaded(true);
      return;
    }
    subscribe('page_viewed', (data) => {
      ReactPixel.pageView();
    });
    subscribe('product_viewed', (data) => {
      const p = data.products[0];
      const payload = {
        content_ids: [p.id],
        content_name: p.title,
        content_type: 'product',
      };
      ReactPixel.track('ViewContent', payload);
    });
    subscribe('product_added_to_cart', (data) => {
      const m = data?.currentLine?.merchandise;
      const p = m?.product;
      ReactPixel.track('AddToCart', {
        currency: m?.price?.currencyCode,
        value: getAddToCartValue(parseInt(m?.price?.amount ?? '0')),
        content_ids: [m?.id],
        content_name: p?.title,
        content_type: 'product',
        content: [{id: m?.id, quantity: data?.currentLine}],
      });
    });
    subscribe('collection_viewed', (data) => {
      const payload = {
        content_ids: [data.collection.id],
        content_type: 'product_group',
        contents: [{id: data.collection.id, handle: data.collection.handle}],
        ...data.customData,
      };
      ReactPixel.track('ViewContent', payload);
    });
    subscribe('cart_viewed', (data) => {
      // const payload = {
      //   value: data.cart?.cost?.totalAmount?.amount,
      //   currency: data.cart?.cost?.totalAmount?.currencyCode,
      //   contents: data.cart?.lines.nodes.map((line) => ({
      //     id: line.merchandise?.product.id,
      //     name: line.merchandise.product.title,
      //     price: line.merchandise.price.amount,
      //     quantity: line.quantity,
      //   })),
      //   content_type: 'product',
      //   ...data.customData,
      // };
      // window.fbq('trackCustom', 'ViewCart', payload);
    });
    subscribe('custom_newsletter_signup', (data) => {
      ReactPixel.track('Lead', {});
    });

    ready();
  }, [loaded]);
  return null;
}
