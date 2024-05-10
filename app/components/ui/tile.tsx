import * as React from 'react';

import {cn} from '~/lib/utils';
import type {VariantProps} from 'class-variance-authority';
import {cva} from 'class-variance-authority';
import type {HTMLAttributes} from 'react';
import {createContext, Fragment, Children, ElementRef} from 'react';
import {Slot} from '@radix-ui/react-slot';
import {createContextScope} from '@radix-ui/react-context';
import {createCollection} from '@radix-ui/react-collection';
import {Primitive} from '@radix-ui/react-primitive';
import {useId} from '~/hooks/useId';

const TILE_CONTAINER_NAME = 'TileContainer';
const TILE_NAME = 'Tile';
type CVAProps<T, V extends (...args: any) => any> = T & VariantProps<V>;
type CVASlot<T, V extends (...args: any) => any> = CVAProps<T, V> & {
  asChild?: boolean;
};
const tileContainerVariants = cva('', {
  variants: {
    variant: {
      singular: '',
      duplex: 'grid grid-cols-1 md:grid-cols-2',
      parallax: 'grid grid-cols-1 md:grid-cols-2',
    },
  },
});
const tileVariant = cva('relative w-full', {
  variants: {
    size: {
      screen: 'h-screen',
      navOffset: 'h-screen-no-nav',
      fluid: '',
    },
    mode: {
      singular: '',
      duplex: '',
      sticky: 'aspect-[4/5]',
    },
  },
  defaultVariants: {
    size: 'screen',
    mode: 'singular',
  },
});
const tileHeaderVariants = cva(
  'text-background absolute max-w-2xl w-full px-gutter transform z-10',
  {
    variants: {
      posY: {
        top: 'top-0',
        middle: '-translate-y-1/2 top-1/2',
        bottom: 'bottom-4',
      },
      posX: {
        left: 'text-justify left-0',
        center: 'text-center left-1/2 -translate-x-1/2',
        right: 'text-justify right-0',
      },
    },
    defaultVariants: {
      posY: 'bottom',
      posX: 'left',
    },
  },
);
export type TileProps = CVAProps<
  HTMLAttributes<HTMLDivElement>,
  typeof tileVariant
>;
export type TileHeaderProps = CVAProps<
  HTMLAttributes<HTMLDivElement>,
  typeof tileHeaderVariants
>;
type TileContextValue = {
  hasBackground: boolean;
};
// @TODO create context
// type TileImplElement = React.ElementRef<typeof Primitive.div>;
//
// const [Collection, useCollection, createCollectionScope] =
//   createCollection<ElementRef<typeof Tile>>(TILE_CONTAINER_NAME);
//
// const [createTileContext, createTileScope] = createContextScope(
//   TILE_CONTAINER_NAME,
//   [createCollectionScope],
// );
// const [TileProvider, useTileContext] =
//   createTileContext<TileContextValue>(TILE_CONTAINER_NAME);
//
// const getMode = (count: number) =>
//   count > 2 ? 'parallax' : count === 2 ? 'duplex' : 'singular';
// const TileCollection = React.forwardRef<
//   HTMLElement,
//   CVASlot<HTMLAttributes<HTMLElement>, typeof tileContainerVariants>
// >(({className, variant, children, asChild, ...props}, ref) => {
//   const arrayChildren = Children.toArray(children);
//   const mode = getMode(arrayChildren.length);
//
//   const Layout = () => {
//     if (mode === 'parallax') {
//       const stickyItem = arrayChildren.shift();
//       return (
//         <section
//           ref={ref}
//           className={cn('grid grid-cols-1 md:grid-cols-2 w-full', className)}
//           {...props}
//         >
//           <div>
//             <div className={'top-0 sticky'}>{stickyItem}</div>
//           </div>
//           <div>
//             {Children.map(arrayChildren, (child, index) => (
//               <Fragment key={useId()}>{child}</Fragment>
//             ))}
//           </div>
//         </section>
//       );
//     }
//
//     if (mode === 'singular') return <>{children}</>;
//     if (mode === 'duplex') return;
//   };
//
//   return <section ref={ref} className={cn(className)} {...props}></section>;
// });
//
// TileCollection.displayName = TILE_CONTAINER_NAME;

const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({className, mode, size, ...props}, ref) => {
    const fixedAspectRatio = mode !== 'singular';
    return (
      <div
        ref={ref}
        className={cn(
          tileVariant({size}),
          fixedAspectRatio && 'h-auto aspect-[4/5]',
          fixedAspectRatio && size === 'screen'
            ? 'max-h-screen'
            : 'max-h-screen-no-nav',
          className,
        )}
        {...props}
      />
    );
  },
);
Tile.displayName = TILE_NAME;

const TileHeader = React.forwardRef<HTMLDivElement, TileHeaderProps>(
  ({className, posX, posY, ...props}, ref) => (
    <div
      dir={posX === 'right' ? 'rtl' : 'ltr'}
      ref={ref}
      className={cn(
        tileHeaderVariants({posX, posY}),
        ' max-w-prose-wide',
        className,
      )}
      {...props}
    />
  ),
);
TileHeader.displayName = 'TileHeader';

const TileTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({className, children, ...props}, ref) => (
  <h2
    ref={ref}
    className={cn('font-normal text-lead uppercase mt-0 mb-0', className)}
    {...props}
  >
    {children}
  </h2>
));
TileTitle.displayName = 'TileTitle';

const TileDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {asChild?: boolean}
>(({className, asChild, ...props}, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      dir={'ltr'}
      ref={ref}
      className={cn('font-normal text-copy mt-0 mb-0', className)}
      {...props}
    />
  );
});
TileDescription.displayName = 'TileDescription';

const TileBackground = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {asChild?: boolean}
>(({className, asChild, ...props}, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn('inset-0 absolute h-full object-cover w-full', className)}
      {...props}
    />
  );
});
TileBackground.displayName = 'TileBackground';

export {Tile, TileHeader, TileTitle, TileDescription, TileBackground};
