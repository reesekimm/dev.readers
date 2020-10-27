import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'features';
import { IReview } from 'common/types';
import { ReviewListItem } from 'components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  reviews: IReview.Reviews;
  lastReviewElementRef: ((node: HTMLDivElement | null) => void) | null;
}

function ReviewList({ reviews, lastReviewElementRef, ...props }: Props): React.ReactElement {
  const { mainReviews } = useSelector((state: RootState) => state.review);

  return (
    <S.Container {...props}>
      {reviews &&
        reviews.map((review: IReview.Review) => (
          <ReviewListItem
            key={review.id}
            review={review}
            lastReviewElementRef={
              review.id === mainReviews[mainReviews.length - 1]?.id ? lastReviewElementRef : null
            }
            data-reviewid={review.id === mainReviews[mainReviews.length - 1]?.id ? review.id : null}
          />
        ))}
    </S.Container>
  );
}

export default ReviewList;
