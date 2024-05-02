import type {ElementType, ReactNode} from 'react';
import {useContext} from 'react';
import clsx from 'clsx';

import type {BlockProps} from '~/components/blocks/BlockFactory';
import {Block, BlockProvider} from '~/components/blocks/BlockFactory';
import {
  ThemeConsumer,
  ChildThemeContext,
  useThemeMerge,
} from '~/components/ui/theme';
import type {Maybe, SpacingFragment} from '~/__generated__/hygraph.generated';
import {Sizes} from '~/__generated__/hygraph.generated';
import {Slot} from '@radix-ui/react-slot';

export function CustomizedSection({
  reverseLayout,
  id,
  content,
  theme,
  horizontalPadding,
  alternateLayout,
  verticalPadding,
  heading,
}: BlockProps<'CustomizedSection'>) {
  if (!content) return null;
  const ThemeWrapper = ({children}: {children: ReactNode}) =>
    theme?.slug ? (
      <ChildThemeContext.Provider value={theme?.slug}>
        <ThemeConsumer asChild>{children}</ThemeConsumer>
      </ChildThemeContext.Provider>
    ) : (
      <>{children}</>
    );
  return (
    <BlockProvider
      props={{
        reverseLayout,
        horizontalPadding,
        alternateLayout,
        verticalPadding,
      }}
    >
      <ThemeWrapper>
        <Block {...content} />
      </ThemeWrapper>
    </BlockProvider>
  );
}

export function SpacingWrapper({
  as: Comp = 'section',
  children,
  spacing,
  defaults = {
    horizontal: 'gutter',
    vertical: 'gutter-y',
  },
  asChild,
}: {
  asChild?: boolean;
  children: ReactNode;
  as?: ElementType;
  spacing: SpacingFragment;
  defaults?: {horizontal: string; vertical: string};
}) {
  const {verticalPadding, horizontalPadding} = spacing;
  const classes = clsx([
    getSizing(defaults, verticalPadding, 'vertical'),
    getSizing(defaults, horizontalPadding),
  ]);
  if (!classes) return <>{children}</>;
  const Component = asChild ? Slot : Comp;
  return <Component className={classes}>{children}</Component>;
}

const getSizing = (
  defaults: {horizontal: string; vertical: string} = {
    horizontal: 'gutter',
    vertical: 'gutter-y',
  },
  sizing: Maybe<Sizes> = Sizes.Default,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
) => {
  const sizes = {
    none: {horizontal: '', vertical: ''},
    large: {horizontal: 'gutter-lg', vertical: 'gutter-lg-y'},
    medium: {horizontal: 'gutter', vertical: 'gutter-y'},
    small: {horizontal: 'gutter', vertical: 'gutter-y'},
    default: defaults,
  };
  return sizes[sizing ?? 'default'][orientation];
};
