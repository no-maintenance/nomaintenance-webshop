import {Script, useAnalytics} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';
import {ClientOnly} from '~/lib/client-only';

export function PinterestTag({id, nonce}: {id: string; nonce: string}) {
  const {subscribe, register, cart} = useAnalytics();
  const [loaded, setLoaded] = useState(false);

  // unique string identifier
  const {ready} = register('Pinterest');

  useEffect(() => {
    // Make sure the 3p script is loaded
    if (!loaded) return;
    console.log('read');
    // Subscribe to analytics events
    subscribe('page_viewed', (data) => {
      // report to 3p analytics
      console.log('CustomAnalytics - Page viewed:', data);
    });

    // Register the MyAnalytics component as ready
    ready();
  }, []);

  return (
    <>
      <Script
        onLoad={() => setLoaded(true)}
        type={'text/javascript'}
        dangerouslySetInnerHTML={{
          __html: `
                    !function(e){if(!window.pintrk){window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                pintrk('load', '${id}');
                pintrk('setconsent', 'true');
                pintrk('page');
                    `,
        }}
      ></Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{display: 'none'}}
          alt=""
          src={`https://ct.pinterest.com/v3/?tid=${id}&event=init&noscript=1`}
        />
      </noscript>
    </>
  );
}

function loadPixel() {
  const e = 'https://s.pinimg.com/ct/core.js';
  if (!window.pintrk) {
    window.pintrk = function () {
      window.pintrk.queue.push(Array.prototype.slice.call(arguments));
    };
    const n = window.pintrk;
    (n.queue = []), (n.version = '3.0');
    const t = document.createElement('script');
    (t.async = !0), (t.src = e);
    const r = document.getElementsByTagName('script')[0];
    r.parentNode.insertBefore(t, r);
  }
}
