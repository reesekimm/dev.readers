import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { RootState } from '@features';
import { Text, Button, Modal, FeedbackTemplate } from '@components';
import { useModal } from '@hooks';
import { IReview } from '@types';
import * as S from './style';
import { actions } from '../../../features/review';
import { actions as modalActions } from '../../../features/modal';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Props {
  /** Action Bar 타입 (list(default) : 리뷰 목록, detail : 리뷰 상세) */
  type: string;
  content: IReview.Review;
  onClickComment?: () => void;
}

function ReviewActionBar({
  type = 'list',
  content,
  onClickComment,
  ...props
}: Props): React.ReactElement {
  const { id, User, Book, rating, content: data, createdAt, Comments, Likers } = content;

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { mainReviews, selectedReviewId } = useSelector((state: RootState) => state.review);
  const { deleteReview, addLike, cancelLike } = useSelector((state: RootState) => state.loading);
  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const liked = me?.Likes.find((review) => review.id === id);
  const onLike = useCallback(() => {
    if (!me) {
      dispatch(modalActions.openLoginModal());
      return;
    }
    dispatch(actions.addLike(id));
  }, []);

  const onCancelLike = useCallback(() => {
    dispatch(actions.cancelLike(id));
  }, []);

  const [numOfLikers, setNumOfLikers] = useState(Likers.length);

  useEffect(() => {
    if (!mainReviews.length) return;
    const latesNumberOfLikers = mainReviews.find((review) => review.id === id).Likers.length;
    setNumOfLikers(latesNumberOfLikers);
  }, [mainReviews]);

  const onClickEditReview = useCallback(() => {
    dispatch(modalActions.closeReviewDetailModal());
    dispatch(modalActions.openWriteReviewModal({ id, Book, rating, content: data }));
  }, []);

  const onClickDeleteReview = useCallback(() => {
    toggleFeedbackModal();
  }, []);

  const onConfirmDelete = useCallback(() => {
    dispatch(actions.deleteReview(id));
    dispatch(modalActions.closeReviewDetailModal());
  }, []);

  const showMoreActions = me && me.id === User.id && type === 'detail';
  const showLoadingIndicator = (addLike || cancelLike) && id === selectedReviewId;

  return (
    <S.Container {...props}>
      <div>
        <Avatar src={User.avatarUrl} />
        <Text color="gray5" fontSize="xsm" fontWeight="medium">
          {User.nickname}
        </Text>
        <Text color="gray4" fontSize="xsm">
          {dayjs(createdAt).fromNow()}
        </Text>
      </div>
      <div>
        {onClickComment && (
          <Button styleType="plain" onClick={onClickComment}>
            <S.ButtonContent>
              <MessageOutlined key="comment" />
              <Text color="gray4" fontSize="xsm">
                댓글 {Comments.length}
              </Text>
            </S.ButtonContent>
          </Button>
        )}
        {showMoreActions && (
          <>
            <Button styleType="plain" onClick={onClickEditReview}>
              <S.ButtonContent>
                <EditOutlined />
                <Text color="gray4" fontSize="xsm">
                  수정
                </Text>
              </S.ButtonContent>
            </Button>
            <Button styleType="plain" onClick={onClickDeleteReview} isLoading={deleteReview}>
              <S.ButtonContent>
                <DeleteOutlined />
                <Text color="gray4" fontSize="xsm">
                  삭제
                </Text>
              </S.ButtonContent>
            </Button>
            <Modal
              modalFor="feedback"
              modalSize="sm"
              content={{
                feedbackPhrase: '리뷰를 삭제하시겠어요?',
                onConfirm: onConfirmDelete,
                cancelable: true,
              }}
              Template={FeedbackTemplate}
              modalIsOpened={feedbackModalIsOpened}
              closeModal={toggleFeedbackModal}
            />
          </>
        )}
        <Button styleType="plain" id={id} onClick={liked ? onCancelLike : onLike}>
          <S.ButtonContent>
            {showLoadingIndicator ? (
              <LoadingOutlined />
            ) : liked ? (
              <HeartFilled key="heart" />
            ) : (
              <HeartOutlined key="like" />
            )}
            <Text color="gray4" fontSize="xsm">
              좋아요 {numOfLikers}
            </Text>
          </S.ButtonContent>
        </Button>
      </div>
    </S.Container>
  );
}

export default ReviewActionBar;
