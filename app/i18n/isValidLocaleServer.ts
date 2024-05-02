import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {Params} from '@remix-run/react';

export function isValidLocaleServer(context: AppLoadContext, params: Params) {
  const {language, country} = context.storefront.i18n;
  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the locale param must be invalid, send to the 404 page
    return false;
  }
  return true;
}
