import styled from 'styled-components';

export const Container = styled.div``;

export const Summary = styled.div`
  display: flex;
  height: fit-content;
  margin-bottom: 1rem;

  & > div:first-child {
    /* book cover ratio - 1 : 1.27 */
    width: 70px;
    height: 88.9px;
  }

  & > div:last-child {
    padding-left: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .hide {
      display: none;
    }
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
