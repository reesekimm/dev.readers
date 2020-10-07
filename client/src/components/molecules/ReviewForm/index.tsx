import React from 'react';

import { Button } from '@components';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  value: string | number;
  submitButtonText: string;
  buttonDisabled: boolean;
  onChange: () => void;
  onSubmit: () => void;
}

function ReviewForm({
  value,
  submitButtonText,
  buttonDisabled,
  onChange,
  onSubmit,
  ...props
}: Props): React.ReactElement {
  return (
    <S.Form {...props}>
      <S.Textarea value={value} onChange={onChange} />
      <Button type="submit" onClick={onSubmit} disabled={buttonDisabled} style={{ margin: 0 }}>
        {submitButtonText}
      </Button>
    </S.Form>
  );
}

export default ReviewForm;
