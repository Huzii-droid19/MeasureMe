import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  Container,
  Error,
  Info,
  Title,
  Deadline,
  Description,
  ButtonContainer,
  IconWrapper,
  StyledIcon,
} from './styles';

import {RootStackParamsList, Task} from 'types/index';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {DeleteModal, LoadingButton} from 'components/index';
import {useTheme} from '@ui-kitten/components';
import {Todo} from 'store/api/index';
import Toast from 'react-native-toast-message';

type DetailsScreenProps = {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: NavigationProp<RootStackParamsList>;
};

const Details = ({navigation, route}: DetailsScreenProps) => {
  const {useEditTaskMutation} = Todo;
  const {task}: {task: Task} = route.params;
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const ScrollViewProps = {
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  };

  const renderIcon = () => (
    <>
      <IconWrapper onPress={() => setVisible(!visible)}>
        <StyledIcon name="trash-2-outline" fill={theme['color-danger-500']} />
      </IconWrapper>
      <IconWrapper onPress={() => navigation.navigate('Edit', {task: task})}>
        <StyledIcon name="edit-2-outline" fill={theme['color-primary-500']} />
      </IconWrapper>
    </>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderIcon,
    });
  }, [navigation]);

  const onClose = () => {
    setVisible(!visible);
  };
  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  const [editTask, {isLoading, isError, error}] = useEditTaskMutation();
  const onStatusUpdate = async (status: boolean) => {
    await editTask({...task, isCompleted: status}).then(res => {
      const updated_task = res?.data as Task;
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Task Status',
        text2: updated_task.isCompleted
          ? 'Completed Successfully🎉'
          : 'Task Reopend',
        visibilityTime: 3000,
      });
      navigation.goBack();
    });
  };

  return (
    <ScreenWrapper
      statusBarColor={theme['background-basic-color-1']}
      barStyle="dark-content"
      scrollType="scroll"
      scrollViewProps={ScrollViewProps}>
      <Container>
        <Title category="label">{task.title}</Title>
        <Deadline>{`Due: ${moment(task.date).format('YYYY-MM-DD')}`}</Deadline>
        <Description>{task.description}</Description>
        <ButtonContainer>
          {task.isCompleted ? (
            <LoadingButton
              isLoading={isLoading}
              label="Reopen"
              appearance="ghost"
              status="primary"
              onPress={() => onStatusUpdate(false)}
            />
          ) : (
            <LoadingButton
              isLoading={isLoading}
              label="Complete Task"
              appearance="filled"
              status="primary"
              onPress={() => onStatusUpdate(true)}
            />
          )}
        </ButtonContainer>
        <Info>
          <Error>{isError && error}</Error>
        </Info>
      </Container>
      <DeleteModal
        visible={visible}
        onClose={onClose}
        backdropStyle={backdropStyle}
        onBackdropPress={onClose}
        task={task}
      />
    </ScreenWrapper>
  );
};

export default Details;
