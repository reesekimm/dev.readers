import React from 'react';

import { Text, Button } from '@components';

interface Props {
  feedback: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

function FeedbackTemplate({ ...content }: Props): React.ReactElement {
  const { feedback, onConfirm, onCancel } = content;
  return (
    <div>
      <Text fontSize="sm" fontWeight="medium">
        {feedback}
      </Text>
      <div>
        {onCancel && (
          <Button styleType="bordered" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button onClick={onConfirm}>확인</Button>
      </div>
    </div>
  );
}

export default FeedbackTemplate;
