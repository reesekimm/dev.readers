import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@features';
import { Header, Footer, Modal, WriteReviewTemplate, ReviewDetailTemplate } from '@components';
import * as S from './style';
import { actions } from '../../../features/modal';

interface Props {
  children: React.ReactNode;
}

function BeseTemplate({ children }: Props): React.ReactElement {
  const dispatch = useDispatch();
  const { Review } = useSelector((state: RootState) => state.review);
  const {
    writeReviewModal: { isOpened: writeReviewModalIsOpened, data: writeReviewData },
    reviewDetailModal: { isOpened: reviewDetailModalIsOpened, data: reviewDetailData },
  } = useSelector((state: RootState) => state.modal);
  const { getReview } = useSelector((state: RootState) => state.loading);

  const closeWriteReviewModal = useCallback(() => {
    dispatch(actions.closeWriteReviewModal());
  }, []);

  const closeReviewDetailModal = useCallback(() => {
    dispatch(actions.closeReviewDetailModal());
  }, []);

  return (
    <S.Container>
      <Header />
      <S.Content>{children}</S.Content>
      <Footer />
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
