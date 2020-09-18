import React from 'react';

import * as S from './style';

export interface Props {
  [key: string]: unknown;
  src: string;
  alt: string;
}

function Img({ src, alt, ...props }: Props): React.ReactElement {
  return <S.Img src={src} alt={alt} {...props} />;
}

export default Img;
