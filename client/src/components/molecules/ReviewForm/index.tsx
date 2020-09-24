import React from 'react';

import { Button } from '@components';
import { useInput } from '@hooks';
import * as S from './style';

interface Props {
  [key: string]: unknown;
}

function ReviewForm({ ...props }: Props): React.ReactElement {
  const [text, onChangeText, setText] = useInput<string>('');

  return (
    <S.Form {...props}>
      <S.Textarea value={text} onChange={onChangeText} />
      <Button type="submit" style={{ margin: 0 }}>
        작성
      </Button>
    </S.Form>
  );
}

export default ReviewForm;
