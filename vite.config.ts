import {sentryVitePlugin} from '@sentry/vite-plugin';
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import {flatRoutes} from 'remix-flat-routes';
// import {visualizer} from 'rollup-plugin-visualizer';

const MODE = process.env.NODE_ENV;
export default defineConfig({
  build: {
    cssMinify: MODE === 'production',
    rollupOptions: {
      external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
    },

    sourcemap: true,
  },
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ['**/*'],
      serverModuleFormat: 'esm',
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
            // This is for server-side utilities you want to colocate
            // next to your routes without making an additional
            // directory. If you need a route that includes "server" or
            // "client" in the filename, use the escape brackets like:
            // my-route.[server].tsx
            '**/*.server.*',
            '**/*.client.*',
          ],
        });
      },
      buildDirectory: 'dist',
    }),
    // visualizer({
    //   emitFile: true,
    //   // template: 'network',
    //   // template: 'raw-data',
    //   // template: 'list',
    //   // template: 'flamegraph',
    //   // template: 'sunburst',
    //   brotliSize: true,
    //   gzipSize: true,
    // }),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'no-maintenance',
      project: 'javascript-remix',
    }),
  ],
  ssr: {
    optimizeDeps: {
      include: ['cross-fetch', '@sentry/react', 'react-use', 'escape-html'],
    },
  },
});
