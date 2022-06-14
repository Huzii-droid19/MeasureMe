import React from 'react';
import {Modal, Card, useTheme} from '@ui-kitten/components';

import {Container, DeleteText, ButtonContainer} from './style';
import {Todo} from 'store/api';
import {Task} from 'types';
import {LoadingButton} from 'components';
import {NavigationService} from 'navigation';
import {addToast} from 'utils';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onBackdropPress: () => void;
  task: Task;
}

const DeleteModal = ({visible, onClose, onBackdropPress, task}: ModalProps) => {
  const [deleteTask, {isLoading}] = Todo.useDeleteTaskMutation();
  const onDelete = async () => {
    try {
      await deleteTask(task);
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      onClose();
      NavigationService.navigate('Home');
    }
  };
  const theme = useTheme();

  return (
    <Container>
      <Modal
        visible={visible}
        onBackdropPress={onBackdropPress}
        backdropStyle={{backgroundColor: theme['backdrop-color']}}>
        <Card disabled={true}>
          <DeleteText>Are you sure you want to delete this task?</DeleteText>
          <ButtonContainer>
            <LoadingButton
              size="medium"
              width="45%"
              label="Delete"
              onPress={onDelete}
              status="danger"
              isLoading={isLoading}
              appearance="outline"
            />
            <LoadingButton
              size="medium"
              width="45%"
              label="Cancel"
              onPress={onClose}
              status="primary"
              appearance="outline"
            />
          </ButtonContainer>
        </Card>
      </Modal>
    </Container>
  );
};

export default DeleteModal;
