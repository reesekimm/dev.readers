import styled, { css } from 'styled-components';

const CommonStyle = css`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  ${CommonStyle}
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const TextContainer = styled.div`
  ${CommonStyle}
  flex: 1;
  justify-content: center;
  white-space: pre-wrap;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  ${CommonStyle}
  justify-content: space-around;
  padding: 0 10%;
`;
