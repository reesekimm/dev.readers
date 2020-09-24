import styled from 'styled-components';

export const Divider = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.palette.gray2};
  width: 100%;
  margin: 1rem 0;
`;
