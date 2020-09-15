import React from 'react';
import * as S from './style';

export interface Props {
  tag?: 'h1' | 'h2' | 'h3' | string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

export interface TextProps extends Props {
  children: string;
}

function Text({
  children,
  tag,
  color,
  fontFamily,
  fontSize,
  fontWeight,
}: TextProps): React.ReactElement {
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
