import { useState } from 'react';

export default function useModal() {
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const toggleModal = () => setModalIsOpened(!modalIsOpened);
  return {
    modalIsOpened,
    toggleModal,
  };
}
