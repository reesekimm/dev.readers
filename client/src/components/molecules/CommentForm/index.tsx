import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@features';
import { Button, Modal, FeedbackTemplate } from '@components';
import { IReview } from '@types';
import { useInput, useModal } from '@hooks';
import * as S from './style';
import { actions } from '../../../features/review';

interface Props {
  [key: string]: unknown;
  ReviewId: IReview.ReviewId;
}

function CommentForm({ ReviewId, ...props }: Props): React.ReactElement {
  const [comment, onChangeComment, setComment] = useInput<string>('');
  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state: RootState) => state.review);
  const { addComment } = useSelector((state: RootState) => state.loading);

  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      comment
        ? dispatch(actions.addComment({ ReviewId, content: comment }))
        : toggleFeedbackModal();
    },
    [comment]
  );

  useEffect(() => {
    if (addCommentDone) setComment('');
  }, [addCommentDone]);

  return (
    <S.Form {...props} onSubmit={onSubmitComment}>
      <S.Textarea value={comment} onChange={onChangeComment} />
      <Button btnType="submit" isLoading={addComment}>
        작성
      </Button>
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{ feedbackPhrase: '댓글을 작성해 주세요.', onConfirm: toggleFeedbackModal }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
    </S.Form>
  );
}

export default CommentForm;
