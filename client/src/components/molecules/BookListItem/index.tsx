import React, { useMemo } from 'react';

import { Text, Img, Modal, WriteReviewTemplate } from '@components';
import { useModal } from '@hooks';
import { IBook } from '@types';
import * as S from './style';

function BookListItem(book: IBook.Book): React.ReactElement {
  const { title, author, pubDate, cover } = book;
  const { modalIsOpened, toggleModal } = useModal();

  const textStyle = useMemo(
    () => ({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      margin: 0,
      lineHeight: 1.2,
    }),
    []
  );

  return (
    <S.Container>
      <S.ImageContainer onClick={toggleModal}>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div onClick={toggleModal}>
        <Text tag="h2" fontSize="sm" fontWeight="medium" style={textStyle}>
          {title}
        </Text>
        <Text color="gray3" fontSize="xsm" style={textStyle}>
          {pubDate.slice(0, 4)} ・ {author.split(' 지음,')[0]}
        </Text>
      </div>
      <Modal
        title="리뷰 작성"
        modalSize="md"
        modalIsOpened={modalIsOpened}
        closeModal={toggleModal}
      >
        <WriteReviewTemplate {...book} />
      </Modal>
    </S.Container>
  );
}

export default BookListItem;
