import type {ReactElement} from 'react';
import {cloneElement, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {LazyMotion, m} from 'framer-motion';

import {Text} from '~/components/Text';
import {useFocus} from '~/hooks/useFocus';

export function InputWrapper({
  children,
  id,
  label,
  fixedHeight = true,
  errorMsg,
  showErrorMsg = true,
  hasDefaultStyle = true,
  classNames = '',
}: {
  classNames?: string;
  showErrorMsg?: boolean;
  fixedHeight?: boolean;
  children: ReactElement;
  id: string;
  label?: string;
  errorMsg?: string;
  hasDefaultStyle?: boolean;
}) {
  const [inputRef, setFocus] = useFocus();
  const [isFocused, setIsFocused] = useState(false);
  // Function to handle input focus
  const handleFocus = () => setIsFocused(true);

  // Function to handle input blur
  const handleBlur = () => setIsFocused(false);

  const labelAnimationVariants = {
    focused: {
      x: 8,
      y: 6,
      transition: {duration: 0.05},
    },
    initial: {
      x: 0,
      y: 3,
      transition: {duration: 0.05},
    },
  };
  useEffect(() => {
    if (inputRef?.current && errorMsg) setFocus();
  }, [errorMsg]);
  // Clone the child input element to add onFocus and onBlur handlers
  const input = cloneElement(children, {
    id,
    ...(hasDefaultStyle && {
      className: clsx([getInputStyleClasses(errorMsg)]),
    }),
    ref: inputRef,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });
  return (
    <LazyMotion features={async () => (await import('~/lib/features')).default}>
      <div
        className={clsx([
          'flex flex-wrap relative',
          fixedHeight && 'h-[47px]',
          classNames,
        ])}
      >
        {label && (
          <m.label
            initial={'initial'}
            animate={isFocused ? 'focused' : 'initial'}
            variants={labelAnimationVariants}
            htmlFor={id}
            className={'block text-fine bg-background z-10 cursor-pointer'}
          >
            {label}
          </m.label>
        )}
        {input}
        {errorMsg && (
          <Text
            as={'span'}
            className={'absolute bottom-0 transform translate-y-4'}
          >
            {errorMsg}
          </Text>
        )}
      </div>
    </LazyMotion>
  );
}

export const INPUT_STYLE_CLASSES = clsx([
  'bg-transparent w-full p-2 pl-0 appearance-none border-0 border-b  leading-tight placeholder:text-foreground/50',
  ' focus:border-0 focus:border-b-0 focus:pl-2 focus:placeholder:opacity-0 focus:rounded focus:shadow-error',
]);
export const getInputStyleClasses = (isError?: string | null) => {
  return `${INPUT_STYLE_CLASSES} ${
    isError ? 'border-red-500' : 'border-foreground'
  }`;
};

export function isValidEmail(email?: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email.toString());
}
