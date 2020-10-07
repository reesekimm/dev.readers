import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    height: 100%;
    font-size: 10px;
  }

  body {
    height: 100%;
    #__next {
      height: 100%;
    }
  }

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  ul, ol {
    list-style-type: none;
  }

  .anticon {
    font-size: 1.7rem;
  }
`;

export default GlobalStyle;
