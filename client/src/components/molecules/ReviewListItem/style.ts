import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray2};
  & > span {
    flex: 1;
  }
`;

export const ContentWrapper = styled.div`
  cursor: pointer;
`;

export const Content = styled.p`
  flex: 1;
  margin: 1rem 0;
  text-align: justify;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
