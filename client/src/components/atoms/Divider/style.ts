import styled from 'styled-components';

export const Divider = styled.hr`
  border: none;
  width: 100%;
  margin: 1rem 0;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.gray2};
`;
