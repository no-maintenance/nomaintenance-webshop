import * as Sentry from '@sentry/remix';
import {RemixBrowser, useLocation, useMatches} from '@remix-run/react';
import {startTransition, StrictMode, useEffect} from 'react';
import {hydrateRoot} from 'react-dom/client';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://bed6f36c868092d61e61b57db4abf346@o4507371821727744.ingest.us.sentry.io/4507371823366144',
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
      Sentry.browserTracingIntegration({
        useEffect,
        useLocation,
        useMatches,
      }),
      Sentry.replayIntegration(),
    ],
  });
}

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}
