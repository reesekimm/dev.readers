import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TagContainer = styled.div`
  margin: 2rem 0 8rem 0;

  .ant-tag:last-child {
    margin: 0;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;

  .anticon-github {
    font-size: 24px;
    margin-right: 7px;
  }
`;
