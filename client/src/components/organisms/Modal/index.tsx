import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { AnyStyledComponent } from 'styled-components';

import { Loading } from '@components';
import { useModal } from '@hooks';
import * as S from './style';

interface Props {
  /** modal 타입 (review_detail(리뷰상세), review_write(리뷰작성), feedback(피드백), ...) */
  modalFor: string;
  /** modal 내용 (데이터 객체) */
  content: unknown;
  /** modal 내부에서 사용할 템플릿 */
  Template: React.ReactNode;
  /** modal size (lg(default), md, sm(user feedback alert용)) */
  modalSize: string;
  /** modal 상태 (열려있을 경우 true) */
  modalIsOpened: boolean;
  /** modal 닫기 콜백 함수 */
  closeModal: () => void;
  /** loading 여부 */
  isLoading?: boolean;
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
  modalFor,
  content,
  Template,
  modalSize,
  modalIsOpened,
  closeModal,
  isLoading,
}: Props): React.ReactPortal | null {
  const modalRoot = useRef<Element | null>(null);
  const { modalRef } = useModal(modalSize, closeModal);

  useEffect(() => {
    const wrapper = document.getElementById('modal-root');
    modalRoot.current = wrapper;
  }, []);

  const ModalWithCustomizedSize = modals[modalSize];

  const modal = (
    <S.Wrapper modalSize={modalSize} className={modalSize} ref={modalRef}>
      <ModalWithCustomizedSize>
        {modalSize !== 'sm' && (
          <>
            <S.Header>
              <CloseOutlined
                style={{ fontSize: '2rem', marginLeft: 'auto' }}
                onClick={closeModal}
              />
            </S.Header>
          </>
        )}
        <S.Content>
          {isLoading ? (
            <Loading style={{ flex: 1, height: '90%' }} />
          ) : (
            content && <Template content={content} closeModal={closeModal} />
          )}
        </S.Content>
      </ModalWithCustomizedSize>
    </S.Wrapper>
  );

  return modalIsOpened && modalRoot.current
    ? ReactDOM.createPortal(modal, modalRoot.current)
    : null;
}

export default Modal;
