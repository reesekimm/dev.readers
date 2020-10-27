import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

import GlobalStyle from 'styles/GlobalStyle';
import { lightTheme } from 'styles/themes';
import { wrapper } from 'store/configureStore';

const App = ({ Component }: AppProps) => (
  <>
    <Head>
      <title>dev.readers</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <div id="modal-root" />
      <Component />
    </ThemeProvider>
  </>
);

export default wrapper.withRedux(App);
