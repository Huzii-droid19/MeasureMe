import React from 'react';
import {Container, DeleteText, ButtonContainer} from './style';
import {Modal, Card} from '@ui-kitten/components';
import {Todo} from 'store/api/index';
import {Task} from 'types/index';
import {LoadingButton} from 'components/index';
import {NavigationService} from 'navigation/index';
import {addToast} from 'utils/index';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  onBackdropPress: () => void;
  backdropStyle: any;
  task: Task;
};

const DeleteModal = ({
  visible,
  onClose,
  onBackdropPress,
  backdropStyle,
  task,
}: ModalProps) => {
  const {useDeleteTaskMutation} = Todo;
  const [deleteTask, {isLoading}] = useDeleteTaskMutation();
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

  return (
    <Container>
      <Modal
        visible={visible}
        onBackdropPress={onBackdropPress}
        backdropStyle={backdropStyle}>
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
