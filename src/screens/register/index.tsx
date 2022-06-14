import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {getUniqueId} from 'react-native-device-info';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {pathOr} from 'ramda';
import {useTheme} from '@ui-kitten/components';

import {
  Container,
  Label,
  InputContainer,
  Error,
  ButtonContainer,
} from './styles';
import {Todo} from 'store/api';
import {LoadingButton, RenderInputController} from 'components';
import {RegisterForm, User} from 'types';
import {setAuthUser} from 'store/slice/authSlice';
import {AuthenticationIllustration} from 'assets';
import {addToast} from 'utils';
import {registerSchema} from 'schemas';

const Register = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
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
    mode: 'all',
  }); // form intialization
  const [addUser, {isLoading}] = Todo.useAddUserMutation(); // add user mutation

  const onSubmit = async ({name, email}: RegisterForm) => {
    try {
      const {data, error} = await addUser({
        name: name,
        email: email,
        DeviceId: getUniqueId(),
      });
      if (error) {
        throw new Error(error);
      }
      dispatch(setAuthUser({isLoggedIn: true, userMeta: data as User}));
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      reset();
    }
  }; // function to call when user submit the form

  return (
    <ScreenWrapper
      scrollType="keyboard"
      barStyle="dark-content"
      scrollViewProps={ScrollViewProps({theme})}
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <AuthenticationIllustration
          height={100}
          width={100}
          style={styles({theme}).illustrationStyle}
        />
        <Label category="label">Register</Label>
        <InputContainer>
          <RenderInputController
            name="Name"
            inputControl={control}
            placeholder="Your name"
            textStyle={styles({theme}).textStyle}
          />
          <Error>{pathOr('', ['name', 'message'], errors)}</Error>
          <RenderInputController
            name="Email"
            inputControl={control}
            placeholder="Your email"
            textStyle={styles({theme}).textStyle}
          />
          <Error>{pathOr('', ['email', 'message'], errors)}</Error>
        </InputContainer>
        <ButtonContainer>
          <LoadingButton
            size="medium"
            label="Register"
            width={200}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={!isValid}
            status="primary"
            appearance="filled"
          />
        </ButtonContainer>
      </Container>
    </ScreenWrapper>
  );
};

export default Register;

const ScrollViewProps = ({theme}) =>
  StyleSheet.create({
    style: {
      backgroundColor: theme['background-basic-color-1'],
    },
  });

const styles = ({theme}) =>
  StyleSheet.create({
    textStyle: {
      fontSize: 16,
      minHeight: 40,
      fontWeight: '400',
    },
    illustrationStyle: {
      marginVertical: 100,
    },
    ScrollViewStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  });
