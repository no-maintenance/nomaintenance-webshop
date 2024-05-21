import type {CSSProperties, ReactNode} from 'react';
import {createContext, useContext} from 'react';

import type {
  GetThemesQuery,
  Maybe,
  ThemeFragment,
} from '~/__generated__/hygraph.generated';
import {Sizes} from '~/__generated__/hygraph.generated';
import {Slot} from '@radix-ui/react-slot';
import {cn} from '~/lib/utils';

type ThemeConsumerProps = {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
};
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

interface ThemeProps extends CSSProperties {
  '--foreground': Color;
  '--background': Color;
  '--card': Color;
  '--cardForeground': Color;
  '--primary': Color;
  '--secondary': Color;
  '--muted': Color;
  '--destructive': Color;
  '--destructiveForeground': Color;
  '--border': Color;
  '--ring': Color;
  '--inputColor': Color;
  '--radius': string;
}

export const DEFAULT_THEME_PROPS: Record<string, string> = {
  '--foreground': '#000000',
  '--background': '#fcfcfc',
  '--card': '#fcfcfc',
  '--cardForeground': '#000000',
  '--primary': '#0b3858',
  '--secondary': '#e9e7d4',
  '--muted': '#d9d9d9',
  '--destructive': '#cc0000',
  '--destructiveForeground': '#ffffff',
  '--border': '#000000',
  '--ring': '#2563eb',
  '--inputColor': '#000000',
  '--radius': '0',
};
type ThemeContextType = {
  theme: ThemeProps;
  setTheme: (theme: ThemeProps) => void; // Corrected the setTheme type
};
export const GLOBAL_DEFAULT_VALUE = {
  default: DEFAULT_THEME_PROPS,
};
export const DEFAULT_CHILD_THEME = 'default';
export const GlobalThemeContext =
  createContext<Record<string, Record<string, string>>>(GLOBAL_DEFAULT_VALUE);

export const ChildThemeContext = createContext(DEFAULT_CHILD_THEME);

export function ThemeConsumer({
  children,
  className,
  asChild,
  ...props
}: ThemeConsumerProps) {
  const themes = useContext(GlobalThemeContext);
  const theme = useContext(ChildThemeContext);
  const activeThemeProps = themes[theme];
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      style={activeThemeProps}
      className={cn('bg-background text-foreground', className)}
    >
      {children}
    </Component>
  );
}

export function hasRGBA(
  property: any,
): property is {rgba: {__typename?: 'RGBA'; r: any; g: any; b: any; a: any}} {
  return property != null && typeof property === 'object' && 'rgba' in property;
}

export const getRgbaCssVariables = (
  theme: ThemeFragment,
): {[key: string]: string} => {
  const cssVariables: {[key: string]: string} = {};
  Object.keys(theme).forEach((k) => {
    const typedKey = k as keyof ThemeFragment;
    const themeProperty = theme[typedKey];
    if (hasRGBA(themeProperty)) {
      const {r, g, b, a} = themeProperty.rgba;
      cssVariables[`--${typedKey}`] = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
  });
  return cssVariables;
  //   info, success, neutral
};
export const getHexCssVariables = (
  theme?: Maybe<ThemeFragment>,
): CSSProperties => {
  if (!theme) return {};
  const cssVariables: {[key: string]: string} = {};
  Object.keys(theme).forEach((k) => {
    const typedKey = k as keyof ThemeFragment;
    const themeProperty = theme[typedKey];
    // @ts-ignore
    if (themeProperty?.hex) {
      // @ts-ignore
      cssVariables[`--${typedKey}`] = themeProperty?.hex;
    }
  });
  return cssVariables;
  //   info, success, neutral
};

export const createRootThemeCss = (query?: GetThemesQuery) => {
  if (!query) return;
  const {themes, normal, light, dark} = query;
  const themeCSS: Record<string, Record<string, string>> = {};
  if (!themes.length) return;
  for (const t of themes) {
    themeCSS[t.slug] = getThemeStyles(t);
  }
  return {
    themes: themeCSS,
    staticRoots: {normal: normal?.slug, dark: dark?.slug, light: light?.slug},
  };
};
const getCssSelectorString = (cssVariables: CSSProperties) =>
  Object.entries(cssVariables).reduce((acc, [key, value]) => {
    return `${acc}${key}: ${value}; `;
  }, '');

const getRadiusCSS = (s?: Maybe<Sizes>) => {
  switch (s) {
    case Sizes.Large:
      return {'--radius': '6px'};
    case Sizes.Medium:
      return {'--radius': '5px'};
    case Sizes.Small:
      return {'--radius': '4px'};
    default:
      return {'--radius': '0'};
  }
};
export const getThemeStyles = (theme: ThemeFragment) => {
  const radiusCSS = getRadiusCSS(theme.radius);
  const colorCss = getRgbaCssVariables(theme);
  return {
    ...colorCss,
    ...radiusCSS,
  };
};
