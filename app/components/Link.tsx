import {
  Link as RemixLink,
  NavLink as RemixNavLink,
  type NavLinkProps as RemixNavLinkProps,
  type LinkProps as RemixLinkProps,
} from '@remix-run/react';

import {useRootLoaderData} from '~/root';
import {localizePath, useLocale} from '~/i18n';

export type LinkProps = Omit<RemixLinkProps, 'className'> & {
  className?: RemixNavLinkProps['className'] | RemixLinkProps['className'];
};

/**
 * In our app, we've chosen to wrap Remix's `Link` component to add
 * helper functionality. If the `to` value is a string (not object syntax),
 * we prefix the locale to the path if there is one.
 *
 * You could implement the same behavior throughout your app using the
 * Remix-native nested routes. However, your route and component structure
 * changes the level of nesting required to get the locale into the route,
 * which may not be ideal for shared components or layouts.
 *
 * Likewise, your internationalization strategy may not require a locale
 * in the pathname and instead rely on a domain, cookie, or header.
 *
 * Ultimately, it is up to you to decide how to implement this behavior.
 */
export function Link(props: LinkProps) {
  const {to, className, children, ...resOfProps} = props;
  const i18n = useLocale();
  if (typeof className === 'function') {
    return <RemixNavLink to={to} className={className} {...resOfProps} />;
  }
  if (typeof to !== 'string') {
    return (
      <RemixLink {...resOfProps} className={className} to={to}>
        {children}
      </RemixLink>
    );
  }
  if (to.startsWith('http')) {
    return (
      <a {...props} href={to} className={className}>
        {children}
      </a>
    );
  }
  return (
    <RemixLink
      to={localizePath(to, i18n)}
      className={className}
      {...resOfProps}
    >
      {children}
    </RemixLink>
  );
}
