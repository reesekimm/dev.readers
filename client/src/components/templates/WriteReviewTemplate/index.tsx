import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';

import { RootState } from '@features';
import { BookInfo, ReviewForm, Modal, FeedbackTemplate, ReviewDetailTemplate } from '@components';
import { useModal, useInput } from '@hooks';
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
  const { addReview, getReview } = useSelector((state: RootState) => state.loading);

  const [reviewInfo, setReviewInfo] = useState<IUser.Review | null>(null);

  /** 작성된 리뷰가 있는지 확인 후 피드백 */
  useEffect(() => {
    const myReview = me?.Reviews.find((review: IUser.Review) => review.isbn13 === content.isbn13);
    if (myReview) {
      toggleFeedbackModal();
      setReviewInfo(myReview);
    }
  }, []);

  /** 작성된 리뷰가 있을 경우 */

  /** [feedback modal] '확인' 버튼 콜백 */
  const onConfirm = useCallback(() => {
    // 리뷰 상세 modal 열기
    toggleDetailModal();
    // 리뷰 작성 modal 닫기 (숨기기)
    const wrapper = document.getElementById('modal-root');
    wrapper.querySelector('.review_write').style.display = 'none';
  }, []);

  /** [review detail modal] 리뷰 가져오기 */
  const callback = useCallback(() => {
    console.log(reviewInfo);
    if (reviewInfo) dispatch(actions.getReview(reviewInfo));
  }, [reviewInfo]);

  /** [review detail modal] '닫기' 버튼 콜백 */
  const onCloseReviewDetailModal = useCallback(() => {
    closeModal();
    dispatch(actions.clearReview());
  }, [dispatch, closeModal]);

  /** 작성된 리뷰가 없을 경우 (리뷰 작성 OR 수정) */

  const [rating, setRating] = useState<number>();
  const [text, onChangeText] = useInput('');

  const onChangeRate = useCallback((value) => {
    setRating(value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(actions.addReview({ Book: content, rating, content: text }));
    closeModal();
  }, [text, rating]);

  return (
    <S.Container>
      <BookInfo {...bookInfo} />
      <Rate allowHalf allowClear value={rating} onChange={onChangeRate} />
      <ReviewForm
        value={text}
        onChange={onChangeText}
        onSubmit={onSubmit}
        submitButtonText="작성"
        buttonDisabled={!rating || !text}
        isLoading={addReview}
        style={{ flex: 1 }}
      />
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{ feedbackPhrase: '이미 작성하신 리뷰가 있어요!', onConfirm }}
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
