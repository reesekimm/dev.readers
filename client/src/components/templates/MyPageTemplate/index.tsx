import React from 'react';

import { BaseTemplate, Loading } from '@components';

interface Props {
  profile: React.ReactNode;
  tabs: React.ReactNode;
  reviewList: React.ReactNode;
  isLoading?: boolean;
  errorMessage: string;
}

function MyPageTemplate({
  profile,
  tabs,
  reviewList,
  isLoading = false,
  errorMessage,
}: Props): React.ReactElement {
  return (
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
  );
}

export default MyPageTemplate;
