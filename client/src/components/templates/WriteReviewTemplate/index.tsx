import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';

import { RootState } from '@features';
import { BookInfo, ReviewForm, Modal, FeedbackTemplate, ReviewDetailTemplate } from '@components';
import { useModal } from '@hooks';
import { IBook, IUser } from '@types';
import { actions } from '../../../features/review';
import * as S from './style';

interface Props {
  content: IBook.Book;
  /** template을 감싸고 있는 Modal을 닫는 callback */
  closeModal: () => void;
}

function WriteReviewTemplate({ content, closeModal }: Props): React.ReactElement {
  const bookInfo = { ...content, type: 'write' } as const;

  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();
  const { modalIsOpened: detailModalIsOpened, toggleModal: toggleDetailModal } = useModal();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { Review } = useSelector((state: RootState) => state.review);
  const { getReview } = useSelector((state: RootState) => state.loading);

  const [reviewInfo, setReviewInfo] = useState<IUser.Review | null>(null);

  useEffect(() => {
    const myReview = me?.Reviews.find((review: IUser.Review) => review.isbn13 === content.isbn13);
    if (myReview) {
      toggleFeedbackModal();
      setReviewInfo(myReview);
    }
  }, []);

  const onConfirm = useCallback(() => {
    /** 리뷰 상세 modal 열기 */
    toggleDetailModal();
    /** 리뷰 작성 modal 닫기 */
    const wrapper = document.getElementById('modal-root');
    wrapper.querySelector('.review_write').style.display = 'none';
  }, []);

  const callback = useCallback(() => {
    console.log(reviewInfo);
    if (reviewInfo) dispatch(actions.getReview(reviewInfo));
  }, [reviewInfo]);

  const onCloseReviewDetailModal = useCallback(() => {
    toggleDetailModal();
    dispatch(actions.clearReview());
  }, [dispatch, toggleDetailModal]);

  const [rate, setRate] = useState<number>();
  const onChangeRate = useCallback((value) => {
    setRate(value);
    console.log(value);
  }, []);

  return (
    <S.Container>
      <BookInfo {...bookInfo} />
      <Rate allowHalf allowClear value={rate} onChange={onChangeRate} />
      <ReviewForm style={{ flex: 1 }} />
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{ feedbackPhrase: '이미 리뷰를 작성하셨네요!', onConfirm }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
      <Modal
        modalFor="review_detail"
        modalSize="lg"
        content={Review}
        Template={ReviewDetailTemplate}
        modalIsOpened={detailModalIsOpened}
        closeModal={onCloseReviewDetailModal}
        apiCallback={callback}
        isLoading={getReview}
      />
    </S.Container>
  );
}

export default WriteReviewTemplate;
