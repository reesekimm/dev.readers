import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-width: ${({ theme }) => theme.breakpoints.xsm};
  max-width: ${({ theme }) => theme.breakpoints.lg};
`;
