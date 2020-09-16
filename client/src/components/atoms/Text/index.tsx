import React from 'react';
import * as S from './style';

export interface Props {
  children: string;
  /** html tag (span(default), h1, h2, h3) */
  tag?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

function Text({
  children,
  tag,
  color,
  fontFamily,
  fontSize,
  fontWeight,
}: Props): React.ReactElement {
  switch (tag) {
    case 'h1':
      return (
        <S.H1 color={color} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight}>
          {children}
        </S.H1>
      );
    case 'h2':
      return (
        <S.H2 color={color} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight}>
          {children}
        </S.H2>
      );
    case 'h3':
      return (
        <S.H3 color={color} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight}>
          {children}
        </S.H3>
      );
    default:
      return (
        <S.Span color={color} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight}>
          {children}
        </S.Span>
      );
  }
}

export default Text;
