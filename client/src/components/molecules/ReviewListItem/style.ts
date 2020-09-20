import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > span {
    flex: 1;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
