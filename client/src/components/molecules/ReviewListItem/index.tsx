import React, { useCallback, useState } from 'react';
import { HeartOutlined, HeartTwoTone, MessageOutlined } from '@ant-design/icons';

import { Text, BookInfo, Modal } from '@components';
import { useModal } from '@hooks';
import { IReview } from '@types';
import * as S from './style';

interface Props extends IReview.Review {
  type: string;
}

function ReviewListItem({ id, User, Book, type, rating, content }: Props): React.ReactElement {
  const [liked, setLiked] = useState(false);
  const { modalIsOpened, toggleModal } = useModal();

  const bookInfo = { ...Book, type, rating } as const;

  const toggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <S.Container>
      <BookInfo {...bookInfo} />
      <S.Content onClick={toggleModal}>
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
      <S.Actions>
        <Text color="gray4" fontSize="xsm" fontWeight="medium">
          {User.nickname}
        </Text>
        <div>
          <MessageOutlined key="comment" onClick={toggleModal} />
          {liked ? (
            <HeartTwoTone key="heart" twoToneColor="#eb2f96" onClick={toggleLiked} />
          ) : (
            <HeartOutlined key="like" onClick={toggleLiked} />
          )}
        </div>
      </S.Actions>
      <Modal modalSize="lg" modalIsOpened={modalIsOpened} closeModal={toggleModal}>
        {content}
      </Modal>
    </S.Container>
  );
}

export default ReviewListItem;
