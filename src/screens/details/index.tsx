import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {pathOr} from 'ramda';
import {StyleSheet} from 'react-native';
import dayjs from 'dayjs';

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
import {RootStackParamsList, Task} from 'types';
import {DeleteModal, Loader} from 'components';
import {Todo} from 'store/api';
import {addToast, navigateToURL} from 'utils';

interface DetailsScreenProps {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: NavigationProp<RootStackParamsList>;
}

const Details = ({navigation, route}: DetailsScreenProps) => {
  const [editTask, {isLoading}] = Todo.useEditTaskMutation();
  const {task}: {task: Task} = route.params;
  const [visible, setVisible] = React.useState<boolean>(false);
  const theme = useTheme();
  const title: string = pathOr('', ['title'], task);
  const description: string = pathOr('', ['description'], task);
  const deadline: Date = pathOr('', ['deadline'], task);
  const hangoutLink: string = pathOr('', ['hangoutLink'], task);
  const isCompleted: boolean = pathOr(false, ['isCompleted'], task);

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

  const onStatusUpdate = async () => {
    try {
      const {data, error} = await editTask({
        ...task,
        isCompleted: !isCompleted,
      });
      if (error) throw new Error(error);
      const updated_task = data as Task;
      addToast(
        updated_task.isCompleted
          ? `Task ${updated_task.title} completed`
          : `Task ${updated_task.title} reponed`,
        'success',
      );
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      navigation.goBack();
    }
  };

  const iconFillColor = isCompleted
    ? theme['color-primary-500']
    : theme['color-danger-500'];

  return (
    <ScreenWrapper
      statusBarColor={theme['background-basic-color-1']}
      barStyle="dark-content"
      scrollType="scroll"
      scrollViewProps={ScrollViewProps({theme})}>
      {isLoading && <Loader />}
      <Container>
        <Wrapper>
          <Title category="label">{title}</Title>
          <IconWrapper onPress={onStatusUpdate}>
            <StyledIcon name="checkmark-circle-outline" fill={iconFillColor} />
          </IconWrapper>
        </Wrapper>
        <Deadline>{`Due: ${dayjs(deadline).format('yyyy-MM-dd')}`}</Deadline>
        <Description>{description}</Description>
        {hangoutLink.length && (
          <JoinMeetingButton
            onPress={() => navigateToURL(hangoutLink)}
            appearance="filled"
            status="success">
            Join Meeting
          </JoinMeetingButton>
        )}
      </Container>
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(!visible)}
        onBackdropPress={() => setVisible(!visible)}
        task={task}
      />
    </ScreenWrapper>
  );
};

export default Details;

const ScrollViewProps = ({theme}) =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  });
