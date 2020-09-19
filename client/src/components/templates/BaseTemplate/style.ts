import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-width: ${({ theme }) => theme.breakpoints.xsm};
  max-width: ${({ theme }) => theme.breakpoints.lg};
`;
