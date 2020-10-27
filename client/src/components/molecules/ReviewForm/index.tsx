import React from 'react';

import { Button } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  value: string | number;
  submitButtonText: string;
  buttonDisabled: boolean;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

function ReviewForm({
  value,
  submitButtonText,
  buttonDisabled,
  isLoading,
  onChange,
  onSubmit,
  ...props
}: Props): React.ReactElement {
  return (
    <S.Form {...props}>
      <S.Textarea value={value} onChange={onChange} />
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={buttonDisabled}
        isLoading={isLoading}
        style={{ margin: 0 }}
      >
        {submitButtonText}
      </Button>
    </S.Form>
  );
}

export default ReviewForm;
