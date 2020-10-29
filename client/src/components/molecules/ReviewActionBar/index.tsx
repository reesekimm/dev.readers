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

import { FEEDBACK_PHRASES } from 'common/constants';
import { RootState } from 'features';
import { Text, Button, Modal, FeedbackTemplate } from 'components';
import { useModal } from 'hooks';
import { IReview } from 'common/types';
import { actions as reviewActions } from 'features/review';
import { actions as modalActions } from 'features/modal';
import * as S from './style';

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

  const liked = me?.Likes.find((review: { id: number }) => review.id === id);
  const onLike = useCallback(() => {
    if (!me) {
      dispatch(modalActions.openLoginModal());
      return;
    }
    dispatch(reviewActions.addLike(id));
  }, [me]);

  const onCancelLike = useCallback(() => {
    dispatch(reviewActions.cancelLike(id));
  }, []);

  const [numOfLikers, setNumOfLikers] = useState(Likers.length);

  useEffect(() => {
    if (!mainReviews.length) return;
    const updatedNumberOfLikers = mainReviews.find((review: IReview.Review) => review.id === id)
      ?.Likers.length;
    if (updatedNumberOfLikers !== undefined) setNumOfLikers(updatedNumberOfLikers);
  }, [mainReviews]);

  const onClickEditReview = useCallback(() => {
    dispatch(modalActions.closeReviewDetailModal());
    dispatch(modalActions.openWriteReviewModal({ id, Book, rating, content: data }));
  }, []);

  const onClickDeleteReview = useCallback(() => {
    toggleFeedbackModal();
  }, []);

  const onConfirmDelete = useCallback(() => {
    dispatch(reviewActions.deleteReview(id));
    dispatch(modalActions.closeReviewDetailModal());
  }, []);

  const showMoreActions = me && me.id === User.id && type === 'detail';
  const showLoadingIndicator = (addLike || cancelLike) && id === selectedReviewId;

  return (
    <S.Container {...props}>
      <div>
        <Button styleType="plain" type="inLink" href={`/user/${User.nickname}`} prefetch={false}>
          <>
            <Avatar src={User.avatarUrl} />
            <Text color="gray5" fontSize="xsm" fontWeight="medium">
              {User.nickname}
            </Text>
          </>
        </Button>
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
                <>댓글 {Comments.length}</>
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
                feedbackPhrase: FEEDBACK_PHRASES.DELETE_REVIEW,
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
              <>좋아요 {numOfLikers}</>
            </Text>
          </S.ButtonContent>
        </Button>
      </div>
    </S.Container>
  );
}

export default ReviewActionBar;
