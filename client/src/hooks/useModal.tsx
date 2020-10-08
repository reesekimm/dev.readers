import { useState, useEffect, useRef } from 'react';

export default function useModal(onClose?: () => void) {
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const ref = useRef(null);

  const toggleModal = () => setModalIsOpened(!modalIsOpened);

  useEffect(() => {
    const modalWrapper = ref.current;
    if (!modalWrapper) return;

    function clickListener(e: MouseEvent) {
      if (modalWrapper && e.target.classList.contains('close_modal')) {
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
    ref,
  };
}
