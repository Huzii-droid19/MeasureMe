import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, RegisterScreen, DetailsScreen} from '../screens';
import {useSelector} from 'react-redux';
import {userApi} from '../store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {HeaderBackground} from './styles';

const Stack = createNativeStackNavigator();
const navigationContainerRef = createNavigationContainerRef();

const Navigation = () => {
  const result = useSelector(
    userApi.endpoints.getUserByDeviceId.select(getUniqueId()),
  );

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          result.data.slice(0, 1)[0]?.DeviceId === getUniqueId()
            ? 'Home'
            : 'Register'
        }>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{
          //   headerBackground: () => (
          //     <HeaderBackground>
          //       <Text>ads</Text>
          //     </HeaderBackground>
          //   ),
          //   headerStyle: {
          //     backgroundColor: '#f4511e',
          //   },
          //   headerLargeTitle: true,
          // }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
