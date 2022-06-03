import React from 'react';
import {
  Container,
  Label,
  InputContainer,
  Error,
  Info,
  StyledCheckBox,
  CheckBoxLabel,
} from './styles';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
} from 'components/index';
import {useAddTaskMutation} from 'store/api/index';
import {TaskForm} from 'types/index';
import {NavigationService} from 'navigation/index';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAddTaskToGoogleCalendarMutation} from 'store/api/index';
import {addToast} from 'utils/index';
import {GOOGLE_CLIENT_ID} from '@env';

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
  isCompleted: yup.boolean().required(),
});

const NewTask = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
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
      date: new Date(),
      isCompleted: false,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization

  const [addTask, {isError, error, isLoading}] = useAddTaskMutation();
  const [AddTaskToGoogleCalendar] = useAddTaskToGoogleCalendarMutation();

  const onSubmit = async () => {
    try {
      if (checked) await handleSignIn();
      await createTask();
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  }; // function to call when user submit the form

  const createTask = async () => {
    await addTask({
      title: getValues().title,
      description: getValues().description,
      date: getValues().date,
      isCompleted: false,
    }).then(() => {
      NavigationService.goBack();
    });
    reset();
  };

  const handleSignIn = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    if (await GoogleSignin.isSignedIn()) {
      const {accessToken} = await GoogleSignin.getTokens();
      const {title, description, date} = getValues();
      await AddTaskToGoogleCalendar({
        task: {
          summary: title,
          description: description,
          start: {dateTime: new Date()},
          end: {dateTime: date},
        },
        accessToken: accessToken,
      });
    }
  };

  return (
    <ScreenWrapper>
      <Container>
        <Label category="label">Add New Task</Label>
        <InputContainer>
          <RenderInputController label="Title" inputControl={control} />
          {errors.title && <Error>{errors.title.message}</Error>}
          <RenderInputController
            label="Description"
            inputControl={control}
            multiline={true}
            minHeight={64}
          />
          {errors.description && <Error>{errors.description.message}</Error>}
          <RenderDateController
            label="Deadline"
            inputControl={control}
            setValue={setValue}
            getValues={getValues}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </InputContainer>
        <StyledCheckBox checked={checked} onChange={() => setChecked(!checked)}>
          <CheckBoxLabel>Add to google calendar</CheckBoxLabel>
        </StyledCheckBox>
        <LoadingButton
          label="Add Task"
          isLoading={isLoading}
          disabled={!isValid}
          onPress={onSubmit}
          status="primary"
          appearance="filled"
        />
        <Info>{isError && <Error>{error}</Error>}</Info>
      </Container>
    </ScreenWrapper>
  );
};

export default NewTask;
