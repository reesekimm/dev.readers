import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Text, Img } from 'components';
import { IBook } from 'common/types';
import { actions } from 'features/modal';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  book: IBook.Book;
}

function BookListItem({ book, ...props }: Props): React.ReactElement {
  const { title, author, pubDate, cover } = book;

  const dispatch = useDispatch();
  const openWriteReviewModal = useCallback(() => {
    dispatch(actions.openWriteReviewModal(book));
  }, []);

  return (
    <S.Container onClick={openWriteReviewModal} {...props}>
      <S.ImageContainer>
        <Img src={cover || ''} alt={title} />
      </S.ImageContainer>
      <div>
        <Text tag="h2" fontSize="sm" fontWeight="medium">
          {title}
        </Text>
        <Text color="gray3" fontSize="xsm">
          <>
            {pubDate.slice(0, 4)} ・ {author.split(' 지음')[0]}
          </>
        </Text>
      </div>
    </S.Container>
  );
}

export default BookListItem;
