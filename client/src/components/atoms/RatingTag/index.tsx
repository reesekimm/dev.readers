import React from 'react';

import { IReview } from '@types';
import * as S from './style';

export interface Props {
  [key: string]: unknown;
  rating: IReview.Rating;
}

function RatingTag({ rating, ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      <span role="img" aria-label="star emoji">
        ⭐
      </span>{' '}
      {rating} / 5
    </S.Container>
  );
}

export default RatingTag;
