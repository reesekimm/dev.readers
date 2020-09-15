import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  palette: {
    primary: '#1e3799',
    secondary: '#f8c291',
    danger: '#eb2f06',
    alert: '#f6b93b',
    success: '#079992',
    white: '#fff',
    black: '#212121',
    grayscale: ['#414141', '#616161', '#9e9e9e', '#bdbdbd', '#e0e0e0', '#eee', '#fff'],
    transparent: 'transparent',
    opacityscale: [0.9, 0.8, 0.7, 0.6, 0.5],
  },
  breakpoints: {
    xxl: '1900px',
    xl: '1280px',
    lg: '1024px',
    md: '768px',
    sm: '640px',
  },
  fontFamily: {
    logo: `'Alegreya Sans', sans-serif;`,
    default: `'Noto Sans KR', sans-serif;`,
  },
  fontSizes: {
    xxl: '4.2rem',
    xl: '3.6rem',
    lg: '2.4rem',
    md: '1.6rem',
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
