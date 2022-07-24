import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

// eslint-disable-next-line no-use-before-define
type Children = Leaf[]

type Leaf = {
  type: string
  value?: {
    url: string
    alt: string
  }
  children?: Children
  url?: string
  [key: string]: unknown
}

// @ts-ignore
const Serialize = (children: Children): React.ReactElement[] => children.map((node, i) => {
  if (Text.isText(node)) {
    let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

    if (node.bold) {
      text = (
        <strong key={i}>
          {text}
        </strong>
      );
    }

    if (node.code) {
      text = (
        <code key={i}>
          {text}
        </code>
      );
    }

    if (node.italic) {
      text = (
        <em key={i}>
          {text}
        </em>
      );
    }

    if (node.underline) {
      text = (
        <span
          style={{ textDecoration: 'underline' }}
          key={i}
        >
          {text}
        </span>
      );
    }

    if (node.strikethrough) {
      text = (
        <span
          style={{ textDecoration: 'line-through' }}
          key={i}
        >
          { text}
        </span>
      );
    }

    return (
      <Fragment key={i}>
        {text}
      </Fragment>
    );
  }

  if (!node) {
    return null;
  }

  switch (node.type) {
    case 'h1':
      return (
        <h1 key={i}>
          {Serialize(node.children as any)}
        </h1>
      );
    case 'h2':
      return (
        <h2 key={i}>
          {Serialize(node.children as any)}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i}>
          {Serialize(node.children as any)}
        </h3>
      );
    case 'h4':
      return (
        <h4 key={i}>
          {Serialize(node.children as any)}
        </h4>
      );
    case 'h5':
      return (
        <h5 key={i}>
          {Serialize(node.children as any)}
        </h5>
      );
    case 'h6':
      return (
        <h6 key={i}>
          {Serialize(node.children as any)}
        </h6>
      );
    case 'quote':
      return (
        <blockquote key={i}>
          {Serialize(node.children as any)}
        </blockquote>
      );
    case 'ul':
      return (
        <ul key={i}>
          {Serialize(node.children as any)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {Serialize(node.children as any)}
        </ol>
      );
    case 'li':
      return (
        <li key={i}>
          {Serialize(node.children as any)}
        </li>
      );
    case 'link':
      return (
        <a
          href={escapeHTML(node.url)}
          key={i}
        >
          {Serialize(node.children as any)}
        </a>
      );

    default:
      return (
        <p key={i}>
          {Serialize(node.children as any)}
        </p>
      );
  }
});

export default Serialize;