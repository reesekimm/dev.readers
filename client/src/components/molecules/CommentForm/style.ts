import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & > button {
    margin: 0;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 1rem;
  margin-bottom: 1rem;
  vertical-align: middle;
  border: 1px solid ${({ theme }) => theme.palette.gray2};
  border-radius: 0.5rem;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
`;
