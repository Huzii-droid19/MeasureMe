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
import {TaskForm} from '../../types';
import {Task} from '../../types';
import {NavigationProp, RouteProp} from '@react-navigation/native';

type EditScreenProps = {
  route: RouteProp<{params: {item: Task}}, 'params'>;
  navigation: NavigationProp<any>;
};

const EditTask = ({navigation, route}: EditScreenProps) => {
  const {item}: {item: Task} = route.params;
  const taskSchema = yup.object().shape({
    title: yup
      .string()
      .required()
      .test('isTitleEdit', '', value => {
        if (value === item.title) {
          return true;
        }
        return false;
      }),
    description: yup
      .string()
      .required()
      .test('isDescriptionEdit', '', value => {
        if (value === item.description) {
          return true;
        }
        return false;
      }),
    date: yup.date().required(),
    isCompleted: yup.boolean().required(),
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

  const onSubmit = ({title, description, date, isCompleted}: TaskForm) => {
    navigation.goBack();
    reset();
  }; // function to call when user submit the form
  return (
    <ScreenWrapper>
      <Container>
        <Label>Edit Task</Label>
        <InputContainer>
          <RenderInputController label="Title" inputControl={control} />
          {errors.title && <Error>{errors.title.message}</Error>}
          <RenderInputController label="Description" inputControl={control} />
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
          isLoading={false}
          disabled={isValid}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default EditTask;
