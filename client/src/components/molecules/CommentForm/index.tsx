import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@features';
import { Button } from '@components';
import { IReview } from '@types';
import { useInput } from '@hooks';
import * as S from './style';
import { actions } from '../../../features/review';

interface Props {
  [key: string]: unknown;
  ReviewId: IReview.ReviewId;
}

function CommentForm({ ReviewId, ...props }: Props): React.ReactElement {
  const [comment, onChangeComment, setComment] = useInput<string>('');

  const dispatch = useDispatch();
  const myId = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentDone } = useSelector((state: RootState) => state.review);
  const { addComment } = useSelector((state: RootState) => state.loading);

  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(actions.addComment({ ReviewId, content: comment, UserId: myId }));
    },
    [comment, myId]
  );

  useEffect(() => {
    if (addCommentDone) setComment('');
  }, [addCommentDone]);

  return (
    <S.Form {...props} onSubmit={onSubmitComment}>
      <S.Textarea value={comment} onChange={onChangeComment} />
      <Button btnType="submit" isLoading={addComment} disabled={!comment}>
        작성
      </Button>
    </S.Form>
  );
}

export default CommentForm;
