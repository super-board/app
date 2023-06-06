import {useModal} from "@/hooks";

export default function useDialogModals() {
  const {
    visible: isEditModalVisible,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    visible: isDeleteModalVisible,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    visible: isReportModalVisible,
    openModal: openReportModal,
    closeModal: closeReportModal,
  } = useModal();

  return {
    isEditModalVisible,
    openEditModal,
    closeEditModal,
    isDeleteModalVisible,
    openDeleteModal,
    closeDeleteModal,
    isReportModalVisible,
    openReportModal,
    closeReportModal,
  };
}
