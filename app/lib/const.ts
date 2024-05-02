export const PAGINATION_SIZE = 12;
export const DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 3;
export const ATTR_LOADING_EAGER = 'eager';
export const ATTR_LOADING_LAZY = 'lazy';
export function getImageLoadingPriority(
  index: number,
  maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT,
) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : undefined;
}

export const HYGRAPH_CACHE_NAME = 'hygraph';
