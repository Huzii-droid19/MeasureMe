import React from 'react';
import {Container, DeleteText, ButtonContainer} from './style';
import {Modal, Card} from '@ui-kitten/components';
import {useDeleteTaskMutation} from 'store/api/index';
import {Task} from 'types/index';
import {LoadingButton} from 'components/index';
import {NavigationService} from 'navigation/index';

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
  const [deleteTask, {isLoading}] = useDeleteTaskMutation();
  const onDelete = async () => {
    await deleteTask(task).then(res => {
      onClose();
      NavigationService.navigate('Home');
    });
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
              label="Delete"
              onPress={onDelete}
              status="danger"
              isLoading={isLoading}
              appearance="outline"
            />
            <LoadingButton
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
