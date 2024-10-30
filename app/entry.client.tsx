import * as Sentry from '@sentry/remix';
import {RemixBrowser, useLocation, useMatches} from '@remix-run/react';
import {startTransition, StrictMode, useEffect} from 'react';
import {hydrateRoot} from 'react-dom/client';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 0.5,
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
      // <StrictMode>
      <RemixBrowser />,
      // </StrictMode>,
    );
  });
}
