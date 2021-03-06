import styled, { css } from 'styled-components';

export interface TextStyleProps {
  tag?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

export const TextStyle = css<TextStyleProps>`
  display: inline-block;
  margin: 0;
  color: ${(props) =>
    props.theme.palette[props.color as keyof typeof props.theme.palette] ||
    props.theme.palette.gray6};
  font-family: ${(props) =>
    props.theme.fontFamily[props.fontFamily as keyof typeof props.theme.fontFamily] ||
    props.theme.fontFamily.default}
  font-weight: ${(props) =>
    props.theme.fontWeights[props.fontWeight as keyof typeof props.theme.fontWeights] ||
    props.theme.fontWeights.regular};
`;

export const H1 = styled.h1`
  ${TextStyle}
  font-size: ${(props) =>
    props.theme.fontSizes[props.fontSize as keyof typeof props.theme.fontSizes] ||
    props.theme.fontSizes.xl};
`;

export const H2 = styled.h2`
  ${TextStyle}
  font-size: ${(props) =>
    props.theme.fontSizes[props.fontSize as keyof typeof props.theme.fontSizes] ||
    props.theme.fontSizes.lg};
`;

export const H3 = styled.h3`
  ${TextStyle}
  font-size: ${(props) =>
    props.theme.fontSizes[props.fontSize as keyof typeof props.theme.fontSizes] ||
    props.theme.fontSizes.md};
`;

export const Span = styled.span`
  ${TextStyle}
  line-height: 2;
  font-size: ${(props) =>
    props.theme.fontSizes[props.fontSize as keyof typeof props.theme.fontSizes] ||
    props.theme.fontSizes.sm};
`;
