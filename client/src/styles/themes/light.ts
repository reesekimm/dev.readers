import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  palette: {
    primary: '#30336b',
    secondary: '#a4b0be',
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
    logo: `'Pacifico', cursive;`,
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
  shadows: {
    xxl: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    xl: '0px 10px 37px rgba(0, 0, 0, 0.15)',
    lg: '0 1px 5px rgba(0,0,0,0.2)',
    md: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  },
};

export default lightTheme;
