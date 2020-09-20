import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  width: 100%;
  height: 3.8rem;
  padding: 1rem;
  padding-left: 2rem;
  position: relative;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80%;
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2rem;
  width: 90%;
`;
