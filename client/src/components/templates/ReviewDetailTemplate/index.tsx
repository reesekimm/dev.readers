import React from 'react';

import { Text, BookInfo, Divider, ReviewActionBar, CommentForm, Comment } from '@components';
import { IReview } from '@types';
import * as S from './style';

function ReviewDetailTemplate({
  id,
  User,
  Book,
  rating,
  content,
  createdAt,
  Comments,
  Likers,
}: IReview.Review): React.ReactElement {
  const bookInfo = { ...Book, type: 'detailed', rating } as const;

  return (
    <S.Container>
      <S.ReviewContainer>
        <BookInfo {...bookInfo} />
        <S.Content>{content}</S.Content>
        <ReviewActionBar
          id={id}
          User={User}
          createdAt={createdAt}
          NumberOfComments={Comments.length}
          NumberOfLikes={Likers.length}
        />
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
