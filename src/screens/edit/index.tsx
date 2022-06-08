import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Container, Error, Info, InputContainer, Label} from './styles';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
} from 'components/index';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TaskForm, Task} from 'types/index';
import {RouteProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {Todo} from 'store/api/index';
import {NavigationService} from 'navigation/index';

type EditScreenProps = {
  route: RouteProp<{params: {task: Task}}, 'params'>;
};

const EditTask = ({route}: EditScreenProps) => {
  const {useEditTaskMutation} = Todo;
  const {task}: {task: Task} = route.params;
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
      title: task?.title,
      description: task.description,
      date: new Date(task.date),
      isCompleted: task.isCompleted,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization
  const [editTask, {isLoading, isError, error}] = useEditTaskMutation();

  const onSubmit = async ({title, description, date}: TaskForm) => {
    await editTask({
      id: task.id,
      title,
      description,
      date,
      isCompleted: false,
      userId: task.userId,
    }).then(res => {
      NavigationService.goBack();
    });
    reset();
  }; // function to call when user submit the form
  const theme = useTheme();
  return (
    <ScreenWrapper
      barStyle="dark-content"
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <Label>Edit Task</Label>
        <InputContainer>
          <RenderInputController
            name="title"
            inputControl={control}
            placeholder="Title"
          />
          {errors.title && <Error>{errors.title.message}</Error>}
          <RenderInputController
            name="description"
            inputControl={control}
            multiline={true}
            placeholder="Description"
          />
          {errors.description && <Error>{errors.description.message}</Error>}
          <RenderDateController
            name="date"
            inputControl={control}
            setValue={setValue}
            getValues={getValues}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </InputContainer>
        <LoadingButton
          size="medium"
          width="45%"
          label="Edit Task"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={!isValid}
          status="primary"
          appearance="filled"
        />
        <Info>{isError && <Error>{error}</Error>}</Info>
      </Container>
    </ScreenWrapper>
  );
};

export default EditTask;
