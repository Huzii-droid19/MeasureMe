import React, {useLayoutEffect} from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Container, Error, InputContainer, StyledIcon} from './styles';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
  MeetupButton,
  CheckBox,
} from 'components/index';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TaskForm, Task} from 'types/index';
import {RouteProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {Todo} from 'store/api/index';
import {ImageProps, StyleSheet} from 'react-native';
import {pathOr} from 'ramda';

type EditScreenProps = {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: any;
};

const EditTask = ({route, navigation}: EditScreenProps) => {
  const [editTask, {isLoading}] = Todo.useEditTaskMutation();
  const {task}: {task: Task} = route.params;
  const theme = useTheme();
  const [googleCalendarState, setGoogleCalendarState] = React.useState({
    isEventAdded: pathOr(false, ['eventId', 'length'], task) > 0,
    isMeetupAdded: pathOr(false, ['hangoutLink', 'length'], task) > 0,
  });
  const taskSchema = yup.object().shape({
    title: yup
      .string()
      .required()
      .test('is-title', 'Title is not updated', value => {
        return value !== task.title;
      }),
    description: yup
      .string()
      .required()
      .test('is-description', 'Description is not updated', value => {
        return value !== task.description;
      }),
    date: yup
      .date()
      .required()
      .test('is-date', 'Date is not updated', value => {
        return value?.toDateString() !== new Date(task.date).toDateString();
      }),
  });
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      title: pathOr('', ['title'], task),
      description: pathOr('', ['description'], task),
      date: new Date(pathOr('', ['date'], task)),
      isCompleted: pathOr(false, ['isCompleted'], task),
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization

  const onSubmit = async () => {
    const {date, description, title} = getValues();
    await editTask({...task, title, description, date});
    navigation.goBack();
    reset();
  }; // function to call when user submit the form

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LoadingButton
          size="small"
          label="Edit Task"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={!isValid}
          status="primary"
          appearance="filled"
        />
      ),
    });
  }, [isLoading, isValid]);

  const onMeetupAdded = (isMeetupAdded: boolean) => {
    setGoogleCalendarState({
      ...googleCalendarState,
      isMeetupAdded: isMeetupAdded,
    });
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

  return (
    <ScreenWrapper
      barStyle="dark-content"
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <InputContainer>
          <RenderInputController
            name="title"
            inputControl={control}
            textStyle={textStyle.titleTextStyle}
            placeholder="Title"
          />
          <Error>{pathOr('', ['title', 'message'], errors)}</Error>
          <RenderInputController
            name="description"
            inputControl={control}
            multiline={true}
            textStyle={textStyle.descriptionTextStyle}
            placeholder="Description"
            accessoryLeft={(props: ImageProps) => (
              <StyledIcon {...props} name="menu-2-outline" />
            )}
          />
          <Error>{pathOr('', ['description', 'message'], errors)}</Error>
          <RenderDateController
            name="date"
            inputControl={control}
            setValue={setValue}
            getValues={getValues}
          />
          <Error>{pathOr('', ['date', 'message'], errors)}</Error>
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
        </InputContainer>
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

export default EditTask;
