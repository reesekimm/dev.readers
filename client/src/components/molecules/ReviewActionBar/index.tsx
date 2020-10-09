import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
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
  const myId = useSelector((state: RootState) => state.user.me?.id);
  const { deleteReview } = useSelector((state: RootState) => state.loading);

  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const [liked, setLiked] = useState(false);

  const toggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

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

  return (
    <S.Container {...props}>
      <div>
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
        {myId && User.id === myId && type === 'detail' ? (
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
        ) : (
          <Button styleType="plain" onClick={toggleLiked}>
            <S.ButtonContent>
              {liked ? <HeartFilled key="heart" /> : <HeartOutlined key="like" />}
              <Text color="gray4" fontSize="xsm">
                좋아요 {Likers.length}
              </Text>
            </S.ButtonContent>
          </Button>
        )}
      </div>
    </S.Container>
  );
}

export default ReviewActionBar;
