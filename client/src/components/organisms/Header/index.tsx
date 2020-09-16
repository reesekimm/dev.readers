import React from 'react';
import Link from 'next/link';

import { Text, Button, Search } from '@components';
import * as S from './style';

function Header(): React.ReactElement {
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
          <Search />
          <Button styleType="plain">로그인</Button>
        </S.ButtonContainer>
      </S.NavItemContainer>
    </S.Container>
  );
}

export default Header;
