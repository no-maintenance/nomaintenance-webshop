import * as React from 'react';

import {cn} from '~/lib/utils';
import type {VariantProps} from 'class-variance-authority';
import {cva} from 'class-variance-authority';
import {Slot} from '@radix-ui/react-slot';

type ExtendedPrimitive<T, V extends (...args: any) => any> = T &
  VariantProps<V>;
const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'border bg-card text-card-foreground shadow rounded-lg',
      tile: 'relative',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardHeaderVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col space-y-1.5 p-4',
      tile: 'text-background absolute max-w-2xl w-full p-gutter transform',
    },
    posY: {
      top: 'top-0',
      middle: '-translate-y-1/2 top-1/2',
      bottom: 'bottom-0',
    },
    posX: {
      left: 'text-left left-0',
      center: 'text-center left-1/2 -translate-x-1/2',
      right: 'text-right right-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    posY: 'bottom',
    posX: 'left',
  },
});

const cardTitleVariants = cva('', {
  variants: {
    variant: {
      default: 'font-semibold leading-none tracking-tight',
    },
  },
});
const cardDescriptionVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sm text-muted-foreground',
    },
  },
});
const cardFooterVariants = cva('', {
  variants: {
    variant: {
      default: 'flex items-center p-6 pt-0',
    },
  },
});
const Card = React.forwardRef<
  HTMLDivElement,
  ExtendedPrimitive<React.HTMLAttributes<HTMLDivElement>, typeof cardVariants>
>(({className, variant, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({variant}), className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({className, variant, ...props}, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({variant}), className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  ExtendedPrimitive<
    React.HTMLAttributes<HTMLHeadingElement>,
    typeof cardTitleVariants
  >
>(({className, variant, ...props}, ref) => (
  <h3
    ref={ref}
    className={cn(cardTitleVariants({variant}), className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  ExtendedPrimitive<
    React.HTMLAttributes<HTMLParagraphElement> & {asChild?: boolean},
    typeof cardDescriptionVariants
  >
>(({className, variant, asChild, ...props}, ref) => {
  const Component = asChild ? Slot : 'p';
  return (
    <Component
      ref={ref}
      className={cn(cardDescriptionVariants({variant}), className)}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  ExtendedPrimitive<
    React.HTMLAttributes<HTMLDivElement>,
    typeof cardFooterVariants
  >
>(({className, variant, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(cardFooterVariants({variant}), className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent};
