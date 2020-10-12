import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@features';
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

  const { me } = useSelector((state: RootState) => state.user);
  const { mainReviews } = useSelector((state: RootState) => state.review);

  const [comments, setComments] = useState(Comments);
  useEffect(() => {
    const latestCommentList = mainReviews.find((review) => review.id === id).Comments;
    setComments(latestCommentList);
  }, [mainReviews]);

  return (
    <S.Container>
      <S.ReviewContainer>
        <BookInfo {...bookInfo} />
        <S.Content>{data}</S.Content>
        <ReviewActionBar type="detail" content={content} />
      </S.ReviewContainer>
      <S.CommentContainer>
        <div>
          <Text>{comments.length}</Text>
          <Text color="gray4" fontSize="xsm">
            개의 댓글
          </Text>
        </div>
        <Divider />
        {comments.length ? (
          <S.CommentList>
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </S.CommentList>
        ) : (
          <S.NoComment>첫 번째 댓글을 남겨보세요!</S.NoComment>
        )}
        <Divider />
        {me && <CommentForm ReviewId={id} />}
      </S.CommentContainer>
    </S.Container>
  );
}

export default ReviewDetailTemplate;
