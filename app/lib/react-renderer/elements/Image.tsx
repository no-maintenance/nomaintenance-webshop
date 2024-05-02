import React from 'react';
import type {ImageProps} from '@graphcms/rich-text-types';
const __DEV__ = true;
export function Image({
  src,
  width,
  height,
  altText,
  title,
}: Partial<ImageProps>) {
  console.log('Image', src);
  if (__DEV__ && !src) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: src is required. You need to include a \`url\` in your query`,
    );
  }

  const shouldIncludeWidth = width && width > 0;
  const shouldIncludeHeight = height && height > 0;

  return (
    <img
      loading="lazy"
      src={src}
      {...(shouldIncludeWidth && {width})}
      {...(shouldIncludeHeight && {height})}
      alt={altText}
      title={title}
    />
  );
}
