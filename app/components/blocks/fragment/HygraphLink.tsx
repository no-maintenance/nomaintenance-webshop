import type {ReactNode} from 'react';

import type {LinkFragment, Maybe} from '~/__generated__/hygraph.generated';
import {StaticPage} from '~/__generated__/hygraph.generated';
import type {LinkProps} from '~/components/Link';
import {Link} from '~/components/Link';

const getStaticPathname = (slug: string, k?: Maybe<StaticPage>) => {
  switch (k) {
    case StaticPage.FrontPage:
      return '/';
    case StaticPage.Editorial:
      return '/editorials';
    default:
      return `/pages/${slug}`;
  }
};

export function getDestination(internalTarget: LinkFragment['internalTarget']) {
  let to = '';
  if (!internalTarget) return to;
  const {slug} = internalTarget;
  switch (internalTarget.__typename) {
    case 'Collection':
      to = `/collections/${slug}`;
      break;
    case 'Product':
      to = `/products/${slug}`;
      break;
    case 'Editorial':
      to = `/editorials/${slug}`;
      break;
    case 'Page':
      to = getStaticPathname(slug, internalTarget.staticPage);
      break;
    default:
      console.warn('link type not assigned');
  }
  return to;
}

export function HygraphLink({
  hygraphLink,
  children,
  ...props
}: {hygraphLink: LinkFragment} & {children?: ReactNode} & Omit<
    LinkProps,
    'to'
  >) {
  const {hasTargetBlank, rel, title} = hygraphLink;
  const {externalTarget, internalTarget} = hygraphLink;
  const to = internalTarget ? getDestination(internalTarget) : externalTarget;
  props.prefetch = 'intent';

  return (
    <Link
      {...props}
      to={to}
      title={title ?? ''}
      rel={rel ?? ''}
      target={hasTargetBlank ? '_blank' : '_self'}
    >
      {children}
    </Link>
  );
}
