import React, { useMemo } from 'react';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import * as S from './style';

function Header(): React.ReactElement {
  const iconStyle = useMemo(() => ({ color: '#616161', fontSize: '18px' }), []);

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
            <SearchOutlined style={iconStyle} />
          </Button>
          <Button styleType="plain">로그인</Button>
        </S.ButtonContainer>
      </S.NavItemContainer>
    </S.Container>
  );
}

export default Header;
