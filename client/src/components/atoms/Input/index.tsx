import React, { forwardRef, useMemo } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import * as S from './style';

export interface Props {
  [key: string]: unknown;
  /** name of input */
  inputName: string;
  /** input type (text(default), search) */
  type?: 'text' | 'search';
  /** defaultValue of input */
  defaultValue?: string;
  /** placeholder content */
  placeholder?: string;
  /** input value(state) */
  value?: string | number;
  /** onChange handler(setState) */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WrappedInput = forwardRef<HTMLInputElement, Props>(function Input(
  { inputName, type = 'text', defaultValue, placeholder, value, onChange, ...props }: Props,
  ref
): React.ReactElement {
  const iconStyle = useMemo(() => ({ color: '#616161', fontSize: '18px', marginLeft: '5px' }), []);

  return (
    <S.Container {...props}>
      {type === 'search' && <SearchOutlined style={iconStyle} />}
      <S.Input
        name={inputName}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        ref={ref}
        autoComplete="off"
      />
    </S.Container>
  );
});

export default WrappedInput;
