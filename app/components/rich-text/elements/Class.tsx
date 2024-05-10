import React from 'react';
import {ClassRendererProps} from '../types';
import {Button, buttonVariants} from '~/components/ui/button';

export function Class({className, children}: ClassRendererProps) {
  if (className?.indexOf('button') !== -1) {
    const c = className?.split(' ');
    const variant = c?.reduce((prev, curr) => {
      const s = curr?.split('-');
      if (
        s &&
        s[1] &&
        s[0].indexOf('button') === -1 &&
        s[1] === buttonVariants.variant
      ) {
        return;
      } else {
        return prev;
      }
    });
    return <Button className={className}>{children}</Button>;
  }
  return <div className={className}>{children}</div>;
}
