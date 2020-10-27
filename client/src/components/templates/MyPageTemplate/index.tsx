import React from 'react';
import Head from 'next/head';

import { BaseTemplate, Loading } from '@components';

interface Props {
  nickname: string;
  profile: React.ReactNode;
  tabs: React.ReactNode;
  reviewList: React.ReactNode;
  isLoading?: boolean;
  errorMessage: string | null;
}

function MyPageTemplate({
  nickname,
  profile,
  tabs,
  reviewList,
  isLoading = false,
  errorMessage,
}: Props): React.ReactElement {
  return (
    <>
      <Head>
        <title>dev.readers | {nickname}</title>
      </Head>
      <BaseTemplate>
        {errorMessage || (
          <>
            {profile}
            {tabs}
            {reviewList}
            {isLoading && <Loading />}
          </>
        )}
      </BaseTemplate>
    </>
  );
}

export default MyPageTemplate;
