import React from 'react';

import { IBook, IReview } from '@interfaces';
import { BaseTemplate, BookList, ReviewList, Search, Text, Button, Divider } from '@components';
import * as S from './style';

interface Props {
  books: IBook.Books;
  reviews: IReview.Reviews;
}

function SearcAllTemplate({ books, reviews }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      <Search style={{ margin: '2rem auto 1rem' }} />
      <S.SubtitleContainer>
        <Text fontSize="md" fontWeight="bold">
          도서
        </Text>
        <Button styleType="plain">더보기</Button>
      </S.SubtitleContainer>
      <BookList books={books} />
      <Divider style={{ marginTop: '3rem' }} />
      <S.SubtitleContainer>
        <Text fontSize="md" fontWeight="bold">
          리뷰
        </Text>
        <Button styleType="plain">더보기</Button>
      </S.SubtitleContainer>
      <ReviewList reviews={reviews} />
    </BaseTemplate>
  );
}

export default SearcAllTemplate;
