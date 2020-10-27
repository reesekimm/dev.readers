import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { FEEDBACK_PHRASES, LOGIN, GITHUB_AUTH_LINK } from '@constants';
import { RootState } from '@features';
import { Button, Text, BookInfo, ReviewForm, Modal, FeedbackTemplate } from '@components';
import { useModal, useInput } from '@hooks';
import { IBook, IUser, IReview } from '@types';
import { Props as BookInfoProps } from '../../molecules/BookInfo';
import { actions } from '../../../features/review';
import { actions as modalActions } from '../../../features/modal';
import * as S from './style';

interface Props {
  content: IBook.Book | IReview.ReviewInfo;
  /** template을 감싸고 있는 Modal을 닫는 callback */
  closeModal: () => void;
}

function isBook(content: IBook.Book | IReview.ReviewInfo): content is IBook.Book {
  return (content as IBook.Book).isbn13 !== undefined;
}

function WriteReviewTemplate({ content, closeModal }: Props): React.ReactElement {
  const bookRef = useRef<IBook.Book | null>(null);
  const reviewInfoRef = useRef<IReview.ReviewInfo | null>(null);

  const bookInfo: BookInfoProps = isBook(content)
    ? { ...content, type: 'write' }
    : { ...content.Book, type: 'write' };

  const [rating, setRating] = useState<number>(reviewInfoRef.current?.rating || 0);
  const [text, onChangeText, setText] = useInput(reviewInfoRef.current?.content || '');
  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { addReview, editReview } = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    if (isBook(content)) {
      bookRef.current = content;
    } else {
      reviewInfoRef.current = content;
      setRating(reviewInfoRef.current.rating);
      setText(reviewInfoRef.current.content);
    }
  }, [content]);

  const myReview = useRef<IUser.Review | null | undefined>(null);

  /** 작성된 리뷰가 있는지 확인 후 피드백 */
  useEffect(() => {
    myReview.current = me?.Reviews.find(
      (review: IUser.Review) => review.isbn13 === bookRef.current?.isbn13
    );
    if (myReview.current) toggleFeedbackModal();
    return () => {
      myReview.current = null;
    };
  }, [me]);

  /** 작성된 리뷰가 있을 경우 */

  /** [feedback modal] '확인' 버튼 콜백 */
  const onConfirm = useCallback(() => {
    dispatch(modalActions.closeWriteReviewModal());
    dispatch(modalActions.openReviewDetailModal(myReview.current?.id));
  }, []);

  /** 작성된 리뷰가 없을 경우 (리뷰 작성 OR 수정) */
  const onChangeRate = useCallback((value) => {
    setRating(value);
  }, []);

  const onClickWriteReview = useCallback(() => {
    dispatch(actions.addReview({ Book: bookRef.current, rating, content: text }));
    closeModal();
  }, [rating, text]);

  const onClickEditReview = useCallback(() => {
    dispatch(actions.editReview({ id: reviewInfoRef.current?.id, rating, content: text }));
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
          onSubmit={reviewInfoRef.current?.id ? onClickEditReview : onClickWriteReview}
          submitButtonText={reviewInfoRef.current?.id ? '수정' : '작성'}
          buttonDisabled={!rating || !text}
          isLoading={reviewInfoRef.current?.id ? editReview : addReview}
          style={{ flex: 1 }}
        />
      ) : (
        <S.Login>
          <Text fontSize="sm" fontWeight="medium">
            {LOGIN.REQUEST_LOGIN}
          </Text>
          <a href={GITHUB_AUTH_LINK}>
            <Button>
              <S.ButtonContent>
                <GithubOutlined />
                {LOGIN.GITHUB}
              </S.ButtonContent>
            </Button>
          </a>
        </S.Login>
      )}
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{ feedbackPhrase: FEEDBACK_PHRASES.REVIEW_EXISTS, onConfirm }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
    </S.Container>
  );
}

export default WriteReviewTemplate;
