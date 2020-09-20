import styled from 'styled-components';

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.gray2};
`;
