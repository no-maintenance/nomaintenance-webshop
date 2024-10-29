import type {BaseI18n} from '~/i18n';
import {createSubfolderLocaleParser} from '~/i18n';

import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import type {FulfillmentStatus} from '@shopify/hydrogen/customer-account-api-types';

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

export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export function isNewArrival(date: string, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price: MoneyV2, compareAtPrice: MoneyV2) {
  if (
    compareAtPrice?.amount &&
    price?.amount &&
    parseFloat(compareAtPrice?.amount) > parseFloat(price?.amount)
  ) {
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

export function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}
