import {useAnalytics} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';
import ReactPinterest from '~/lib/pixels/pinterest';
import {hash} from '~/lib/utils';

export function PinterestPixel({id}: {id: string}) {
  const {register, subscribe} = useAnalytics();
  const {ready} = register('Pinterest');
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      ReactPinterest.init(id, '', {
        debug: !!process.env.DEBUG_TRACKING,
      });
      loaded.current = true;
      return;
    }

    subscribe('product_viewed', async (data) => {
      const p = data.products[0];
      const ts = new Date().toISOString();

      const eid = await hash(p.id + ts);
      ReactPinterest.track('pagevisit', {
        event_id: `product-viewed--${eid}`,
        line_items: [
          {
            product_name: p.title,
            product_id: p.id,
            product_category: p.productType,
          },
        ],
      });
    });
    subscribe('collection_viewed', (data) => {});
    subscribe('cart_viewed', (data) => {});
    subscribe('product_added_to_cart', async (data) => {
      const id = data.currentLine?.merchandise?.product.id;
      const ts = new Date().toISOString();
      const h = await hash(id + ts);
      ReactPinterest.track('addtocart', {
        event_id: `addtocart--${h}`,
        value: data.currentLine?.cost?.totalAmount?.amount,
        currency: data.currentLine?.cost?.totalAmount?.currencyCode,
        line_items: [
          {
            // product_category: p.productType,
            product_name: data.currentLine?.merchandise?.product.title,
            product_id: data.currentLine?.merchandise?.product.id,
            product_variant_id: data.currentLine?.merchandise?.id,
            product_variant: data.currentLine?.merchandise.title,
            product_price: data.currentLine?.merchandise.price.amount,
            product_quantity: data.currentLine?.quantity,
          },
        ],
      });
    });
    subscribe('custom_newsletter_signup', async (data) => {
      const em = await hash(data.email);
      ReactPinterest.track('lead', {
        lead_type: 'Newsletter',
        event_id: `newsletter-signup--${em}`,
      });
    });

    ready();
  }, [loaded]);
  return null;
}
