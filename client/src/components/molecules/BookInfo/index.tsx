import React from 'react';
import { Rate } from 'antd';

import { Text, Button, Img } from '@components';
import { IBook } from '@types';
import * as S from './style';

interface Props extends IBook.Book {
  [key: string]: unknown;
  type?: 'list' | 'detailed' | 'write';
  rating?: number;
}

function BookInfo({
  title,
  author,
  publisher,
  pubDate,
  cover,
  rating,
  link,
  type = 'list',
  ...props
}: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      <S.ImageContainer>
        <Img src={cover} alt={title} />
      </S.ImageContainer>
      <div>
        <S.TextContainer>
          <Text tag="h2" fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          <Text color="gray3" fontSize="xsm">
            {pubDate.slice(0, 4)}
          </Text>
        </S.TextContainer>
        {type !== 'list' && (
          <>
            <S.TextContainer>
              <Text fontSize="xsm">{author.split(' 지음')[0]}</Text>
              <Text fontSize="xsm">{publisher}</Text>
            </S.TextContainer>
            <Button href={link} type="exLink" styleType="plain">
              자세히 보기
            </Button>
          </>
        )}
        {type !== 'write' && <Rate disabled defaultValue={rating} allowHalf />}
      </div>
    </S.Container>
  );
}

export default BookInfo;
