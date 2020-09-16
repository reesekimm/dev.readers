import React from 'react';
import Link from 'next/link';

import * as S from './style';

export interface Props {
  /** 버튼 내용 */
  children: React.ReactElement | string;
  /** next.js client-side routing을 위한 path / 외부 링크 */
  href?: string;
  /** anchor 태그의 target 속성 */
  target?: string;
  /** anchor 태그의 rel 속성 */
  rel?: string;
  /** 버튼 스타일 (primary(default), secondary, bordered, plain) */
  styleType?: string;
  /** 버튼 타입 (submit(default), reset, button) */
  btnType?: string;
  /** onclick handler */
  onClick?: () => void;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}

function Button({
  children,
  href,
  target,
  rel,
  styleType = 'primary',
  btnType = 'button',
  onClick,
  ...props
}: Props): React.ReactElement {
  const isExternalLink = href && target;
  const isInternalLink = href;

  if (isExternalLink)
    return (
      <S.Anchor href={href} target={target} rel={rel} styleType={styleType} {...props}>
        {children}
      </S.Anchor>
    );

  if (isInternalLink)
    return (
      <Link href={href} passHref>
        <S.Anchor styleType={styleType} {...props}>
          {children}
        </S.Anchor>
      </Link>
    );

  return (
    <S.StyledButton styleType={styleType} type={btnType} {...props}>
      {children}
    </S.StyledButton>
  );
}

export default Button;
