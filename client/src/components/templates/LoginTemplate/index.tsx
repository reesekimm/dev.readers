import React from 'react';
import { useDispatch } from 'react-redux';
import { Tag } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import * as S from './style';
import { actions } from '../../../features/user';
import { actions as modalActions } from '../../../features/modal';

function LoginTemplate(): React.ReactElement {
  const dispatch = useDispatch();
  return (
    <S.Container>
      <Text tag="h1" color="primary" fontFamily="logo" fontSize="lg">
        dev.readers
      </Text>
      <Text fontSize="xsm" style={{ color: '#616161' }}>
        개발자를 위한 도서 리뷰 플랫폼
      </Text>
      <S.TagContainer>
        <Tag color="#f8c291">#개발도서리뷰</Tag>
        <Tag color="#f8c291">#독서기록SNS</Tag>
      </S.TagContainer>
      <Button
        onClick={() => {
          dispatch(actions.login());
          dispatch(modalActions.closeLoginModal());
        }}
      >
        <S.ButtonContent>
          <GithubOutlined />
          Github으로 로그인 하기
        </S.ButtonContent>
      </Button>
    </S.Container>
  );
}

export default LoginTemplate;
