import type {Key} from 'react';
import {useCallback, useEffect} from 'react';

export function useOnKeyPress(key: Key, cb: () => void, hasMetaKey = false) {
  const keyFn = useCallback((event: KeyboardEvent) => {
    if (event.key === key && (!hasMetaKey || event.metaKey || event.ctrlKey)) {
      //Do whatever when esc is pressed
      cb();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyFn, false);

    return () => {
      document.removeEventListener('keydown', keyFn, false);
    };
  }, [keyFn]);
}
