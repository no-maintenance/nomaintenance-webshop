import {useLocation} from '@remix-run/react';
import {useEffect, useRef} from 'react';

export function useOnRouteChange(onChange: () => void) {
  const location = useLocation();
  const key = useRef(location.pathname);
  useEffect(() => {
    if (key.current !== location.pathname) {
      onChange();
      key.current = location.pathname;
    }
  }, [location]);
}
