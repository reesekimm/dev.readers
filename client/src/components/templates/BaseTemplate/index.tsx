import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import { RootState } from '@features';
import {
  Header,
  Footer,
  Modal,
  WriteReviewTemplate,
  ReviewDetailTemplate,
  LoginTemplate,
} from '@components';
import * as S from './style';
import { actions } from '../../../features/modal';
import { actions as reviewActions } from '../../../features/review';

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
    reviewDetailModal: { isOpened: reviewDetailModalIsOpened, data: reviewDetailData },
  } = useSelector((state: RootState) => state.modal);

  const { getReview } = useSelector((state: RootState) => state.loading);

  const closeLoginModal = useCallback(() => {
    dispatch(actions.closeLoginModal());
  }, []);

  const closeWriteReviewModal = useCallback(() => {
    dispatch(actions.closeWriteReviewModal());
  }, []);

  const closeReviewDetailModal = useCallback(() => {
    dispatch(actions.closeReviewDetailModal());
  }, []);

  useEffect(() => {
    if (addReviewDone)
      message.success('리뷰 작성 완료!', 1).then(() => {
        dispatch(reviewActions.resetAddReviewState());
      });
    if (addReviewError)
      message.error('리뷰 작성 실패', 1).then(() => {
        dispatch(reviewActions.resetAddReviewState());
      });
    if (editReviewDone)
      message.success('리뷰 수정 완료!', 1).then(() => {
        dispatch(reviewActions.resetEditReviewState());
      });
    if (editReviewError)
      message.error('리뷰 수정 실패', 1).then(() => {
        dispatch(reviewActions.resetEditReviewState());
      });
    if (deleteReviewDone)
      message.success('리뷰 삭제 완료!', 1).then(() => {
        dispatch(reviewActions.resetDeleteReviewState());
      });
    if (deleteReviewError)
      message.error('리뷰 삭제 실패', 1).then(() => {
        dispatch(reviewActions.resetDeleteReviewState());
      });
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
        content={Review || reviewDetailData}
        Template={ReviewDetailTemplate}
        modalIsOpened={reviewDetailModalIsOpened}
        closeModal={closeReviewDetailModal}
        isLoading={getReview}
      />
    </S.Container>
  );
}

export default BeseTemplate;
