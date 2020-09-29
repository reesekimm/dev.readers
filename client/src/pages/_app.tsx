import React from 'react';
import Head from 'next/head';
import App, { AppInitialProps, AppContext } from 'next/app';
import { END } from 'redux-saga';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

import GlobalStyle from '../styles/GlobalStyle';
import { lightTheme } from '../styles/themes';
import { SagaStore, wrapper } from '../store/configureStore';

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };

    if (ctx.req) {
      ctx.store.dispatch(END);
      await (ctx.store as SagaStore).sagaTask.toPromise();
    }

    return {
      pageProps,
    };
  };

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>dev.readers</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <div id="feedback-modal-root" />
          <div id="modal-root" />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
