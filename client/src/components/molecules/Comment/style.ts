import styled from 'styled-components';

export const Container = styled.li`
  margin-bottom: 1rem;
  white-space: pre-wrap;
  width: 100%;
  display: flex;
`;

export const Content = styled.div`
  flex: 1;

  a {
    padding: 0;
  }

  .no-margin {
    padding-left: 0;
  }
`;
