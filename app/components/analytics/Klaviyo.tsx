import {CartUpdatePayload, ProductViewPayload} from '@shopify/hydrogen';

export function trackViewedProduct(products: ProductViewPayload) {
  console.log('products', products);
  const product = products[0];
  console.log('trackViewedProduct', product);
  const klaviyo = window.klaviyo || [];
  if (!product) return;
  const item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.selectedVariant.image.url,
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedVariant.price.amount,
    Metadata: {
      Brand: product.vendor,
      Price: product.selectedVariant.unitPrice,
      CompareAtPrice: product.selectedVariant.compareAtPrice,
    },
  };
  klaviyo.push(['track', 'Hydrogen Viewed Product', item]);
  klaviyo.push(['trackViewedItem', item]);
}

export function trackAddedToCart(data: CartUpdatePayload) {
  const klaviyo = window.klaviyo || [];
  const item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.selectedVariant.image.url,
    Handle: product.handle,
    Brand: product.vendor,
    Price: product.selectedVariant.price.amount,
  };
  klaviyo.push(['track', 'Hydrogen Added To Cart', item]);
}
