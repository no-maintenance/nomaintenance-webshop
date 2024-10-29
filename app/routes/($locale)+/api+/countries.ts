import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {json} from '@shopify/remix-oxygen';
import {CACHE_LONG} from '~/lib/cache';
import {getOxygenAssetsUrl} from '~/i18n/getOxygenAssetsUrl.server';
import type {BaseI18n} from '~/i18n';

export async function loader({request}: LoaderFunctionArgs) {
  const oxygenAssetsUrl = getOxygenAssetsUrl(request);
  const jsonUrl = `${oxygenAssetsUrl}/locales/all.json`;
  const response = await fetch(jsonUrl);
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to fetch Countries, response not ok, status: ${response.status}`,
    );
    return undefined;
  }
  const countries = (await response.json()) as BaseI18n['country'][];

  return json(countries, {
    headers: {
      'cache-control': CACHE_LONG,
    },
  });
}

// no-op
export default function CountriesApiRoute() {
  return null;
}
