import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: lightgray;
  min-width: ${({ theme }) => theme.breakpoints.xsm};
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
`;
