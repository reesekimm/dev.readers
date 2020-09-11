import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/layouts/AppLayout';

function Home(): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers | Home</title>
      </Head>
      <AppLayout>Home</AppLayout>
    </>
  );
}

export default Home;
