import React from 'react';
import Head from 'next/head';

import { BaseTemplate } from '../components';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers | Main</title>
      </Head>
      <BaseTemplate>Main</BaseTemplate>
    </>
  );
}

export default Main;
