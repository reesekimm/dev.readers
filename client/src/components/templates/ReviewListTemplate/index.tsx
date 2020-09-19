import React from 'react';
import { BaseTemplate } from '@components';
import * as S from './style';

interface Props {
  reviews: React.ReactNode;
}

function ReviewListTemplate({ reviews }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      <S.Container>{reviews}</S.Container>
    </BaseTemplate>
  );
}

export default ReviewListTemplate;
