import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  Container,
  Title,
  Deadline,
  Description,
  IconWrapper,
  StyledIcon,
  JoinMeetingButton,
  Wrapper,
} from './styles';
import {RootStackParamsList, Task} from 'types/index';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {DeleteModal, Loader} from 'components/index';
import {useTheme} from '@ui-kitten/components';
import {Todo} from 'store/api/index';
import {addToast} from 'utils/index';
import {Linking} from 'react-native';

type DetailsScreenProps = {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: NavigationProp<RootStackParamsList>;
};

const Details = ({navigation, route}: DetailsScreenProps) => {
  const [editTask, {isLoading}] = Todo.useEditTaskMutation();
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

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const onStatusUpdate = async (status: boolean) => {
    try {
      const {data, error} = await editTask({...task, isCompleted: status});
      if (error) throw new Error(error);
      const updated_task = data as Task;
      addToast(
        updated_task.isCompleted
          ? `Task ${updated_task.title} completed`
          : `Task ${updated_task.title} reponed`,
        'success',
      );
      navigation.goBack();
    } catch (error: any) {
      addToast(error.message, 'error');
    }
  };

  const onJoinMeeting = async () => {
    try {
      Linking.openURL(task.hangoutLink);
    } catch (error: any) {
      addToast(error.message, 'error');
    }
  };
  const iconFillColor = task.isCompleted
    ? theme['color-primary-500']
    : theme['color-danger-500'];
  return (
    <ScreenWrapper
      statusBarColor={theme['background-basic-color-1']}
      barStyle="dark-content"
      scrollType="scroll"
      scrollViewProps={ScrollViewProps}>
      {isLoading && <Loader />}
      <Container>
        <Wrapper>
          <Title category="label">{task.title}</Title>
          <IconWrapper onPress={() => onStatusUpdate(!task.isCompleted)}>
            <StyledIcon name="checkmark-circle-outline" fill={iconFillColor} />
          </IconWrapper>
        </Wrapper>
        <Deadline>{`Due: ${moment(task.date).format('YYYY-MM-DD')}`}</Deadline>
        <Description>{task.description}</Description>
        {task.hangoutLink.length > 0 && (
          <JoinMeetingButton
            onPress={onJoinMeeting}
            appearance="filled"
            status="success">
            Join Meeting
          </JoinMeetingButton>
        )}
      </Container>
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(!visible)}
        backdropStyle={backdropStyle}
        onBackdropPress={() => setVisible(visible)}
        task={task}
      />
    </ScreenWrapper>
  );
};

export default Details;
