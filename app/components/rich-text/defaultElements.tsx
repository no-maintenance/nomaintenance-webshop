import React, {Fragment} from 'react';
import {RichTextProps} from './types';

import {Audio, Class, IFrame, Image, Link, Video} from './elements';
import type {NodeRendererType} from '~/lib/react-renderer';
import {Heading} from '~/components/Text';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {cn} from '~/lib/utils';
import {Archive} from '~/components/blocks/Archive';
import {BlockProvider} from '~/components/blocks/BlockFactory';
import {Sizes} from '~/__generated__/hygraph.generated';

function FallbackForCustomAsset({mimeType}: {mimeType: string}) {
  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: Unsupported mimeType encountered: ${mimeType}. You need to write your renderer to render it since we are not opinionated about how this asset should be rendered (check our docs for more info).`,
    );
  }

  return <Fragment />;
}

export const defaultElements: Required<RichTextProps['renderers']> = {
  a: Link,
  class: Class,
  video: Video,
  img: Image,
  iframe: IFrame,
  blockquote: ({children}) => <blockquote>{children}</blockquote>,
  ul: ({children}) => <ul>{children}</ul>,
  ol: ({children}) => <ol>{children}</ol>,
  li: ({children}) => <li>{children}</li>,
  p: ({children}) => {
    console.log('children', children);
    if (children?.props?.references.length) {
      return (
        <div className={' gap-4 flex flex-wrap md:flex-nowrap'}>{children}</div>
      );
    }
    return <p className={'prose'}>{children}</p>;
  },
  h1: ({children}) => <h1>{children}</h1>,
  h2: ({children}) => <h2>{children}</h2>,
  h3: ({children}) => <h3>{children}</h3>,
  h4: ({children}) => <h4>{children}</h4>,
  h5: ({children}) => <h5>{children}</h5>,
  h6: ({children}) => <h6>{children}</h6>,
  table: ({children}) => <table>{children}</table>,
  table_head: ({children}) => <thead>{children}</thead>,
  table_body: ({children}) => <tbody>{children}</tbody>,
  table_row: ({children}) => <tr>{children}</tr>,
  table_cell: ({children}) => <td>{children}</td>,
  table_header_cell: ({children}) => <th>{children}</th>,
  bold: ({children}) => <b>{children}</b>,
  italic: ({children}) => <i>{children}</i>,
  underline: ({children}) => <u>{children}</u>,
  code: ({children}) => <code>{children}</code>,
  code_block: ({children}) => (
    <pre
      style={{
        whiteSpace: 'pre',
        wordWrap: 'break-word',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        fontFamily: 'monospace',
      }}
    >
      {children}
    </pre>
  ),
  list_item_child: ({children}) => <>{children}</>,
  Asset: {
    audio: (props) => <Audio {...props} url={props.url} />,
    image: (props) => <Image {...props} src={props.url} />,
    video: (props) => <Video {...props} src={props.url} />,
    font: FallbackForCustomAsset,
    application: FallbackForCustomAsset,
    model: FallbackForCustomAsset,
    text: FallbackForCustomAsset,
  },
  embed: {},
  link: {},
};
export const DEFAULT_RENDERERS: NodeRendererType = {
  h1: ({children}) => <Heading as="h1">{children}</Heading>,
  h2: ({children}) => <Heading as="h2">{children}</Heading>,
  h3: ({children}) => <Heading as="h3">{children}</Heading>,
  h4: ({children}) => <Heading as="h4">{children}</Heading>,
  h5: ({children}) => <Heading as="h5">{children}</Heading>,
  h6: ({children}) => <Heading as="h6">{children}</Heading>,
  img: ({height, width, src, title, altText}) => (
    <img
      src={src}
      alt={altText}
      width={width}
      height={height}
      title={title}
      loading="lazy"
      className="shadow-image"
    />
  ),
  Asset: {
    video: ({isInline, ...asset}) => {
      const classes = cn(isInline && 'md:min-w-0 flex-1');
      return <HygraphMultiMedia className={classes} media={[asset]} />;
    },
    image: ({isInline, ...asset}) => {
      const classes = cn(isInline && 'md:min-w-0 flex-1');
      return <HygraphMultiMedia className={classes} media={[asset]} />;
    },
  },
  embed: {
    Archive: (archive) => {
      return (
        <BlockProvider
          props={{verticalPadding: Sizes.None, horizontalPadding: Sizes.None}}
        >
          <Archive {...archive} />
        </BlockProvider>
      );
    },
  },
  // Asset: (asset) => {
  //   console.log(asset);
  //   return <HygraphMultiMedia media={[asset]} />;
  // },
  // embed: {
  //   Asset: {
  //     video: () => <div>custom VIDEO</div>,
  //     image: () => <div>custom IMAGE</div>,
  //     'video/mp4': () => {
  //       return <div>custom video/mp4 renderer</div>;
  //     },
  //   },

  // Page: ({slug, title}: EmbedProps<EmbeddedPageFragment>) => (
  //   <Link
  //     to={`/${slug}`}
  //     className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 no-underline shadow-image md:p-6"
  //   >
  //     <span>{title}</span>
  //     <span>&rarr;</span>
  //   </Link>
  // ),
  // },
};
