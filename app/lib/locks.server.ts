import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {Params} from '@remix-run/react';
import type {AppSession} from '~/lib/session';
import type {LockFragment} from '~/__generated__/hygraph.generated';
import {isAfterDate} from '~/lib/utils';
import {delocalizePath} from '~/i18n';

enum PageType {
  Page,
  Editorial,
  Product,
  Collection,
  Account,
  Policy,
  Unknown,
}

type RouteSlugInfo = {slug?: string; type: PageType};

/**
 * Generates a list of locks that should be enforced on the current route based on the LockBehaviour and the Session State.
 *
 * The Rules are as follows
 * 1. Page is NOT listed as an exemption.
 * 2. The current time is after the scheduled unlock time AND alwaysUnlockOnTime or no password is provided
 * 3. Page locks only work for PAGE and Editorial type pages
 * @param lock
 * @param ctx
 * @param session
 */
const isActiveLock = (
  lock: LockFragment,
  ctx: RouteSlugInfo,
  session: AppSession,
) => {
  const {
    isGlobal,
    alwaysUnlockForAuthenticatedUser,
    alwaysUnlockOnTime,
    exemptions,
    pageLocks,
    scheduledUnlockTime,
    password,
  } = lock;
  const {type, slug} = ctx;

  for (const e of exemptions) {
    if (slug === e.slug) return false;
  }

  if (isAfterDate(scheduledUnlockTime) && (alwaysUnlockOnTime || !password))
    return false;

  // @TODO implement password authentication
  // if (alwaysUnlockForAuthenticatedUser) {
  //   const token = session.get(`pw-${lock.id}`);
  // }

  if (!isGlobal) {
    if (type !== PageType.Page && type !== PageType.Editorial) return false;
    for (const page of pageLocks) {
      if (page.slug === slug) return true;
    }
  } else {
    return true;
  }

  return false;
};
/**
 * Reducer that accepts an array of Locks, returning a single lock to enfore on the route.
 *
 * If there are multiple valid locks that can be enforced on a route, this function returns one, where
 * - Local Locks, i.e locks assigned to a specific page, takes precedence over global locks.
 * - After that, the selection is arbitrary at this time, so the first lock is selected.
 * @param activeLock
 * @param curr
 * @param idx
 */
const selectLockReducer = (
  activeLock: LockFragment,
  curr: LockFragment,
  idx: number,
) => {
  if (idx === 0) return curr;
  else if (activeLock.isGlobal) return curr;
  else return activeLock;
};

/**
 * Finds the lock to activate on the current route, if one is available.
 *
 * Narrows down the lock that should be activated on the current route based on the configured LockBehaviour and the Session State.
 *
 * @param locks
 * @param ctx
 * @param session
 */
export function findActiveLock(
  locks: LockFragment[],
  ctx: RouteSlugInfo,
  session: AppSession,
) {
  const a = locks.filter((lock) => isActiveLock(lock, ctx, session));
  return a.length ? a.reduce(selectLockReducer) : null;
}

export const isHome = (req: Request, context: AppLoadContext) => {
  const path = new URL(req.url).pathname;
  const delocalizedPath = delocalizePath(path, context.i18n);
  return delocalizedPath === '/';
};
export function getRouteSlugInfo(
  context: AppLoadContext,
  request: Request,
  params: Params,
): RouteSlugInfo {
  let s,
    type = PageType.Unknown;
  const {pageHandle, editorialHandle, productHandle, collectionHandle} = params;
  if (isHome(request, context)) {
    s = 'home';
    type = PageType.Page;
  }
  if (pageHandle) {
    s = pageHandle;
    type = PageType.Page;
  }
  if (editorialHandle) {
    s = editorialHandle;
    type = PageType.Editorial;
  }
  if (productHandle) {
    s = productHandle;
    type = PageType.Product;
  }
  if (collectionHandle) {
    s = collectionHandle;
    type = PageType.Collection;
  }
  return {slug: s, type};
}

export function getLock(
  context: AppLoadContext,
  request: Request,
  params: Params,
  locks: LockFragment[],
) {
  const routeCtx = getRouteSlugInfo(context, request, params);
  // const locks = [];
  // const globalTheme = null;
  return findActiveLock(locks, routeCtx, context.session);
}
