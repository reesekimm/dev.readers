import React from 'react';

import { Header, Footer } from '@components';
import * as S from './style';

interface Props {
  children: React.ReactNode;
}

function BeseTemplate({ children }: Props): React.ReactElement {
  return (
    <S.Container>
      <Header />
      <S.Content>{children}</S.Content>
      <Footer />
    </S.Container>
  );
}

export default BeseTemplate;
