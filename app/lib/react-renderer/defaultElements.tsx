import React, {Fragment} from 'react';

import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';

import type {RichTextProps} from './types';
import {IFrame, Image, Video, Class, Audio} from './elements';
const __DEV__ = false;
function FallbackForCustomAsset({mimeType}: {mimeType: string}) {
  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: Unsupported mimeType encountered: ${mimeType}. You need to write your renderer to render it since we are not opinionated about how this asset should be rendered (check our docs for more info).`,
    );
  }

  return <Fragment />;
}

export const defaultElements: Required<RichTextProps['renderers']> = {
  a: ({children, openInNewTab, href, rel, ...rest}) => {
    if (!href) return <Text className={'animated-underline'}>{children}</Text>;
    return (
      <Link
        to={href}
        target={openInNewTab ? '_blank' : '_self'}
        rel={rel || 'noopener noreferrer'}
        {...rest}
      >
        {children}
      </Link>
    );
  },
  class: ({children, ...props}) => <div {...props}>{children}</div>,
  video: Video,
  img: Image,
  iframe: IFrame,
  blockquote: ({children}) => <blockquote>{children}</blockquote>,
  ul: ({children}) => <ul>{children}</ul>,
  ol: ({children}) => <ol>{children}</ol>,
  li: ({children}) => <li>{children}</li>,
  p: ({children}) => <p>{children}</p>,
  h1: ({children}) => (
    <Heading as={'h2'} size={'display'}>
      {children}
    </Heading>
  ),
  h2: ({children}) => (
    <Heading as={'h2'} size={'heading'}>
      {children}
    </Heading>
  ),
  h3: ({children}) => (
    <Heading as={'h3'} size={'mid'}>
      {children}
    </Heading>
  ),
  h4: ({children}) => (
    <Heading as={'h4'} size={'lead'}>
      {children}
    </Heading>
  ),
  h5: ({children}) => (
    <Heading as={'h5'} size={'copy'}>
      {children}
    </Heading>
  ),
  h6: ({children}) => (
    <Heading as={'h6'} size={'fine'}>
      {children}
    </Heading>
  ),
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
    image: (props) => <HygraphMultiMedia {...props} media={[props.media]} />,
    video: (props) => <HygraphMultiMedia {...props} media={[props.media]} />,
    font: FallbackForCustomAsset,
    application: FallbackForCustomAsset,
    model: FallbackForCustomAsset,
    text: FallbackForCustomAsset,
  },
  embed: {},
  link: {},
};
