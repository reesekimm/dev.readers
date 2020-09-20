import React from 'react';
import * as S from './style';

interface Props {
  [key: string]: unknown;
}

function Divider({ ...props }: Props): React.ReactElement {
  return <S.Divider {...props} />;
}

export default Divider;
