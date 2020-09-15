import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import { lightTheme } from '../styles/themes';

function App({ Component }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Component />
      </ThemeProvider>
    </>
  );
}

export default App;
