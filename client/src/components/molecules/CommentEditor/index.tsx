import React, { useCallback } from 'react';
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
  CommentId: number;
  content: string;
  onCloseCommentEditor: () => void;
}

function CommentEditor({
  ReviewId,
  CommentId,
  content,
  onCloseCommentEditor,
  ...props
}: Props): React.ReactElement {
  const [comment, onChangeComment, setComment] = useInput<string>(content);

  const dispatch = useDispatch();
  const { editComment } = useSelector((state: RootState) => state.loading);

  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(actions.editComment({ ReviewId, CommentId, content: comment }));
      onCloseCommentEditor();
    },
    [comment]
  );

  return (
    <S.Form {...props} onSubmit={onSubmitComment}>
      <S.Textarea value={comment} onChange={onChangeComment} />
      <S.ButtonContainer>
        <Button styleType="bordered" onClick={onCloseCommentEditor}>
          취소
        </Button>
        <Button styleType="primary" btnType="submit" isLoading={editComment} disabled={!comment}>
          수정
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
}

export default CommentEditor;
