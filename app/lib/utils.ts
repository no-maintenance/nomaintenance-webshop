import {BaseI18n, createSubfolderLocaleParser} from '~/i18n';

import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {FulfillmentStatus} from '@shopify/hydrogen/customer-account-api-types';

export const subfolderLocaleParser = createSubfolderLocaleParser({
  parser: ({COUNTRY, language, delimiter}) =>
    `/${language}${delimiter['-']}${COUNTRY}`,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAfterDate = (time?: string) => {
  if (!time) return false;
  return +new Date(time) - +new Date() <= 0;
};

export function isNewArrival(date: string, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price: MoneyV2, compareAtPrice: MoneyV2) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}

export function parseAsCurrency(value: number, locale: BaseI18n) {
  return new Intl.NumberFormat(locale.language + '-' + locale.country, {
    style: 'currency',
    currency: locale.currency,
  }).format(value);
}

export function statusMessage(status: FulfillmentStatus) {
  const translations: Record<FulfillmentStatus, string> = {
    SUCCESS: 'Delivered',
    PENDING: 'Pending',
    OPEN: 'Open',
    FAILURE: 'Failure',
    ERROR: 'Error',
    CANCELLED: 'Cancelled',
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

/**
 * Validates that a url is local
 * @param url
 * @returns `true` if local `false`if external domain
 */
export function isLocalPath(url: string) {
  try {
    // We don't want to redirect cross domain,
    // doing so could create fishing vulnerability
    // If `new URL()` succeeds, it's a fully qualified
    // url which is cross domain. If it fails, it's just
    // a path, which will be the current domain.
    new URL(url);
  } catch (e) {
    return true;
  }

  return false;
}

export const parseNumberFromShopGid = (gid?: string) => {
  if (!gid) return;
  const id = gid.split('/').pop();
  return id ?? null;
};

export function isEqual(x: any, y: any): boolean {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => isEqual(x[key], y[key]))
    : x === y;
}

/**
 * Partytown will call this function to resolve any URLs
 * Certain libraries like googletagmanager require a reverse proxy to handle CORS
 * @param url - the URL to resolve
 * @param location - the current location
 * @param type - the type of request (script, image, etc)
 * @returns URL or proxy URL
 * @see https://partytown.builder.io/proxying-requests
 */
export function maybeProxyRequest(url: URL, location: Location, type: string) {
  if (type !== 'script') {
    return url;
  }

  // If the url is already reverse proxied, don't proxy it again
  if (url.href.includes('/reverse-proxy')) {
    return url;
  }

  // Otherwise, proxy the url
  const proxyUrl = new URL(`${location.origin}/reverse-proxy`);
  proxyUrl.searchParams.append('apiUrl', url.href);
  return proxyUrl;
}

export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [] as any[];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = cloneDeep(obj[i]);
    }
    return arrCopy as T;
  }

  // Handle Object
  const objCopy = {} as {[key: string]: any};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = cloneDeep((obj as {[key: string]: any})[key]);
    }
  }
  return objCopy as T;
}
