import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  RegisterScreen,
  DetailsScreen,
  NewTaskScreen,
  EditTaskScreen,
} from '../screens';
import {useTheme} from '@ui-kitten/components';

const Stack = createNativeStackNavigator();
const navigationContainerRef = createNavigationContainerRef();

const Navigation = ({route}: {route: string}) => {
  const theme = useTheme();
  const options = {
    headerShown: true,
    title: '',
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: theme['background-basic-color-1'],
    },
  };
  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={route}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={options}
        />
        <Stack.Screen name="NewTask" component={NewTaskScreen} />
        <Stack.Screen name="Edit" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
