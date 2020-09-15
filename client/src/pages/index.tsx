import React from 'react';
import Head from 'next/head';

import { BaseTemplate, Text } from '@components';

function Main(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers</title>
      </Head>
      <BaseTemplate>
        <Text tag="h1" color="primary" fontFamily="logo">
          h1 heading
        </Text>
        <Text tag="h2" color="secondary">
          h2 heading
        </Text>
        <Text tag="h3" color="success">
          h3 heading
        </Text>
        <Text color="danger">default span</Text>
      </BaseTemplate>
    </>
  );
}

export default Main;
