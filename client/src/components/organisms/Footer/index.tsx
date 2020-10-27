import React from 'react';

import { Text } from '@components';
import * as S from './style';

function Footer(): React.ReactElement {
  return (
    <S.Container>
      <Text color="primary" fontFamily="logo" fontSize="md">
        dev.readers
      </Text>
      <Text color="gray4" fontSize="xsm">
        <>Copyright &copy; {new Date().getFullYear()}</>
      </Text>
    </S.Container>
  );
}

export default Footer;
