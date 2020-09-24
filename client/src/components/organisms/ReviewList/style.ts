import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: minmax(200px, auto);
  grid-gap: 3rem;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
