export const PAGINATION_SIZE = 12;
export const DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 3;
export const ATTR_LOADING_EAGER = 'eager';
export const ATTR_LOADING_LAZY = 'lazy';
export function getImageLoadingPriority(
  index: number,
  maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT,
) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : undefined;
}

export const HYGRAPH_CACHE_NAME = 'hygraph';
export const KLAVIYO_BASE_URL = 'https://a.klaviyo.com';
export const KLAVIYO_COMPANY_ID = 'RDT3xD';

export const EMAILJS_CONTACT_TEMPLATE_ID = 'template_0jee2h8';
export const EMAILJS_APPOINTMENT_TEMPLATE_ID = 'template_q2yw635';
export const EMAILJS_SERVICE_ID = 'service_q8ej60l';

export const EMAILJS_PUBKEY = 'hi4FCFs4Sq1Wj6URH';

export const SEO_PLACEHOLDER = {
  title: 'No Maintenance',
  titleTemplate: '%s',
  description: 'No Maintenance is a brand based in Los Angeles, California. ',
  handle: '@shopify',
  url: 'https://nomaintenance.us',
  robots: {
    noIndex: false,
    noFollow: false,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'No Maintenance',
    logo: 'https://cdn.shopify.com/s/files/1/0422/9319/9005/files/Frame_8_b1dfc928-2421-43e2-be8f-b34929752f5d.png?v=1694719336',
    sameAs: [
      'https://twitter.com/shopify',
      'https://facebook.com/shopify',
      'https://instagram.com/shopify',
      'https://youtube.com/shopify',
      'https://tiktok.com/@shopify',
    ],
    url: 'https://nomaintenance.us/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nomaintenance.us/search?q={search_term}',
      query: "required name='search_term'",
    },
  },
};
