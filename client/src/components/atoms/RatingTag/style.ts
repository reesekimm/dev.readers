import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.palette.white};
  padding: 0.7rem 1rem 0.7rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xsm};
  border-radius: 5px;
  width: fit-content;
`;
