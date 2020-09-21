import React from 'react';

import { BaseTemplate, Text, Button, Divider } from '@components';
import * as S from './style';

interface Props {
  searchBar: React.ReactNode;
  bookList: React.ReactNode;
  reviewList: React.ReactNode;
}

function SearcAllTemplate({
  searchBar,
  bookList = null,
  reviewList = null,
}: Props): React.ReactElement {
  return (
    <BaseTemplate>
      {searchBar}
      <S.SubtitleContainer>
        <Text fontSize="md" fontWeight="bold">
          도서
        </Text>
        <Button styleType="plain">더보기</Button>
      </S.SubtitleContainer>
      {bookList}
      <Divider style={{ marginTop: '3rem' }} />
      <S.SubtitleContainer>
        <Text fontSize="md" fontWeight="bold">
          리뷰
        </Text>
        <Button styleType="plain">더보기</Button>
      </S.SubtitleContainer>
      {reviewList}
    </BaseTemplate>
  );
}

export default SearcAllTemplate;
