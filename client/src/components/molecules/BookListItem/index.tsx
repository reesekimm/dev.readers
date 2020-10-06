import React from 'react';

import { Text, Img, Modal, WriteReviewTemplate } from '@components';
import { useModal } from '@hooks';
import { IBook } from '@types';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  book: IBook.Book;
  lastBookElementRef: unknown;
}

function BookListItem({ book, lastBookElementRef, ...props }: Props): React.ReactElement {
  const { title, author, pubDate, cover } = book;
  const { modalIsOpened, toggleModal } = useModal();

  return (
    <S.Container ref={lastBookElementRef} {...props}>
      <S.ImageContainer onClick={toggleModal}>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div onClick={toggleModal}>
        <Text tag="h2" fontSize="sm" fontWeight="medium">
          {title}
        </Text>
        <Text color="gray3" fontSize="xsm">
          {pubDate.slice(0, 4)} ・ {author.split(' 지음')[0]}
        </Text>
      </div>
      <Modal
        modalFor="review_write"
        modalSize="md"
        content={book}
        Template={WriteReviewTemplate}
        modalIsOpened={modalIsOpened}
        closeModal={toggleModal}
      />
    </S.Container>
  );
}

export default BookListItem;
