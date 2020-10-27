import React from 'react';

import { Text, Button } from 'components';
import * as S from './style';

interface Content {
  feedbackPhrase: string;
  onConfirm: () => void;
  cancelable: boolean;
  isLoading: boolean;
}

interface Props {
  content: Content;
  closeModal: () => void;
}

function FeedbackTemplate({ content, closeModal }: Props): React.ReactElement {
  const { feedbackPhrase, onConfirm, cancelable, isLoading } = content;

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
        <Button onClick={onConfirm} isLoading={isLoading}>
          확인
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default FeedbackTemplate;
