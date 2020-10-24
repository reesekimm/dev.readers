import styled, { css } from 'styled-components';

interface TabStyleProps {
  selected: boolean;
  numOfMenus: number;
}

export const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

export const TabStyle = css<TabStyleProps>`
  border-bottom: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.palette.primary}` : 'none'};
  width: ${({ numOfMenus }) => 100 / numOfMenus}%;
  text-align: center;
  & > a {
    color: ${({ selected, theme }) => (selected ? theme.palette.primary : theme.palette.gray5)};
    width: 100%;
  }
`;

export const Tab = styled.li`
  ${TabStyle}
`;
