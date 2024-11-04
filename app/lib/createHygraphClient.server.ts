import {
  CacheLong,
  CacheNone,
  createWithCache,
  type WithCache,
} from '@shopify/hydrogen';
import {GraphQLClient} from 'graphql-request';

import type {SdkFunctionWrapper} from '~/__generated__/hygraph.generated';
import {getSdk} from '~/__generated__/hygraph.generated';

/**
 *  Time, in seconds, that we deliver stale data while we revalidate the cache in the background.
 *
 */
const STALE_WHILE_REVALIDATE_S = '30';
type AllCacheOptions = Parameters<WithCache>[1];

export function createHygraphClient({
  env,
  cache,
  waitUntil,
  request,
}: {
  env: Env;
  cache: Cache;
  waitUntil: ExecutionContext['waitUntil'];
  request: Request;
}) {
  const token =
    env.HYGRAPH_ENV === 'DRAFT'
      ? env.HYGRAPH_DEV_TOKEN
      : env.HYGRAPH_PROD_TOKEN;
  const graphQLClient = new GraphQLClient(env.HYGRAPH_URL, {
    fetch,
    headers: {
      authorization: `Bearer ${token}`,
      'hyg-stale-while-revalidate': '30',
    },
  });

  const withCache = createWithCache({cache, waitUntil, request});
  const query = (
    cache: AllCacheOptions = CacheLong(),
    client: GraphQLClient = graphQLClient,
  ) => {
    return getSdk(
      client,
      async (action, operationName, operationType, variables) => {
        return withCache.run(
          {
            cacheKey: [
              'hygraph',
              'v2',
              operationName,
              operationType,
              JSON.stringify(variables),
            ],
            cacheStrategy: env.HYGRAPH_ENV === 'DRAFT' ? CacheNone() : cache,
            shouldCacheResult: (result) => !result?.errors,
          },
          async () => {
            return await action();
          },
        );
      },
    );
  };
  return {query};
}
