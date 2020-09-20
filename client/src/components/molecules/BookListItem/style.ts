import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* breakpoints xsm (320px) 미만에서 커버이미지 width, height 고정 */
  width: 91.6px;
  ${ImageContainer} {
    height: 116.3px;
  }

  & > div:last-child {
    height: 47px;
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.xsm}) {
    width: calc(100vw / 3 - 1.5rem);

    ${ImageContainer} {
      width: calc(100vw / 3 - 1.5rem);
      height: calc((100vw / 3 - 1.5rem) * 1.27);
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100vw / 4 - 2rem);

    ${ImageContainer} {
      width: calc(100vw / 4 - 2rem);
      height: calc((100vw / 4 - 2rem) * 1.27);
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100vw / 5 - 2rem);

    ${ImageContainer} {
      width: calc(100vw / 5 - 2rem);
      height: calc((100vw / 5 - 2rem) * 1.27);
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    /* breakpoints lg (1024px) 이상에서 커버이미지 width, height 고정 */
    width: 150.66px;

    ${ImageContainer} {
      width: 150.66px;
      height: 191.34px;
    }
  }
`;
