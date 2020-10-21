import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { RootState } from '@features';
import { Text, Button, Modal, FeedbackTemplate } from '@components';
import { useModal } from '@hooks';
import { IUser } from '@types';
import * as S from './style';
import { actions } from '../../../features/user';

interface Props {
  [key: string]: unknown;
  userInfo: IUser.User;
}

function Profile({ userInfo, ...props }: Props): React.ReactElement | null {
  const { modalIsOpened: feedbackModalIsOpened, toggleModal: toggleFeedbackModal } = useModal();

  const dispatch = useDispatch();
  const { me, deleteAccountDone } = useSelector((state: RootState) => state.user);
  const { logout } = useSelector((state: RootState) => state.loading);

  const onClickLogout = useCallback(() => {
    dispatch(actions.logout());
  }, []);

  const onClickDeleteAccount = useCallback(() => {
    toggleFeedbackModal();
  }, []);

  const onConfirm = useCallback(() => {
    dispatch(actions.deleteAccount());
  }, []);

  useEffect(() => {
    if (deleteAccountDone) Router.replace('/');
  }, [deleteAccountDone]);

  const menu = (
    <Menu>
      <Menu.Item>
        <Button styleType="plain" onClick={onClickDeleteAccount}>
          <Text>회원탈퇴</Text>
        </Button>
      </Menu.Item>
    </Menu>
  );

  const isMyPage = me && me.nickname === userInfo.nickname;

  if (!userInfo) return null;

  return (
    <S.Container {...props}>
      <div>
        <Avatar src={userInfo.avatarUrl} size={70} style={{ fontSize: '50px' }}>
          {userInfo.nickname[0]}
        </Avatar>
        <Text tag="h3">{userInfo.nickname || 'No one'}</Text>
      </div>
      {isMyPage && (
        <div>
          <Button styleType="plain" onClick={onClickLogout} isLoading={logout}>
            <Text>로그아웃</Text>
          </Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button styleType="plain">
              <MoreOutlined style={{ color: '#616161' }} />
            </Button>
          </Dropdown>
          <Modal
            modalFor="feedback"
            modalSize="sm"
            content={{
              feedbackPhrase: '작성하신 리뷰와 댓글이 모두 삭제돼요.\n정말 탈퇴하시겠어요?',
              onConfirm,
              cancelable: true,
            }}
            Template={FeedbackTemplate}
            modalIsOpened={feedbackModalIsOpened}
            closeModal={toggleFeedbackModal}
          />
        </div>
      )}
    </S.Container>
  );
}

export default Profile;
