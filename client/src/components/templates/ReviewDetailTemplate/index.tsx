import React from 'react';

import { Text, BookInfo, Divider, ReviewActionBar, CommentForm, Comment } from '@components';
import { IReview } from '@types';
import * as S from './style';

interface Props {
  content: IReview.Review;
  closeModal: () => void;
}

function ReviewDetailTemplate({ content, closeModal }: Props): React.ReactElement {
  const { id, User, Book, rating, content: data, createdAt, Comments, Likers } = content;
  const bookInfo = { ...Book, type: 'detailed', rating } as const;

  return (
    <S.Container>
      <S.ReviewContainer>
        <BookInfo {...bookInfo} />
        <S.Content>{data}</S.Content>
        <ReviewActionBar type="detail" content={content} />
      </S.ReviewContainer>
      <S.CommentContainer>
        <div>
          <Text>{Comments.length}</Text>
          <Text color="gray4" fontSize="xsm">
            개의 댓글
          </Text>
        </div>
        <Divider />
        {Comments.length ? (
          <S.CommentList>
            {Comments.map((comment) => (
              <Comment {...comment} />
            ))}
          </S.CommentList>
        ) : (
          <S.NoComment>첫 번째 댓글을 남겨보세요!</S.NoComment>
        )}
        <Divider />
        <CommentForm ReviewId={id} />
      </S.CommentContainer>
    </S.Container>
  );
}

export default ReviewDetailTemplate;
