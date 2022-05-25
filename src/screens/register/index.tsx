import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Container, Label, InputContainer, Error, Info} from './styles';
import {useAddUserMutation} from '../../store/api';
import {getUniqueId} from 'react-native-device-info';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoadingButton, RenderInputController} from '../../components';
import {RegisterForm, User} from '../../types';
import {setUser} from '../../store/slice/authSlice';
import {useDispatch} from 'react-redux';

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
});

const Register = () => {
  const dispatch = useDispatch();
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
  const [addUser, {isError, error, isLoading}] = useAddUserMutation(); // add user mutation

  const onSubmit = async ({name, email}: RegisterForm) => {
    const deviceId = getUniqueId();
    await addUser({
      name: name,
      email: email,
      DeviceId: deviceId,
    }).then(res => {
      dispatch(setUser({isLoggedIn: true, userMeta: res?.data as User}));
    });
    reset();
  }; // function to call when user submit the form

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
          status="primary"
          appearance="filled"
        />
        <Info>{isError && <Error>{error}</Error>}</Info>
      </Container>
    </ScreenWrapper>
  );
};

export default Register;
