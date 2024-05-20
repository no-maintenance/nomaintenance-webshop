import React from 'react';
import type {ClassRendererProps} from '../types';
import {Button} from '~/components/ui/button';

export function Class({className, children}: ClassRendererProps) {
  if (!className) return <>{children}</>;
  const [isButton, buttonVariant, otherClasses] =
    extractButtonVariant(className);
  if (isButton) {
    console.log([isButton, buttonVariant, otherClasses]);
    return (
      <Button variant={buttonVariant} className={otherClasses}>
        {children}
      </Button>
    );
  }
  return <div className={className}>{children}</div>;
}

function isButtonVariant(
  variant: string,
): variant is 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' {
  return ['destructive', 'outline', 'secondary', 'ghost', 'link'].includes(
    variant,
  );
}

function extractButtonVariant(
  classNames: string,
): [
  boolean,
  'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null,
  string,
] {
  const classNamesArray = classNames.split(' ');
  let isButton = false;
  let buttonVariant: string | null = null;
  let otherClasses = '';

  for (let i = 0; i < classNamesArray.length; i++) {
    const className = classNamesArray[i];
    if (className === 'button') {
      isButton = true;
    } else if (className.startsWith('button-')) {
      const variant = className.substring(7);
      if (isButtonVariant(variant)) {
        isButton = true;
        buttonVariant = variant;
      }
    } else {
      otherClasses += className + ' ';
    }
  }

  otherClasses = otherClasses.trim();

  return [isButton, buttonVariant, otherClasses];
}
