import React from 'react';

import { Button } from '@components';
import { IReview } from '@types';
import { useInput } from '@hooks';
import * as S from './style';

interface Props {
  [key: string]: unknown;
  ReviewId: IReview.Comment.ReviewId;
}

function CommentForm({ ReviewId, ...props }: Props): React.ReactElement {
  const [comment, onChangeComment, setComment] = useInput<string>('');

  return (
    <S.Form {...props}>
      <S.Textarea value={comment} onChange={onChangeComment} />
      <Button type="submit" style={{ margin: 0 }}>
        작성
      </Button>
    </S.Form>
  );
}

export default CommentForm;
