import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { AnyStyledComponent } from 'styled-components';

import { RootState } from '@features';
import { Text, Divider } from '@components';
import { useClickOutside } from '@hooks';
import * as S from './style';

interface Props {
  /** modal 타입 ('리뷰 상세', '리뷰 작성', '리뷰 수정') */
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
  closeModal?: () => void;
  /** api 요청 콜백 */
  apiCallback?: () => void;
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
  modalSize = 'lg',
  modalIsOpened,
  closeModal,
  apiCallback,
}: Props): React.ReactPortal | null {
  const modalRoot = useRef<HTMLElement | null>(null);
  const clickOutsideRef = useClickOutside(closeModal);
  const [data, setData] = useState(content);

  useEffect(() => {
    modalRoot.current =
      modalSize === 'sm'
        ? document.getElementById('feedback-modal-root')
        : document.getElementById('modal-root');
    if (apiCallback) apiCallback();
  }, []);

  const ModalWithCustomizedSize = modals[modalSize];

  const modal = (
    <S.Wrapper modalSize={modalSize} id={modalSize === 'sm' ? 'click-outside-disabled' : ''}>
      <ModalWithCustomizedSize ref={modalSize !== 'sm' ? clickOutsideRef : null}>
        {modalSize !== 'sm' && (
          <>
            <S.Header>
              {modalFor && <Text fontWeight="bold">{modalFor}</Text>}
              <CloseOutlined
                style={{ fontSize: '2rem', marginLeft: 'auto' }}
                onClick={closeModal}
              />
            </S.Header>
            <Divider />
          </>
        )}
        <S.Content>{data && <Template {...data} />}</S.Content>
      </ModalWithCustomizedSize>
    </S.Wrapper>
  );

  return modalIsOpened && modalRoot.current
    ? ReactDOM.createPortal(modal, modalRoot.current)
    : null;
}

export default Modal;
