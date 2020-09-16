import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  palette: {
    primary: '#1e3799',
    secondary: '#f8c291',
    danger: '#eb2f06',
    alert: '#f6b93b',
    success: '#079992',
    white: '#fff',
    gray1: '#eee',
    gray2: '#e0e0e0',
    gray3: '#bdbdbd',
    gray4: '#9e9e9e',
    gray5: '#616161',
    gray6: '#414141',
    black: '#212121',
    transparent: 'transparent',
    opacityscale: [1, 0.8, 0.5, 0.3],
  },
  breakpoints: {
    xxl: '1900px',
    xl: '1280px',
    lg: '1024px',
    md: '768px',
    sm: '600px',
    xsm: '320px',
  },
  fontFamily: {
    logo: `'Alegreya Sans', sans-serif;`,
    default: `'Noto Sans KR', sans-serif;`,
  },
  fontSizes: {
    xxl: '4.2rem',
    xl: '3.4rem',
    lg: '2.5rem',
    md: '2rem',
    sm: '1.4rem',
    xsm: '1.2rem',
  },
  fontWeights: {
    extraBold: 900,
    bold: 700,
    medium: 500,
    regular: 400,
    light: 300,
    thin: 100,
  },
};

export default lightTheme;
