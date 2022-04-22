import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens';
//import {useGetUserByDeviceIdQuery} from '../store/services/service';

const Stack = createNativeStackNavigator();
const navigationContainerRef = createNavigationContainerRef();

const Navigation = () => {
  //const result = useGetUserByDeviceIdQuery(34499);
  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
