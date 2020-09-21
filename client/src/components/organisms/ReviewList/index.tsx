import React from 'react';

import { IReview } from '@types';
import { ReviewListItem } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  reviews: React.ReactNode;
}

function ReviewList({ reviews, ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      {reviews.map((review: IReview.Review) => (
        <ReviewListItem key={review.id} type="list" {...review} />
      ))}
    </S.Container>
  );
}

export default ReviewList;
