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

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.palette.gray2};
  border-radius: 0.5rem;
  & > span {
    margin-bottom: 1rem;
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
