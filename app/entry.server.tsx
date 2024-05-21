import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
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
    ].filter(Boolean),
    imgSrc: [
      "'self'",
      'data:',
      'https://cdn.shopify.com',
      'https://us-west-2.graphassets.com',
    ],
    mediaSrc: [
      'https://us-west-2.graphassets.com',
      'https://cdn.shopify.com',
      "'self'",
    ],
    fontSrc: ["'self'"],
    frameSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      '*.klaviyo.com',
      'https://unpkg.com',
      'https://cdn.shopify.com',
      MODE === 'development' ? 'testing.nomaintenance.us' : null,
      'googletagmanager.com',
    ].filter(Boolean),
    styleSrc: ["'self'", '*.klaviyo.com'],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
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
