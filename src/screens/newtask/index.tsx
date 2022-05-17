import React from 'react';
import {Container, Label, InputContainer, Error, Info} from './styles';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {RenderInputController, RenderDateController} from '../../components';
import {LoadingButton} from '../../components';
import {useAddTaskMutation} from '../../store/slice/apiSlice';
import {TaskForm} from '../../types';

const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  isCompleted: yup.boolean().required(),
});
const NewTask = ({navigation}: NativeStackScreenProps<any>) => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
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
  const [addTask, {isError, error, isSuccess, isLoading}] =
    useAddTaskMutation();
  const onSubmit = ({title, description, date, isCompleted}: TaskForm) => {
    addTask({
      title: title,
      description: description,
      date: date,
      isCompleted: isCompleted,
    });
    // reset({
    //   title: getValues('title'),
    // });
    // console.log(getValues());
    reset();
  }; // function to call when user submit the form

  React.useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Home');
    }
  }, [isSuccess]);
  return (
    <ScreenWrapper>
      <Container>
        <Label category="label">Add New Task</Label>
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
          label="Add Task"
          isLoading={isLoading}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
        <Info>{isError && <Error>{error}</Error>}</Info>
      </Container>
    </ScreenWrapper>
  );
};

export default NewTask;
