import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { MESSAGES } from 'common/constants';
import { RootState } from 'features';
import {
  Header,
  Footer,
  Modal,
  WriteReviewTemplate,
  ReviewDetailTemplate,
  LoginTemplate,
} from 'components';
import { actions as modalActions } from 'features/modal';
import { actions as reviewActions } from 'features/review';
import * as S from './style';

interface Props {
  children: React.ReactNode;
}

function BeseTemplate({ children }: Props): React.ReactElement {
  const dispatch = useDispatch();

  const {
    Review,
    addReviewDone,
    addReviewError,
    editReviewDone,
    editReviewError,
    deleteReviewDone,
    deleteReviewError,
  } = useSelector((state: RootState) => state.review);

  const {
    loginModal: { isOpened: loginModalIsOpened },
    writeReviewModal: { isOpened: writeReviewModalIsOpened, data: writeReviewData },
    reviewDetailModal: { isOpened: reviewDetailModalIsOpened },
  } = useSelector((state: RootState) => state.modal);

  const { getReview } = useSelector((state: RootState) => state.loading);

  const closeLoginModal = useCallback(() => {
    dispatch(modalActions.closeLoginModal());
  }, []);

  const closeWriteReviewModal = useCallback(() => {
    dispatch(modalActions.closeWriteReviewModal());
  }, []);

  const closeReviewDetailModal = useCallback(() => {
    dispatch(modalActions.closeReviewDetailModal());
  }, []);

  useEffect(() => {
    if (addReviewDone) {
      message.success(MESSAGES.ADD_REVIEW_SUCCESS, 1);
      dispatch(reviewActions.resetAddReviewState());
      return;
    }
    if (addReviewError) {
      message.error(MESSAGES.ERROR, 1);
      dispatch(reviewActions.resetAddReviewState());
      return;
    }
    if (editReviewDone) {
      message.success(MESSAGES.EDIT_REVIEW_SUCCESS, 1);
      dispatch(reviewActions.resetEditReviewState());
      return;
    }
    if (editReviewError) {
      message.error(MESSAGES.ERROR, 1);
      dispatch(reviewActions.resetEditReviewState());
      return;
    }
    if (deleteReviewDone) {
      message.success(MESSAGES.DELETE_REVIEW_SUCCESS, 1);
      dispatch(reviewActions.resetDeleteReviewState());
      return;
    }
    if (deleteReviewError) {
      message.error(MESSAGES.ERROR, 1);
      dispatch(reviewActions.resetDeleteReviewState());
    }
  }, [
    addReviewDone,
    addReviewError,
    editReviewDone,
    editReviewError,
    deleteReviewDone,
    deleteReviewError,
  ]);

  return (
    <S.Container>
      <Header />
      <S.Content>{children}</S.Content>
      <Footer />
      <Modal
        modalFor="login"
        modalSize="md"
        content
        Template={LoginTemplate}
        modalIsOpened={loginModalIsOpened}
        closeModal={closeLoginModal}
      />
      <Modal
        modalFor="review_write"
        modalSize="md"
        content={writeReviewData}
        Template={WriteReviewTemplate}
        modalIsOpened={writeReviewModalIsOpened}
        closeModal={closeWriteReviewModal}
      />
      <Modal
        modalFor="review_detail"
        modalSize="lg"
        content={Review}
        Template={ReviewDetailTemplate}
        modalIsOpened={reviewDetailModalIsOpened}
        closeModal={closeReviewDetailModal}
        isLoading={getReview}
      />
    </S.Container>
  );
}

export default BeseTemplate;
