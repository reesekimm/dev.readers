import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import * as S from './style';

export interface Props {
  [key: string]: unknown;
}

function Loading({ ...props }: Props): React.ReactElement {
  return (
    <S.Container {...props}>
      <LoadingOutlined style={{ fontSize: '35px', color: '#1e3799' }} />
    </S.Container>
  );
}

export default Loading;
