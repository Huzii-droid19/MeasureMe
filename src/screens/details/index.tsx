import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {pathOr} from 'ramda';
import {StyleSheet} from 'react-native';
import moment from 'moment';

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
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();

  const ScrollViewProps = StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  });
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
        isCompleted: !task.isCompleted,
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
          <Title category="label">{pathOr('', ['title'], task)}</Title>
          <IconWrapper onPress={onStatusUpdate}>
            <StyledIcon name="checkmark-circle-outline" fill={iconFillColor} />
          </IconWrapper>
        </Wrapper>
        <Deadline>{`Due: ${moment(pathOr('', ['date'], task)).format(
          'YYYY-MM-DD',
        )}`}</Deadline>
        <Description>{pathOr('', ['description'], task)}</Description>
        {pathOr('', ['hangoutLink', 'length'], task) > 0 && (
          <JoinMeetingButton
            onPress={() => navigateToURL(pathOr('', ['hangoutLink'], task))}
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
