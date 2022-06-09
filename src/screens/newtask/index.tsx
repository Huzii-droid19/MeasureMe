import React, {useLayoutEffect} from 'react';
import {
  Container,
  Error,
  StyledCheckBox,
  CheckBoxLabel,
  StyledIcon,
} from './styles';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
  MeetupButton,
} from 'components/index';
import {Todo, Calendar} from 'store/api/index';
import {TaskForm, MeetButtonParams} from 'types/index';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {addToast} from 'utils/index';
import {GOOGLE_CLIENT_ID} from '@env';
import {ImageProps, StyleProp, TextStyle} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {signInToGoogle} from 'config/index';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID, // this is web client id (Not Android)
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
});

const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  isCompleted: yup.boolean(),
});

const NewTask = ({navigation}) => {
  const {useAddTaskMutation} = Todo;
  const {useAddTaskToGoogleCalendarMutation} = Calendar;
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isMeetUpAdded, setIsMeetUpAdded] = React.useState<MeetButtonParams>({
    isAdded: false,
    iconName: 'video-off-outline',
    meetUpText: 'Add video conference',
  });
  const [addTask, {isLoading: taskLoader}] = useAddTaskMutation();
  const [addTaskToGoogleCalendar, {isLoading: googleLoader}] =
    useAddTaskToGoogleCalendarMutation();
  const {
    control,
    setValue,
    getValues,
    formState: {errors, isValid},
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      title: undefined,
      description: undefined,
      date: new Date(new Date().getTime() + 86400000),
      isCompleted: false,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization

  const onSubmit = async () => {
    try {
      if (checked) {
        const {title, description, date} = getValues();
        const accessToken = (await signInToGoogle()) as string;
        const {data, error} = (await addTaskToGoogleCalendar({
          task: {
            summary: title,
            description: description,
            start: {
              dateTime: new Date(),
            },
            end: {
              dateTime: date,
            },
            conferenceData: isMeetUpAdded.isAdded
              ? {
                  createRequest: {
                    conferenceSolutionKey: {
                      type: 'hangoutsMeet',
                    },
                    requestId: Math.random().toString(36).substring(2),
                  },
                }
              : {},
          },
          accessToken,
        })) as any;
        if (error) {
          throw new Error(error);
        }
        await createTask(data?.id);
      } else await createTask();
      reset();
      setChecked(false);
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const createTask = async (eventId = '') => {
    const {title, description, date, isCompleted} = getValues();
    await addTask({
      title: title,
      description: description,
      date: date,
      isCompleted: isCompleted,
      eventId: eventId,
    });
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

  const theme = useTheme();
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
  }, [isValid, taskLoader, googleLoader, checked, isMeetUpAdded]);

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
        <StyledCheckBox checked={checked} onChange={() => setChecked(!checked)}>
          <CheckBoxLabel>Add to google calendar</CheckBoxLabel>
        </StyledCheckBox>
        {checked && (
          <MeetupButton meet={isMeetUpAdded} setMeet={setIsMeetUpAdded} />
        )}
      </Container>
    </ScreenWrapper>
  );
};

export default NewTask;
