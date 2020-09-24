import React from 'react';

import { BaseTemplate } from '@components';

interface Props {
  reviewList: React.ReactNode;
}

function MainTemplate({ reviewList }: Props): React.ReactElement {
  return <BaseTemplate>{reviewList}</BaseTemplate>;
}

export default MainTemplate;
