import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      [key: string]: string | string[] | number[];
    };
    breakpoints: {
      [key: string]: string;
    };
    fontFamily: {
      [key: string]: string;
    };
    fontSizes: {
      [key: string]: string;
    };
    fontWeights: {
      [key: string]: number;
    };
    shadows: {
      [key: string]: string;
    };
  }
}
