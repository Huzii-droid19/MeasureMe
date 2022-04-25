import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAddUserMutation} from '../../store/services/service';
import {getUniqueId} from 'react-native-device-info';
const Register = ({navigation, route}: NativeStackScreenProps<any>) => {
  const [name, setName] = React.useState('');
  const [addUser] = useAddUserMutation();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter name"
          value={name}
          defaultValue={name}
          editable={true}
          onChangeText={text => setName(text)}
        />
        <Button
          title="Register"
          onPress={() => {
            addUser({
              name: name,
              DeviceId: getUniqueId(),
            });
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }, 1000);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Register;
