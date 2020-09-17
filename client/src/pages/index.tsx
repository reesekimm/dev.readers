import React from 'react';
import Head from 'next/head';

import { BaseTemplate, Text, Button } from '@components';

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
        <Button>primary button</Button>
        <Button styleType="secondary">secondary button</Button>
        <Button styleType="plain">plain button</Button>
        <Button styleType="bordered">bordered button</Button>
        <Button styleType="plain" href="https://github.com/reesekimm" type="exLink">
          external link
        </Button>
        <Button styleType="plain" type="inLink" href="/profile">
          internal routing
        </Button>
      </BaseTemplate>
    </>
  );
}

export default Main;
