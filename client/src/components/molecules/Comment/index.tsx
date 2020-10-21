import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import { FEEDBACK_PHRASES } from '@constants';
import { RootState } from '@features';
import { Text, Button, Modal, FeedbackTemplate, CommentEditor } from '@components';
import { IReview } from '@types';
import { useModal } from '@hooks';
import * as S from './style';
import { actions } from '../../../features/review';

dayjs.extend(relativeTime);
dayjs.locale('ko');

function Comment({ id, ReviewId, User, content, createdAt }: IReview.Comment): React.ReactElement {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { deleteComment } = useSelector((state: RootState) => state.loading);

  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();
  const [editMode, setEditMode] = useState(false);

  const onClickEditComment = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCloseCommentEditor = useCallback(() => {
    setEditMode(false);
  }, []);

  const onClickDeleteComment = useCallback(() => {
    toggleFeedbackModal();
  }, []);

  const onConfirmDelete = useCallback(() => {
    dispatch(actions.deleteComment({ ReviewId, CommentId: id }));
    toggleFeedbackModal();
  }, []);

  const showActionButtons = me && me.Comments.find((comment) => comment.id === id) && !editMode;

  return (
    <S.Container>
      <Button type="inLink" href={`/${User.nickname}`} styleType="plain">
        <Avatar src={User.avatarUrl} />
      </Button>
      <S.Content>
        <div>
          <Button type="inLink" href={`/${User.nickname}`} styleType="plain">
            <Text color="gray5" fontSize="xsm" fontWeight="medium">
              {User.nickname}
            </Text>
          </Button>
          <Text color="gray4" fontSize="xsm" style={{ marginLeft: '1rem' }}>
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
        {editMode ? (
          <CommentEditor
            ReviewId={ReviewId}
            CommentId={id}
            content={content}
            onCloseCommentEditor={onCloseCommentEditor}
          />
        ) : (
          content
        )}
        {showActionButtons && (
          <div>
            <Button styleType="plain" onClick={onClickEditComment} className="no-margin">
              <Text color="primary" fontSize="xsm">
                수정
              </Text>
            </Button>
            <Button styleType="plain" onClick={onClickDeleteComment}>
              <Text color="gray4" fontSize="xsm">
                삭제
              </Text>
            </Button>
          </div>
        )}
      </S.Content>
      <Modal
        modalFor="feedback"
        modalSize="sm"
        content={{
          feedbackPhrase: FEEDBACK_PHRASES.DELETE_COMMENT,
          onConfirm: onConfirmDelete,
          cancelable: true,
          isLoading: deleteComment,
        }}
        Template={FeedbackTemplate}
        modalIsOpened={feedbackModalIsOpened}
        closeModal={toggleFeedbackModal}
      />
    </S.Container>
  );
}

export default Comment;
