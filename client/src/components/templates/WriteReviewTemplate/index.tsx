import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rate } from 'antd';

import { RootState } from '@features';
import { BookInfo, ReviewForm, Modal, FeedbackTemplate, ReviewDetailTemplate } from '@components';
import { useModal } from '@hooks';
import { IBook, IUser } from '@types';
import * as S from './style';

function WriteReviewTemplate({ ...content }: IBook.Book): React.ReactElement {
  const bookInfo = { ...content, type: 'write' } as const;

  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();
  const { modalIsOpened, toggleModal } = useModal();

  const { me } = useSelector((state: RootState) => state.user);

  const [reviewInfo, setReviewInfo] = useState<IUser.Review | null>(null);

  useEffect(() => {
    const myReview = me?.Reviews.find((review: IUser.Review) => review.isbn13 === content.isbn13);
    if (myReview) {
      toggleFeedbackModal();
      setReviewInfo(myReview);
    }
  }, [me.Reviews]);

  const onConfirm = useCallback(() => {
    console.log('confirm');
    toggleFeedbackModal();
    // TODO: 리뷰 작성 모달 닫기
    toggleModal();
  }, [toggleFeedbackModal, toggleModal]);

  const callback = useCallback(() => {
    console.log(reviewInfo);
  }, [reviewInfo]);

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
        modalFor="알림"
        modalSize="sm"
        content={{ feedback: '이미 리뷰를 작성하셨어요!', onConfirm }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
      />
      <Modal
        modalFor="리뷰 상세"
        modalSize="lg"
        content={null}
        Template={ReviewDetailTemplate}
        modalIsOpened={modalIsOpened}
        closeModal={toggleModal}
        apiCallback={callback}
      />
    </S.Container>
  );
}

export default WriteReviewTemplate;
