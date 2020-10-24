import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  height: 200px;
  position: relative;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.palette.gray2};
`;
