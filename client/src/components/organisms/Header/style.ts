import styled from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  min-width: ${({ theme }) => theme.breakpoints.xsm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray2};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    button {
      display: none;
    }
  }
`;
