import React from 'react';

import { IReview } from '@interfaces';
import { ReviewListItem } from '@components';
import * as S from './style';

interface Props {
  reviews: React.ReactNode;
}

function ReviewList({ reviews }: Props): React.ReactElement {
  return (
    <S.Container>
      {reviews.map((review: IReview.Review) => (
        <ReviewListItem key={review.id} type="list" {...review} />
      ))}
    </S.Container>
  );
}

export default ReviewList;
