import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

export const Tab = styled.li`
  border-bottom: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.palette.primary}` : 'none'};
  width: ${({ numOfMenus }) => 100 / numOfMenus}%;
  text-align: center;
`;
