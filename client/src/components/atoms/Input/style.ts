import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.palette.gray2};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  width: 100%;
  height: 4rem;
  padding: 1rem;
  position: relative;
`;

export const Input = styled.input`
  flex: 1;
  border: 0;
  outline: 0;
  padding-left: 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.palette.gray3};
  }
`;
