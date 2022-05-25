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
import {selectUser} from '../store/slice/authSlice';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
export const navigationContainerRef = createNavigationContainerRef<any>();

const Navigation = () => {
  const theme = useTheme();
  const options = {
    headerShown: true,
    title: '',
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: theme['background-basic-color-1'],
    },
  };
  const user = useSelector(selectUser);
  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user.isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={options}
            />
            <Stack.Screen
              name="NewTask"
              component={NewTaskScreen}
              options={options}
            />
            <Stack.Screen
              name="Edit"
              component={EditTaskScreen}
              options={options}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
