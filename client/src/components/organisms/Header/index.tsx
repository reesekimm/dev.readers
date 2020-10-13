import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import { RootState } from '@features';
import { actions } from '../../../features/user';
import * as S from './style';

function Header(): React.ReactElement {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { login } = useSelector((state: RootState) => state.loading);

  const onClickLogin = useCallback(() => {
    dispatch(actions.login());
  }, []);

  return (
    <S.Container>
      <S.NavItemContainer>
        <Link href="/">
          <a>
            <Text tag="h1" color="primary" fontFamily="logo" fontSize="lg">
              dev.readers
            </Text>
          </a>
        </Link>
        <S.ButtonContainer>
          <Button type="inLink" href="/search/book" styleType="plain">
            <SearchOutlined />
          </Button>
          {me && (
            <Button type="inLink" href="/write" styleType="plain">
              리뷰쓰기
            </Button>
          )}
          <Button
            styleType="plain"
            type={me ? 'inLink' : null}
            href={me ? '/me' : null}
            onClick={me ? null : onClickLogin}
            isLoading={login}
          >
            {me ? (
              <Avatar src={me.avatarUrl} style={{ backgroundColor: '#1e3799' }}>
                {me.nickname[0]}
              </Avatar>
            ) : (
              '로그인'
            )}
          </Button>
        </S.ButtonContainer>
      </S.NavItemContainer>
    </S.Container>
  );
}

export default Header;
