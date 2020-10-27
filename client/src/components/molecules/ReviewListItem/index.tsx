import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Text, BookInfo, ReviewActionBar } from '@components';
import { IReview } from '@types';
import { utils } from '@common';
import * as S from './style';
import { actions } from '../../../features/modal';

interface Props {
  [key: string]: unknown;
  review: IReview.Review;
  lastReviewElementRef: ((node: HTMLDivElement | null) => void) | null;
}

function ReviewListItem({ review, lastReviewElementRef, ...props }: Props): React.ReactElement {
  const { id, Book, rating, content } = review;

  const bookInfo = { ...Book, rating } as const;

  const dispatch = useDispatch();
  const openReviewDetailModal = useCallback(() => {
    dispatch(actions.openReviewDetailModal(id));
  }, []);

  return (
    <S.Container ref={lastReviewElementRef} {...props}>
      <S.ContentWrapper onClick={openReviewDetailModal}>
        <BookInfo {...bookInfo} />
        <S.Content>
          <Text color="gray5">{utils.truncateText(content).result}</Text>
          {utils.truncateText(content).more && (
            <Text color="gray3" fontSize="xsm" fontWeight="medium">
              더보기
            </Text>
          )}
        </S.Content>
      </S.ContentWrapper>
      <ReviewActionBar type="list" content={review} onClickComment={openReviewDetailModal} />
    </S.Container>
  );
}

export default ReviewListItem;
