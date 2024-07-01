import {
  cartBuyerIdentityUpdateDefault,
  Script,
  useAnalytics,
} from '@shopify/hydrogen';
import {useEffect} from 'react';
import {GoogleAnalytics} from './google';
import {Partytown} from '@builder.io/partytown/react';
import {maybeProxyRequest} from '~/lib/utils';
import {MetaAnalytics} from './meta';
import {KlaviyoAnalytics} from './klaviyo';

export function CustomAnalytics() {
  const {subscribe, cart} = useAnalytics();
  const ga = new GoogleAnalytics();
  const fb = new MetaAnalytics();
  const klaviyo = new KlaviyoAnalytics();

  useEffect(() => {
    // Standard events
    subscribe('page_viewed', (data) => {
      console.log('CustomAnalytics - Page viewed:', data);
    });

    subscribe('product_viewed', (data) => {
      console.log('CustomAnalytics - Product viewed:', data);
      ga.trackProductViewed(data);
      fb.trackProductViewed(data);
      klaviyo.track(klaviyo.trackProductViewed, data);
      // klaviyo.trackProductViewed(data);
    });

    subscribe('collection_viewed', (data) => {
      console.log('CustomAnalytics - Collection viewed:', data);
      ga.trackCollectionViewed(data);
      fb.trackCollectionViewed(data);
      // klaviyo.trackCollectionViewed(data);
    });

    subscribe('cart_viewed', (data) => {
      console.log('CustomAnalytics - Cart viewed:', data);
      ga.trackCartViewed(data);
      fb.trackCartViewed(data);
      // klaviyo.trackCartViewed(data);
    });

    subscribe('product_added_to_cart', (data) => {
      console.log('CustomAnalytics - Product Added to Cart:', data);
      ga.trackProductAddedToCart(data);
      fb.trackProductAddedToCart(data);
      klaviyo.track(klaviyo.trackProductAddedToCart, data);
    });

    // Custom events
    subscribe('custom_newsletter_signup', (data) => {
      console.log('CustomAnalytics - Newsletter signup:', data);
      ga.trackNewsletterSignup(data);
      fb.trackNewsletterSignup(data);
    });

    subscribe('custom_sidecart_viewed', (data) => {
      console.log('CustomAnalytics - Sidecart viewed:', data);
      // ga.trackSidecartViewed(data);
      // fb.trackSidecartViewed(data);
      // klaviyo.trackSidecartViewed(data);
    });
  }, []);

  return null;
}

export function Pixels({
  tokens,
  nonce,
}: {
  nonce?: string;
  tokens?: {
    gtm?: string;
    klaviyo?: string;
    meta?: string;
    ga4?: string;
  };
}) {
  const DEBUG_TRACKING = true;
  if (process.env.NODE_ENV === 'development' && !DEBUG_TRACKING) return null;
  return (
    <>
      <Partytown
        debug={DEBUG_TRACKING}
        forward={[
          'dataLayer.push',
          'gtag',
          'fbq',
          // 'klaviyo.push',
          // 'klaviyo.identify',
          // 'klaviyo',
        ]}
        nonce={nonce}
        resolveUrl={maybeProxyRequest}
      />
      {/*      {tokens?.gtm && (*/}
      {/*        <>*/}
      {/*          <noscript>*/}
      {/*            <iframe*/}
      {/*              title={'gtm'}*/}
      {/*              src={`https://www.googletagmanager.com/ns.html?id=${tokens.gtm}`}*/}
      {/*              height="0"*/}
      {/*              width="0"*/}
      {/*              style={{display: 'none', visibility: 'hidden'}}*/}
      {/*            ></iframe>*/}
      {/*          </noscript>*/}
      {/*          <script*/}
      {/*            nonce={nonce}*/}
      {/*            type="text/javascript"*/}
      {/*            dangerouslySetInnerHTML={{*/}
      {/*              __html: `*/}
      {/*                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':*/}
      {/*new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
      {/*j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
      {/*'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
      {/*})(window,document,'script','dataLayer','${tokens.gtm}');*/}
      {/*            `,*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        </>*/}
      {/*      )}*/}
      {tokens?.ga4 && (
        <>
          <Script
            async
            type="text/partytown"
            src={`https://www.googletagmanager.com/gtag/js?id=${tokens.ga4}`}
          ></Script>

          <Script
            nonce={nonce}
            type={'text/partytown'}
            dangerouslySetInnerHTML={{
              __html: `
                      window.dataLayer = window.dataLayer || [];
                      window.gtag = function () {
                              dataLayer.push(arguments);
                          };
                        window.gtag('js', new Date());

                        window.gtag('config', '${tokens.ga4}', { 'debug_mode':${DEBUG_TRACKING}});
                      `,
            }}
          ></Script>
        </>
      )}
      {tokens?.klaviyo && (
        <>
          {/*<Script*/}
          {/*  type="text/javascript"*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,*/}
          {/*  }}*/}
          {/*></Script>*/}
        </>
      )}
      {tokens?.meta && (
        <>
          <Script
            type={'text/partytown'}
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                    !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  window.fbq('init', '${tokens.meta}');
                  window.fbq('track', 'PageView');
                    `,
            }}
          ></Script>
        </>
      )}
    </>
  );
}
