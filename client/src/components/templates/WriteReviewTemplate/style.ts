import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-rate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    svg {
      width: 36px;
      height: 36px;
    }
  }
`;
