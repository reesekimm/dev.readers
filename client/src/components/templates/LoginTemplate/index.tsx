import React from 'react';
import { Tag } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import * as S from './style';

const githubAuthLink = `${process.env.NEXT_PUBLIC_DEV_API}/user/auth/github`;

function LoginTemplate(): React.ReactElement {
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
      <a href={githubAuthLink}>
        <Button>
          <S.ButtonContent>
            <GithubOutlined />
            Github으로 로그인 하기
          </S.ButtonContent>
        </Button>
      </a>
    </S.Container>
  );
}

export default LoginTemplate;
