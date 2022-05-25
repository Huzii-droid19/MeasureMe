import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Container, Error, Info, InputContainer, Label} from './styles';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
} from '../../components';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {TaskForm, Task} from '../../types';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {useEditTaskMutation} from '../../store/api';
import {navigationContainerRef} from '../../navigation';

type EditScreenProps = {
  route: RouteProp<{params: {item: Task}}, 'params'>;
  navigation: NavigationProp<any>;
};

const EditTask = ({route}: EditScreenProps) => {
  const {item}: {item: Task} = route.params;
  const taskSchema = yup.object().shape({
    title: yup
      .string()
      .required()

      .test('is-title', 'Title is not updated', value => {
        return value !== item.title;
      }),
    description: yup
      .string()
      .required()
      .test('is-description', 'Description is not updated', value => {
        return value !== item.description;
      }),
    date: yup
      .date()
      .required()
      .test('is-date', 'Date is not updated', value => {
        return value?.toDateString() !== new Date(item.date).toDateString();
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
      title: item?.title,
      description: item.description,
      date: new Date(item.date),
      isCompleted: item.isCompleted,
    },
    resolver: yupResolver(taskSchema),
    mode: 'all',
  }); // form intialization
  const [editTask, {isLoading, isError, error}] = useEditTaskMutation();

  const onSubmit = async ({title, description, date}: TaskForm) => {
    await editTask({
      id: item.id,
      title,
      description,
      date,
      isCompleted: false,
      userId: item.userId,
    }).then(res => {
      navigationContainerRef.goBack();
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
        <LoadingButton
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
