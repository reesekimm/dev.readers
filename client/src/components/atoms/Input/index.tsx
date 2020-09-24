import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
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

export interface InputRef {
  exposedFocusMethod: () => void;
}

const WrappedInput = forwardRef<InputRef, Props>(function Input(
  { inputName, type = 'text', defaultValue, placeholder, value, onChange, ...props }: Props,
  ref
): React.ReactElement {
  const iconStyle = useMemo(() => ({ color: '#616161', fontSize: '18px', marginLeft: '5px' }), []);

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    exposedFocusMethod: () => {
      inputRef.current?.focus();
    },
  }));

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
        ref={inputRef}
        autoComplete="off"
      />
    </S.Container>
  );
});

export default WrappedInput;
