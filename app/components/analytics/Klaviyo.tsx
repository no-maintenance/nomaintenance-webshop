import {CartLineUpdatePayload, ProductViewPayload} from '@shopify/hydrogen';

export function trackViewedProduct(data: ProductViewPayload) {
  if (!data?.products?.length) return;
  const product = data.products[0];
  const klaviyo = window.klaviyo || [];
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
  klaviyo.push(['track', 'Viewed Product', item]);
  klaviyo.push(['trackViewedItem', item]);
}

export function trackAddedToCart(data: CartLineUpdatePayload) {
  const m = data?.currentLine?.merchandise;
  const p = m?.product;
  const klaviyo = window.klaviyo || [];
  const item = {
    Name: p?.title,
    ProductID: p?.id.substring(p?.id.lastIndexOf('/') + 1),
    ImageURL: m?.image?.url,
    Handle: p?.handle,
    Brand: p?.vendor,
    Price: m?.price?.amount,
  };
  klaviyo.push(['track', 'Added To Cart', item]);
}
