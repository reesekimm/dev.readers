import { useState, useEffect, useRef } from 'react';

export default function useModal(modalSize?: string, onClose?: () => void) {
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const modalRef = useRef(null);

  const toggleModal = () => setModalIsOpened(!modalIsOpened);

  useEffect(() => {
    const modalWrapper = modalRef.current;
    if (!modalWrapper) return;

    function clickListener(e: MouseEvent) {
      const onCloseAvailable =
        modalWrapper && modalSize && (e.target as Element).classList.contains(modalSize);
      if (onCloseAvailable) {
        onClose?.();
      }
    }
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, [toggleModal]);

  return {
    modalIsOpened,
    toggleModal,
    modalRef,
  };
}
