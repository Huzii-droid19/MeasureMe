import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {ImageProps, StyleSheet} from 'react-native';
import {pathOr} from 'ramda';
import moment from 'moment';
import {useTheme} from '@ui-kitten/components';

import {Container, Error, StyledIcon} from './styles';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
  MeetupButton,
  CheckBox,
} from 'components';
import {Todo, Calendar} from 'store/api';
import {TaskForm} from 'types';
import {createEvent, createTask} from 'services';

const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  isCompleted: yup.boolean(),
});

const NewTask = ({navigation}) => {
  const theme = useTheme();
  const [addTask, {isLoading: taskLoader}] = Todo.useAddTaskMutation();
  const [googleCalendarState, setGoogleCalendarState] = React.useState({
    isEventAdded: false,
    isMeetupAdded: false,
  });
  const [addTaskToGoogleCalendar, {isLoading: googleLoader}] =
    Calendar.useAddTaskToGoogleCalendarMutation();
  const {
    control,
    setValue,
    getValues,
    formState: {errors, isValid},
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      title: '',
      description: '',
      date: moment().add(1, 'day').toDate(),
      isCompleted: false,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization

  const onSubmit = async () => {
    const {isEventAdded, isMeetupAdded} = googleCalendarState;
    const {date, description, title, isCompleted} = getValues();
    let data: Record<string, any> = {};
    if (isEventAdded) {
      data = await createEvent(
        title,
        description,
        date,
        addTaskToGoogleCalendar,
        isMeetupAdded,
      );
    }
    await createTask(
      title,
      description,
      date,
      isCompleted,
      addTask,
      pathOr('', ['id'], data),
      pathOr('', ['hangoutLink'], data),
    );
    setGoogleCalendarState({
      isEventAdded: false,
      isMeetupAdded: false,
    });
    reset();
    navigation.goBack();
  };

  const textStyle = StyleSheet.create({
    titleTextStyle: {
      fontSize: 25,
      fontWeight: '600',
      minHeight: 64,
      paddingLeft: 40,
    },
    descriptionTextStyle: {
      fontSize: 16,
      minHeight: 64,
      fontWeight: '400',
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LoadingButton
          size="small"
          label="Add Task"
          isLoading={taskLoader || googleLoader}
          disabled={!isValid}
          onPress={onSubmit}
          status="primary"
          appearance="filled"
        />
      ),
    });
  }, [isValid, taskLoader, googleLoader, googleCalendarState]);

  const onMeetupAdded = (isMeetupAdded: boolean) => {
    setGoogleCalendarState({
      ...googleCalendarState,
      isMeetupAdded: isMeetupAdded,
    });
  };

  return (
    <ScreenWrapper
      barStyle="dark-content"
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <RenderInputController
          name="title"
          inputControl={control}
          textStyle={textStyle.titleTextStyle}
          placeholder="Add title"
        />
        <Error>{pathOr(null, ['title', 'message'], errors)}</Error>
        <RenderInputController
          name="description"
          inputControl={control}
          multiline={true}
          textStyle={textStyle.descriptionTextStyle}
          placeholder="Add description"
          accessoryLeft={(props: ImageProps) => (
            <StyledIcon {...props} name="menu-2-outline" />
          )}
        />
        <Error>{pathOr(null, ['description', 'message'], errors)}</Error>
        <RenderDateController
          name="date"
          inputControl={control}
          setValue={setValue}
          getValues={getValues}
        />
        <Error>{pathOr(null, ['date', 'message'], errors)}</Error>
        <CheckBox
          value={googleCalendarState.isEventAdded}
          onChange={() =>
            setGoogleCalendarState({
              ...googleCalendarState,
              isEventAdded: !googleCalendarState.isEventAdded,
            })
          }
          label="Add task to google calendar"
        />
        {googleCalendarState.isEventAdded && (
          <MeetupButton
            isMeetupAdded={googleCalendarState.isMeetupAdded}
            setIsMeetUpAdded={() =>
              onMeetupAdded(!googleCalendarState.isMeetupAdded)
            }
          />
        )}
      </Container>
    </ScreenWrapper>
  );
};

export default NewTask;
