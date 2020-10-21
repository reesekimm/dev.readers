import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 2rem;
  width: 100%;
  height: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 60% auto;
    grid-template-rows: auto;
  }
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Content = styled.p`
  flex: 1;
  text-align: justify;
  line-height: 2;
  min-height: 100px;
  max-height: 280px;
  overflow: auto;
  margin: 1rem 0;
  white-space: pre-wrap;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 1rem;
`;

export const CommentList = styled.ul`
  flex: 1;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;

export const NoComment = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.gray4};
`;
