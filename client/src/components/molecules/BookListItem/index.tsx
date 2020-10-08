import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Text, Img } from '@components';
import { IBook } from '@types';
import * as S from './style';
import { actions } from '../../../features/modal';

interface Props {
  [key: string]: unknown;
  book: IBook.Book;
  lastBookElementRef: unknown;
}

function BookListItem({ book, lastBookElementRef, ...props }: Props): React.ReactElement {
  const { title, author, pubDate, cover } = book;

  const dispatch = useDispatch();
  const openWriteReviewModal = useCallback(() => {
    dispatch(actions.openWriteReviewModal(book));
  }, []);

  return (
    <S.Container onClick={openWriteReviewModal} ref={lastBookElementRef} {...props}>
      <S.ImageContainer>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div>
        <Text tag="h2" fontSize="sm" fontWeight="medium">
          {title}
        </Text>
        <Text color="gray3" fontSize="xsm">
          {pubDate.slice(0, 4)} ・ {author.split(' 지음')[0]}
        </Text>
      </div>
    </S.Container>
  );
}

export default BookListItem;
