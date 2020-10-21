import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  a {
    padding-left: 0;
  }

  button {
    color: #616161;
  }

  .anticon {
    font-size: 2rem;
  }

  .anticon-heart {
    color: #fc5c65;
  }

  span:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

export const ButtonContent = styled.div`
  min-width: 60px;
  display: flex;
  align-items: center;
`;
