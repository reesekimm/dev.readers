import React from 'react';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';

import { Text, Button } from '@components';
import * as S from './style';

function Header(): React.ReactElement {
  return (
    <S.Container>
      <Link href="/">
        <a>
          <Text tag="h1" color="primary" fontFamily="logo" fontSize="lg">
            dev.readers
          </Text>
        </a>
      </Link>
      <div>
        <SearchOutlined
          style={{ fontSize: '2rem', color: '#414141', padding: '1rem', cursor: 'pointer' }}
        />
        <Button styleType="plain">로그인</Button>
      </div>
    </S.Container>
  );
}

export default Header;
