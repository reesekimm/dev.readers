import React from 'react';
import { Tag } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { BRAND, LOGIN, GITHUB_AUTH_LINK } from '@constants';
import { Text, Button } from '@components';
import * as S from './style';

function LoginTemplate(): React.ReactElement {
  return (
    <S.Container>
      <Text tag="h1" color="primary" fontFamily="logo" fontSize="lg">
        dev.readers
      </Text>
      <Text fontSize="xsm" style={{ color: '#616161' }}>
        {BRAND.INTRO}
      </Text>
      <S.TagContainer>
        <Tag color="#a4b0be">{BRAND.TAG_1}</Tag>
        <Tag color="#a4b0be">{BRAND.TAG_2}</Tag>
      </S.TagContainer>
      <a href={GITHUB_AUTH_LINK}>
        <Button>
          <S.ButtonContent>
            <GithubOutlined />
            {LOGIN.GITHUB}
          </S.ButtonContent>
        </Button>
      </a>
    </S.Container>
  );
}

export default LoginTemplate;
