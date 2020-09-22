import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { AnyStyledComponent } from 'styled-components';

import * as S from './style';

interface Props {
  /** modal 제목 */
  title?: string;
  /** modal에 들어갈 내용 */
  children: React.ReactNode;
  /** modal size (lg(default), md, sm(alert용 알림창)) */
  modalSize: string;
  /** modal 상태 (열려있을 경우 true) */
  modalIsOpened: boolean;
  /** modal 닫음 콜백 함수 */
  closeModal: () => void;
}

/** 사이즈별 modal 컴포넌트 맵핑을 위한 interface */
interface ModalSizeMapping {
  [key: string]: AnyStyledComponent;
}

const modals: ModalSizeMapping = {
  lg: S.LargeModal,
  md: S.MediumModal,
  sm: S.SmallModal,
};

function Modal({
  title,
  children,
  modalSize = 'lg',
  modalIsOpened,
  closeModal,
}: Props): React.ReactPortal | null {
  const modalRoot = useRef<HTMLElement | null>(null);
  useEffect(() => {
    modalRoot.current = document.getElementById('modal-root');
  }, []);

  const ModalWithCustomizedSize = modals[modalSize];

  const modal = (
    <S.Wrapper>
      <ModalWithCustomizedSize>
        <S.Header>
          {title}
          <CloseOutlined style={{ fontSize: '2rem', marginLeft: 'auto' }} onClick={closeModal} />
        </S.Header>
        <div>{children}</div>
      </ModalWithCustomizedSize>
    </S.Wrapper>
  );

  return modalIsOpened && modalRoot.current
    ? ReactDOM.createPortal(modal, modalRoot.current)
    : null;
}

export default Modal;
