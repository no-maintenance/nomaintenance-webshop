import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {DEFAULT_I18N, getI18n} from '~/i18n/getI18n.server';
import {subfolderLocaleParser} from '~/lib/utils';
import {getLocaleFromRequest} from '~/i18n/getLocaleFromRequest.server';
// import {getLocaleFromRequest} from '~/lib/i18n';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */
export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);
  const {i18n, i18nSfApi} = await getI18n<typeof DEFAULT_I18N>({
    cache,
    defaultI18n: DEFAULT_I18N,
    prefixParser: subfolderLocaleParser,
    request,
    strategy: 'subfolder',
    waitUntil,
  });
  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: {language: 'EN', country: 'US'},
    // i18n: getLocaleFromRequest({request}),
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
  };
}
