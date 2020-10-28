import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { EMPTY } from 'common/constants';
import { RootState } from 'features';
import { Text, BookInfo, Divider, ReviewActionBar, CommentForm, Comment } from 'components';
import { IReview } from 'common/types';
import * as S from './style';

interface Props {
  content: IReview.Review;
  closeModal: () => void;
}

function ReviewDetailTemplate({ content, closeModal }: Props): React.ReactElement {
  const { id, Book, rating, content: data, Comments } = content;
  const bookInfo = { ...Book, type: 'detailed', rating } as const;

  const { mainReviews } = useSelector((state: RootState) => state.review);

  const [comments, setComments] = useState(Comments);
  useEffect(() => {
    const latestCommentList = mainReviews.find((review: IReview.Review) => review.id === id)
      ?.Comments;
    if (latestCommentList) setComments(latestCommentList);
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
          <S.NoComment>{EMPTY.NO_COMMENT}</S.NoComment>
        )}
        <Divider />
        <CommentForm ReviewId={id} />
      </S.CommentContainer>
    </S.Container>
  );
}

export default ReviewDetailTemplate;
