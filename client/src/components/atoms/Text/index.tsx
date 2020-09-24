import React from 'react';
import { AnyStyledComponent } from 'styled-components';

import * as S from './style';

export interface Props {
  [key: string]: unknown;
  children: string;
  /** html tag (span(default), h1, h2, h3) */
  tag?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

/** text tag 맵핑을 위한 interface */
interface TextTagMapping {
  [key: string]: AnyStyledComponent;
}

const text: TextTagMapping = {
  h1: S.H1,
  h2: S.H2,
  h3: S.H3,
  span: S.Span,
};

function Text({
  children,
  tag = 'span',
  color,
  fontFamily,
  fontSize,
  fontWeight,
  ...props
}: Props): React.ReactElement {
  const TextWithProperTag = text[tag];

  return (
    <TextWithProperTag
      color={color}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </TextWithProperTag>
  );
}

export default Text;
