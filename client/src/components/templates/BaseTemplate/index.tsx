import React from 'react';

import { Header, Footer } from '@components';
import * as S from './style';

interface Props {
  children: React.ReactNode;
}

function BeseTemplate({ children }: Props): React.ReactElement {
  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
      <Footer />
    </>
  );
}

export default BeseTemplate;
