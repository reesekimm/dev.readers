import React, { useCallback } from 'react';

import { Text, Button } from '@components';
import * as S from './style';

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
    <S.Container>
      <S.TextContainer>
        <Text fontSize="sm" fontWeight="medium">
          {feedbackPhrase}
        </Text>
      </S.TextContainer>
      <S.ButtonContainer>
        {cancelable && (
          <Button styleType="bordered" onClick={closeModal}>
            취소
          </Button>
        )}
        <Button onClick={closeModalBeforeInvokingConfirmFunc}>확인</Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default FeedbackTemplate;
