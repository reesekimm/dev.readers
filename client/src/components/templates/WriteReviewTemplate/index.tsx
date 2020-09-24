import React from 'react';
import { Rate } from 'antd';

import { BookInfo, ReviewForm } from '@components';
import { IBook } from '@types';
import * as S from './style';

function WriteReviewTemplate({ ...book }: IBook.Book): React.ReactElement {
  const bookInfo = { ...book, type: 'write' } as const;

  return (
    <S.Container>
      <BookInfo {...bookInfo} />
      <Rate allowHalf allowClear />
      <ReviewForm style={{ flex: 1 }} />
    </S.Container>
  );
}

export default WriteReviewTemplate;
