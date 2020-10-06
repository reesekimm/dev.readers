import React, { useCallback } from 'react';

import { Text, Button } from '@components';

interface Content {
  feedbackPhrase: string;
  onConfirm: () => void;
  cancelable: boolean;
}

interface Props {
  content: Content;
  closeModal: () => void;
}

function FeedbackTemplate({ content, closeModal }: Props): React.ReactElement {
  const { feedbackPhrase, onConfirm, cancelable } = content;

  const closeModalBeforeInvokingConfirmFunc = useCallback(() => {
    closeModal();
    onConfirm();
  }, []);

  return (
    <div>
      <Text fontSize="sm" fontWeight="medium">
        {feedbackPhrase}
      </Text>
      <div>
        {cancelable && (
          <Button styleType="bordered" onClick={closeModal}>
            취소
          </Button>
        )}
        <Button onClick={closeModalBeforeInvokingConfirmFunc}>확인</Button>
      </div>
    </div>
  );
}

export default FeedbackTemplate;
