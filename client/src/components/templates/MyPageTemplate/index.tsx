import React from 'react';

import { BaseTemplate, Loading } from '@components';

interface Props {
  profile: React.ReactNode;
  tabs: React.ReactNode;
  reviewList: React.ReactNode;
  isLoading?: boolean;
}

function MyPageTemplate({
  profile,
  tabs,
  reviewList,
  isLoading = false,
}: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {profile}
      {tabs}
      {isLoading ? <Loading /> : reviewList}
    </BaseTemplate>
  );
}

export default MyPageTemplate;
