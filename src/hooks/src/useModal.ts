import {useState} from "react";

function useModal() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(() => true);
  const closeModal = () => setVisible(() => false);

  return {visible, openModal, closeModal};
}

export default useModal;
