import styled, { css } from 'styled-components';

interface ButtonStyleProps {
  styleType?: string;
  disabled?: boolean;
}

export const ButtonStyle = css<ButtonStyleProps>`
  position: relative;
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily.default};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  margin: 0 1rem;
  border: none;
  outline: none;
  white-space: nowrap;
  background: transparent;
  min-width: 100px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${(props) =>
    props.disabled ? props.theme.palette.opacityscale[3] : props.theme.palette.opacityscale[0]};

  // primary
  ${(props) =>
    props.styleType === 'primary' &&
    css`
      background: ${props.theme.palette.primary};
      color: ${props.theme.palette.white};
      border-radius: 0.6rem;
    `}

  // secondary
    ${(props) =>
    props.styleType === 'secondary' &&
    css`
      background: ${props.theme.palette.secondary};
      color: ${props.theme.palette.white};
      border-radius: 0.6rem;
    `}

  // bordered
  ${(props) =>
    props.styleType === 'bordered' &&
    css`
      color: ${props.theme.palette.gray5};
      border: 1px solid ${props.theme.palette.gray3};
      border-radius: 0.6rem;
    `}

  // plain
  ${(props) =>
    props.styleType === 'plain' &&
    css`
      color: ${props.theme.palette.secondary};
      margin: 0;
      min-width: 0;
      padding: 0.8rem;
    `}
`;

export const Anchor = styled.a`
  ${ButtonStyle}
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;
