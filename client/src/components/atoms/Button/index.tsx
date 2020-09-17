import React from 'react';
import Link from 'next/link';

import * as S from './style';

export interface Props {
  /** 버튼 내용 */
  children: React.ReactElement | string;
  /** next.js client-side routing을 위한 path / 외부 링크 */
  href?: string;
  /** 버튼 타입 (exLink: 외부 링크, inLink: client-side 내부 routing) */
  type?: string;
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
  type,
  styleType = 'primary',
  btnType = 'button',
  onClick,
  ...props
}: Props): React.ReactElement {
  if (type === 'exLink')
    return (
      <S.Anchor
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        styleType={styleType}
        {...props}
      >
        {children}
      </S.Anchor>
    );

  if (type === 'inLink')
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
