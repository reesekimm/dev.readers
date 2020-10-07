import React from 'react';

import { Text, BookInfo, ReviewActionBar, Modal, ReviewDetailTemplate } from '@components';
import { useModal } from '@hooks';
import { IReview } from '@types';
import * as S from './style';

function ReviewListItem(review: IReview.Review): React.ReactElement {
  const { id, User, Book, rating, content, createdAt, Comments, Likers } = review;
  const { modalIsOpened, toggleModal } = useModal();

  const bookInfo = { ...Book, rating } as const;

  return (
    <S.Container>
      <S.Content onClick={toggleModal}>
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
        onClickComment={toggleModal}
      />
      <Modal
        modalFor="review_detail"
        modalSize="lg"
        content={review}
        Template={ReviewDetailTemplate}
        modalIsOpened={modalIsOpened}
        closeModal={toggleModal}
      />
    </S.Container>
  );
}

export default ReviewListItem;
