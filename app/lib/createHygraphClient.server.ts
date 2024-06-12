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
}: {
  env: Env;
  cache: Cache;
  waitUntil: ExecutionContext['waitUntil'];
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
  // const clientTimingWrapper: SdkFunctionWrapper = async <T>(
  //   action: () => Promise<T>,
  //   operationName: string,
  //   operationType?: string,
  //   variables?: any,
  // ): Promise<T> => {
  //   const startTime = new Date();
  //   console.log(startTime);
  //   return withCache(
  //     [
  //       'hygraph',
  //       operationName,
  //       operationType,
  //       JSON.stringify(variables),
  //       lastModified,
  //     ],
  //     CacheLong(),
  //     async ({addDebugData}) => {
  //       const response = await action();
  //       addDebugData({displayName: operationName});
  //       return response;
  //     },
  //   );
  //   // const result = await action();
  //   // console.log('request duration (ms)', new Date() - startTime);
  //   // return result.data;
  // };
  const withCache = createWithCache({cache, waitUntil});
  const query = (
    cache: AllCacheOptions = CacheLong(),
    client: GraphQLClient = graphQLClient,
  ) => {
    return getSdk(
      client,
      async (action, operationName, operationType, variables) => {
        return withCache(
          ['hygraph', operationName, operationType, JSON.stringify(variables)],
          env.HYGRAPH_ENV === 'DRAFT' ? CacheNone() : cache,
          async () => {
            return await action();
          },
        );
      },
    );
  };
  return {query};
}
