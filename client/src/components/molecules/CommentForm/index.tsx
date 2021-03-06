import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FEEDBACK_PHRASES } from 'common/constants';
import { RootState } from 'features';
import { Button, Modal, FeedbackTemplate } from 'components';
import { IReview } from 'common/types';
import { useInput, useModal } from 'hooks';
import { actions as reviewActions } from 'features/review';
import { actions as modalActions } from 'features/modal';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  ReviewId: IReview.ReviewId;
}

function CommentForm({ ReviewId, ...props }: Props): React.ReactElement {
  const [comment, onChangeComment, setComment] = useInput('');
  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { addCommentDone } = useSelector((state: RootState) => state.review);
  const { addComment } = useSelector((state: RootState) => state.loading);

  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!me) {
        dispatch(modalActions.openLoginModal());
        return;
      }
      comment
        ? dispatch(reviewActions.addComment({ ReviewId, content: comment.toString() }))
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
        content={{
          feedbackPhrase: FEEDBACK_PHRASES.REQUEST_COMMENT,
          onConfirm: toggleFeedbackModal,
        }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
    </S.Form>
  );
}

export default CommentForm;
