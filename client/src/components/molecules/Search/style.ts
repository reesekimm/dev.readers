import styled from 'styled-components';

export const StyledInput = styled.input`
  border: 0;
  padding: 0.25em 0.5em;
  flex-grow: 1;
  outline: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: transparent;
`;

export const StyledButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.md};
  position: absolute;
  right: 0.5rem;
  background: 0;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background 200ms ease-out;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.palette.gray5};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    outline: 0;
  }
`;

export const Container = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 1.7px solid ${({ theme }) => theme.palette.gray3};
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  position: relative;
  width: 100%;
  max-width: 350px;
  height: 3.8rem;
  margin-left: auto;
  margin-right: 1rem;
  transition: width 450ms;
  padding: 3px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 3.8rem;
    border: none;

    ${StyledInput} {
      opacity: 0;
      z-index: 2;
      cursor: pointer;
    }

    &:focus-within {
      width: 100%;
      border-bottom: 1.7px solid ${({ theme }) => theme.palette.gray3};

      ${StyledInput} {
        opacity: 1;
        z-index: initial;
        cursor: initial;
        width: calc(100% - 3.8rem);
      }
    }
  }
`;
