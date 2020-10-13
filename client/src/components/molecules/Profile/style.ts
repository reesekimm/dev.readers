import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ant-avatar {
    margin-right: 1.5rem;
  }

  & > button {
    color: ${({ theme }) => theme.palette.gray4};
  }
`;
