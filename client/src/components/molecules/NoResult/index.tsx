import React from 'react';
import { Empty } from 'antd';

import { EMPTY } from '@constants';
import { Text } from '@components';
import * as S from './style';

function NoResult(): React.ReactElement {
  return (
    <S.Container>
      <Empty description={<Text>{EMPTY.NO_RESULT}</Text>} />
    </S.Container>
  );
}

export default NoResult;
