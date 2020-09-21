import React, { useMemo } from 'react';

import { IBook } from '@types';
import { Text, Img } from '@components';
import * as S from './style';

type Props = Pick<IBook.Book, 'title' | 'author' | 'pubDate' | 'cover'>;

function BookListItem({ title, author, pubDate, cover }: Props): React.ReactElement {
  const textStyle = useMemo(
    () => ({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      margin: 0,
    }),
    []
  );

  return (
    <S.Container>
      <S.ImageContainer>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div>
        <Text tag="h2" fontSize="sm" fontWeight="medium" style={textStyle}>
          {title}
        </Text>
        <Text color="gray3" fontSize="xsm" style={textStyle}>
          {pubDate.slice(0, 4)} ・ {author.split(' 지음,')[0]}
        </Text>
      </div>
    </S.Container>
  );
}

export default BookListItem;
