import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  Container,
  Label,
  InputContainer,
  Error,
  ButtonContainer,
} from './styles';
import {Todo} from 'store/api/index';
import {getUniqueId} from 'react-native-device-info';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoadingButton, RenderInputController} from 'components/index';
import {RegisterForm, User} from 'types/index';
import {setAuthUser} from 'store/slice/authSlice';
import {useDispatch} from 'react-redux';
import {useTheme} from '@ui-kitten/components';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {AuthenticationIllustration} from 'assets/index';
import {addToast} from 'utils/index';
import {pathOr} from 'ramda';

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
});

const Register = () => {
  const {useAddUserMutation} = Todo;
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
  const [addUser, {isLoading}] = useAddUserMutation(); // add user mutation

  const onSubmit = async ({name, email}: RegisterForm) => {
    try {
      const deviceId = getUniqueId();
      const {data, error} = await addUser({
        name: name,
        email: email,
        DeviceId: deviceId,
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
  const theme = useTheme();
  const textStyle = {
    fontSize: 16,
    minHeight: 40,
    fontWeight: '400',
  } as StyleProp<TextStyle>;

  const illustrationStyle = {
    marginVertical: 100,
  } as StyleProp<ViewStyle>;
  const ScrollViewProps = {
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  };

  return (
    <ScreenWrapper
      scrollType="keyboard"
      barStyle="dark-content"
      scrollViewProps={ScrollViewProps}
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <AuthenticationIllustration
          height={150}
          width={150}
          style={illustrationStyle}
        />
        <Label category="label">Register</Label>
        <InputContainer>
          <RenderInputController
            name="Name"
            inputControl={control}
            placeholder="Your name"
            textStyle={textStyle}
          />
          <Error>{pathOr('', ['name', 'message'], errors)}</Error>
          <RenderInputController
            name="Email"
            inputControl={control}
            placeholder="Your email"
            textStyle={textStyle}
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
