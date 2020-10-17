import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { RootState } from '@features';
import { Text, Button } from '@components';
import { IUser } from '@types';
import * as S from './style';
import { actions } from '../../../features/user';

interface Props {
  [key: string]: unknown;
  userInfo: IUser.Me;
}

function Profile({ userInfo, ...props }: Props): React.ReactElement {
  const dispatch = useDispatch();
  const { logout } = useSelector((state: RootState) => state.loading);

  const onClickLogout = useCallback(() => {
    dispatch(actions.logout());
  }, []);

  return (
    <S.Container {...props}>
      <div>
        <Avatar src={userInfo.avatarUrl} size={70} style={{ fontSize: '50px' }}>
          {userInfo.nickname[0]}
        </Avatar>
        <Text tag="h3">{userInfo.nickname || 'No one'}</Text>
      </div>
      <div>
        <Button styleType="plain" onClick={onClickLogout} isLoading={logout}>
          <Text>로그아웃</Text>
        </Button>
        <Button styleType="plain">
          <MoreOutlined style={{ color: '#616161' }} />
        </Button>
      </div>
    </S.Container>
  );
}

export default Profile;