import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { RootState } from '@features';
import { Button, Text, BookInfo, ReviewForm, Modal, FeedbackTemplate } from '@components';
import { useModal, useInput } from '@hooks';
import { IBook, IUser, IReview } from '@types';
import { actions } from '../../../features/review';
import { actions as modalActions } from '../../../features/modal';
import * as S from './style';

interface Props {
  content: IBook.Book | IReview.ReviewInfo;
  /** template을 감싸고 있는 Modal을 닫는 callback */
  closeModal: () => void;
}

const githubAuthLink = `${process.env.NEXT_PUBLIC_DEV_API}/user/auth/github`;

function WriteReviewTemplate({ content, closeModal }: Props): React.ReactElement {
  const bookInfo = content.isbn
    ? { ...content, type: 'write' }
    : { ...content.Book, type: 'write' };

  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { addReview, editReview } = useSelector((state: RootState) => state.loading);
  const myReview = useRef<IUser.Review | null | undefined>(null);

  /** 작성된 리뷰가 있는지 확인 후 피드백 */
  useEffect(() => {
    myReview.current = me?.Reviews.find((review: IUser.Review) => review.isbn13 === content.isbn13);
    if (myReview.current) toggleFeedbackModal();
  }, []);

  /** 작성된 리뷰가 있을 경우 */

  /** [feedback modal] '확인' 버튼 콜백 */
  const onConfirm = useCallback(() => {
    dispatch(modalActions.closeWriteReviewModal());
    dispatch(modalActions.openReviewDetailModal(myReview.current?.id));
  }, []);

  /** 작성된 리뷰가 없을 경우 (리뷰 작성 OR 수정) */

  const [rating, setRating] = useState<number>(content.rating || 0);
  const [text, onChangeText] = useInput(content.content || '');

  const onChangeRate = useCallback((value) => {
    setRating(value);
  }, []);

  const onClickWriteReview = useCallback(() => {
    dispatch(actions.addReview({ Book: content, rating, content: text }));
    closeModal();
  }, [rating, text]);

  const onClickEditReview = useCallback(() => {
    dispatch(actions.editReview({ id: content.id, rating, content: text }));
    closeModal();
  }, [rating, text]);

  return (
    <S.Container>
      <BookInfo {...bookInfo} />
      <Rate allowHalf allowClear value={rating} onChange={onChangeRate} />
      {me ? (
        <ReviewForm
          value={text}
          onChange={onChangeText}
          onSubmit={content.id ? onClickEditReview : onClickWriteReview}
          submitButtonText={content.id ? '수정' : '작성'}
          buttonDisabled={!rating || !text}
          isLoading={content.id ? editReview : addReview}
          style={{ flex: 1 }}
        />
      ) : (
        <S.Login>
          <Text fontSize="sm" fontWeight="medium">
            리뷰를 남기시려면 로그인이 필요해요!
          </Text>
          <a href={githubAuthLink}>
            <Button>
              <S.ButtonContent>
                <GithubOutlined />
                Github으로 로그인 하기
              </S.ButtonContent>
            </Button>
          </a>
        </S.Login>
      )}
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{ feedbackPhrase: '이미 작성하신 리뷰가 있어요!', onConfirm }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
    </S.Container>
  );
}

export default WriteReviewTemplate;
