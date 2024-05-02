import {useLocation} from '@remix-run/react';
import {useRootLoaderData} from '~/root';

export function useIsHomePath() {
  const {pathname} = useLocation();
  const rootData = useRootLoaderData();
  const selectedLocale = rootData?.i18n;
  if (selectedLocale.isDefault || !selectedLocale.prefix) {
    return pathname === '/';
  } else {
    const strippedPathname = pathname.replace(selectedLocale.prefix.value, '');
    return strippedPathname === '/';
  }
}
