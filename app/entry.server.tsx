import * as Sentry from '@sentry/remix';
import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {GOOGLE_TLDS} from '~/lib/const';

export function handleError(error: unknown, {request}: any) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureRemixServerException(error, 'remix.server', request, true);
  }
}

// Sentry.init({ @TODO investigate why this breaks miniflare build in production
//   dsn: 'https://bed6f36c868092d61e61b57db4abf346@o4507371821727744.ingest.us.sentry.io/4507371823366144',
//   tracesSampleRate: 1,
// });

const MODE = process.env.NODE_ENV ?? 'development';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    connectSrc: [
      MODE === 'development' ? 'ws:' : null,
      MODE === 'development' ? 'testing.nomaintenance.us' : null,
      context.env.SENTRY_DSN ? '*.sentry.io' : null,
      "'self'",
      'https://cdn.shopify.com',
      'blob:',
      '*.klaviyo.com',
      'api.emailjs.com',
      'preview.nomaintenance.us',
      '*.google.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://*.googletagmanager.com',
      'https://*.g.doubleclick.net',
      'https://*.facebook.com',
      'https://s.pinimg.com',
      'https://google.com',
      'https://ct.pinterest.com',
      '*.graphassets.com',
      ...GOOGLE_TLDS,
    ].filter(Boolean),
    imgSrc: [
      "'self'",
      'data:',
      'https://cdn.shopify.com',
      '*.graphassets.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://*.googletagmanager.com',
      'https://*.g.doubleclick.net',
      'https://*.facebook.com',
      'https://google.com',
      ...GOOGLE_TLDS,
    ],
    mediaSrc: [
      'https://us-west-2.graphassets.com',
      'https://cdn.shopify.com',
      "'self'",
    ],
    fontSrc: [
      "'self'",
      'cdn.shopify.com',
      'fonts.gstatic.com',
      'res.cloudinary.com',
    ],
    frameSrc: [
      "'self'",
      '*.googletagmanager.com',
      'https://td.doubleclick.net',
      'https://ct.pinterest.com',
      '*.facebook.com',
      '*.graphassets.com',
    ],
    workerSrc: ["'self'", 'blob:'],
    scriptSrc: [
      MODE === 'development' ? 'testing.nomaintenance.us' : null,
      "'self'",
      '*.klaviyo.com',
      'https://unpkg.com',
      'https://cdn.shopify.com',
      '*.googletagmanager.com',
      'https://connect.facebook.net',
      'https://googleads.g.doubleclick.net',
      'https://s.pinimg.com',
      'https://ct.pinterest.com',
      '*.pinimg.com',
    ].filter(Boolean),
    styleSrc: ["'self'", '*.klaviyo.com', 'fonts.googleapis.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
