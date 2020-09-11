import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function App({ Component }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <Component />
    </>
  );
}

export default App;
