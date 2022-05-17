import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Container, Label, InputContainer, Error, Info} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAddUserMutation} from '../../store/slice/apiSlice';
import {getUniqueId} from 'react-native-device-info';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoadingButton, RenderInputController} from '../../components';
import {RegisterForm} from '../../types';

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
});

const Register = ({navigation}: NativeStackScreenProps<any>) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      name: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  }); // form intialization
  const [addUser, {isError, error, isLoading, isSuccess}] =
    useAddUserMutation(); // add user mutation

  const onSubmit = ({name, email}: RegisterForm) => {
    const deviceId = getUniqueId();
    addUser({
      name: name,
      email: email,
      DeviceId: deviceId,
    });

    reset();
  }; // function to call when user submit the form
  React.useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Home');
    }
  }, [isSuccess, navigation]); // if user is successfully added navigate to home screen

  // Controller for input fields

  return (
    <ScreenWrapper>
      <Container>
        <Label category="label">Register</Label>
        <InputContainer>
          <RenderInputController label="Name" inputControl={control} />
          {errors.name && <Error>{errors.name.message}</Error>}
          <RenderInputController label="Email" inputControl={control} />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputContainer>
        <LoadingButton
          label="Register"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={!isValid}
        />
        <Info>{isError && <Error>{error}</Error>}</Info>
      </Container>
    </ScreenWrapper>
  );
};

export default Register;
