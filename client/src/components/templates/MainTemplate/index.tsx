import React from 'react';

import { BaseTemplate, Loading } from 'components';

interface Props {
  reviewList: React.ReactNode;
  isLoading?: boolean;
}

function MainTemplate({ reviewList, isLoading = false }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {reviewList}
      {isLoading && <Loading />}
    </BaseTemplate>
  );
}

export default MainTemplate;
