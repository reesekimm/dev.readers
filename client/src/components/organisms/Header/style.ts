import styled from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  min-width: ${({ theme }) => theme.breakpoints.xsm};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray2};
  padding: 1rem 0;

  .anticon {
    color: #616161;
    font-size: 2rem;
  }
`;

export const NavItemContainer = styled.div`
  width: ${({ theme }) => theme.breakpoints.lg};
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 2rem;
`;
