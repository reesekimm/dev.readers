import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: fit-content;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.gray2};
  border-radius: 0.5rem;

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
  /* book cover ratio - 1 : 1.27 */
  width: 100px;
  height: 127px;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
