import React from 'react';

import { IBook, IReview } from '@interfaces';
import { BaseTemplate, BookList, ReviewList, Search, Text } from '@components';

interface Props {
  books: IBook.Books;
  reviews: IReview.Reviews;
}

function SearcAllTemplate({ books, reviews }: Props): React.ReactElement {
  return (
    <BaseTemplate>
      <Search />
      <Text fontSize="lg">도서</Text>
      <BookList books={books} />
      <Text fontSize="lg">리뷰</Text>
      <ReviewList reviews={reviews} />
    </BaseTemplate>
  );
}

export default SearcAllTemplate;
