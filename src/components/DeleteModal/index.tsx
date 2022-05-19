import React from 'react';
import {Container, DeleteText, ButtonContainer} from './style';
import {Modal, Card} from '@ui-kitten/components';
import {useDeleteTaskMutation} from '../../store/slice/apiSlice';
import {Task} from '../../types';
import {NavigationProp} from '@react-navigation/native';
import LoadingButton from '../LoadingButton';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  onBackdropPress: () => void;
  backdropStyle: any;
  task: Task;
  navigation: NavigationProp<any>;
};

const DeleteModal = ({
  visible,
  onClose,
  onBackdropPress,
  backdropStyle,
  task,
  navigation,
}: ModalProps) => {
  const [deleteTask, {isSuccess, isLoading}] = useDeleteTaskMutation();
  const onDelete = () => {
    deleteTask(task);
  };
  React.useEffect(() => {
    if (isSuccess) {
      onClose();
      navigation.navigate('Home');
    }
  }, [isSuccess]);

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
