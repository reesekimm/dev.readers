import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Text, BookInfo, ReviewActionBar } from '@components';
import { IReview } from '@types';
import * as S from './style';
import { actions } from '../../../features/modal';

function ReviewListItem(review: IReview.Review): React.ReactElement {
  const { id, User, Book, rating, content, createdAt, Comments, Likers } = review;

  const bookInfo = { ...Book, rating } as const;

  const dispatch = useDispatch();
  const openReviewDetailModal = useCallback(() => {
    dispatch(actions.openReviewDetailModal(review));
  }, []);

  return (
    <S.Container>
      <S.Content onClick={openReviewDetailModal}>
        <BookInfo {...bookInfo} />
        {content.length > 200 ? (
          <Text color="gray5">
            {`${content.slice(0, 200)}...`}{' '}
            <Text color="gray3" fontSize="xsm" fontWeight="medium">
              더보기
            </Text>
          </Text>
        ) : (
          <Text color="gray5">{content}</Text>
        )}
      </S.Content>
      <ReviewActionBar
        id={id}
        User={User}
        createdAt={createdAt}
        NumberOfComments={Comments.length}
        NumberOfLikes={Likers.length}
        onClickComment={openReviewDetailModal}
      />
    </S.Container>
  );
}

export default ReviewListItem;
