import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import { RootState } from '@features';
import { actions } from '../../../features/user';
import * as S from './style';

function Header(): React.ReactElement {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);

  const onClickLogin = useCallback(() => {
    dispatch(actions.login('github'));
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
          <Button styleType="plain" onClick={onClickLogin}>
            {me ? me.nickname : '로그인'}
          </Button>
        </S.ButtonContainer>
      </S.NavItemContainer>
    </S.Container>
  );
}

export default Header;
