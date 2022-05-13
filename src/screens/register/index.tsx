import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  Container,
  Label,
  InputContainer,
  StyledInput,
  Error,
  SubmitButton,
  InputLabel,
  Info,
} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAddUserMutation} from '../../store/slice/apiSlice';
import {getUniqueId} from 'react-native-device-info';
import {useForm, Controller} from 'react-hook-form';
import {Spinner} from '@ui-kitten/components';

interface RegisterForm {
  email: string;
  name: string;
}

const Register = ({navigation}: NativeStackScreenProps<any>) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      name: '',
    },
  });
  const [addUser, {isError, error, isLoading, isSuccess}] =
    useAddUserMutation();

  const onSubmit = ({name, email}: {name: string; email: string}) => {
    const deviceId = getUniqueId();
    addUser({
      name: name,
      email: email,
      DeviceId: deviceId,
    });
  };
  React.useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Home');
    }
  }, [isSuccess]);
  return (
    <ScreenWrapper>
      <Container>
        <Label category="label">Register</Label>
        <InputContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledInput
                label={() => {
                  return <InputLabel>Name</InputLabel>;
                }}
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          {errors.name && <Error>This is required</Error>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledInput
                label={() => {
                  return <InputLabel>Email</InputLabel>;
                }}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && <Error>This is required</Error>}
        </InputContainer>
        <SubmitButton onPress={handleSubmit(onSubmit)}>Register</SubmitButton>
        <Info>
          {isLoading && <Spinner size="small" animating={true} />}
          {isError && <Error>{error}</Error>}
        </Info>
      </Container>
    </ScreenWrapper>
  );
};

export default Register;
