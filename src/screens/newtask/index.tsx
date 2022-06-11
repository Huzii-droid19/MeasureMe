import React, {useLayoutEffect} from 'react';
import {Container, Error, StyledIcon} from './styles';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
  MeetupButton,
  CheckBox,
} from 'components/index';
import {Todo, Calendar} from 'store/api/index';
import {TaskForm} from 'types/index';
import {ImageProps, StyleProp, TextStyle} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {createEvent, createTask} from 'services/index';

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
      date: new Date(new Date().getTime() + 86400000),
      isCompleted: false,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization

  const onSubmit = async () => {
    if (googleCalendarState.isEventAdded) {
      const {isMeetupAdded} = googleCalendarState;
      const data = await createEvent(
        getValues,
        addTaskToGoogleCalendar,
        isMeetupAdded,
      );
      await createTask(getValues, addTask, data?.id);
    } else await createTask(getValues, addTask);
    setGoogleCalendarState({
      isEventAdded: false,
      isMeetupAdded: false,
    });
    reset();
    navigation.goBack();
  };

  const titleTextStyle = {
    fontSize: 25,
    fontWeight: '600',
    minHeight: 64,
    paddingLeft: 40,
  } as StyleProp<TextStyle>;
  const descriptionTextStyle = {
    fontSize: 16,
    minHeight: 64,
    fontWeight: '400',
  } as StyleProp<TextStyle>;

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
          textStyle={titleTextStyle}
          placeholder="Add title"
        />
        <Error>{errors.title && errors.title.message}</Error>
        <RenderInputController
          name="description"
          inputControl={control}
          multiline={true}
          textStyle={descriptionTextStyle}
          placeholder="Add description"
          accessoryLeft={(props: ImageProps) => (
            <StyledIcon {...props} name="menu-2-outline" />
          )}
        />
        <Error>{errors.description && errors.description.message}</Error>
        <RenderDateController
          name="date"
          inputControl={control}
          setValue={setValue}
          getValues={getValues}
        />
        <Error>{errors.date && errors.date.message}</Error>
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
