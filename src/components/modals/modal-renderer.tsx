/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from 'antd';
import { useModalContext } from '../../context/modal-context';
import { Group, Project } from '../../types';

import NewTaskModal from './list/new-task-modal';
import NewGroupModal from './list/new-group-modal';
import NewProjectModal from './list/new-project-modal';

// Пример модальных окон
const MODAL_COMPONENTS: { [key: string]: React.FC<any> } = {
  NewTaskModal: ({ group }: { group: Group }) => <NewTaskModal group={group} />,
  NewGroupModal: ({ project }: { project: Project }) => <NewGroupModal project={project} />,
  NewProjectModal: () => <NewProjectModal />,
  // добавьте другие модальные окна здесь
};

const ModalRenderer: React.FC = () => {
  const { modalType, modalProps, hideModal, modalOptions } = useModalContext();

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  if (!SpecificModal) {
    return null;
  }

  return (
    <Modal
      open={true}
      onCancel={hideModal}
      footer={null}
      centered={true}
      {...modalOptions}
    >
      <SpecificModal {...modalProps} />
    </Modal>
  );
};

export default ModalRenderer;