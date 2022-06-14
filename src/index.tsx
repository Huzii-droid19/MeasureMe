import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {getUniqueId} from 'react-native-device-info';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components';
import {isEmpty} from 'ramda';

import {store} from 'store';
import Navigation from 'navigation';
import {Todo} from 'store/api';
import {Appearance} from 'react-native';
import {Loader} from 'components';
import {CustomTheme} from 'assets';
import {setAuthUser} from 'store/slice/authSlice';

const Index = () => {
  const {isSuccess, isLoading, data} = Todo.useGetUserByDeviceIdQuery(
    getUniqueId(),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && !isEmpty(data))
      dispatch(setAuthUser({isLoggedIn: true, userMeta: data}));
    SplashScreen.hide();
  }, [isSuccess]);
  return isLoading ? <Loader /> : <Navigation />;
};

const App = () => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === 'dark' ? eva.dark : eva.light,
  );
  Appearance.addChangeListener(({colorScheme}) => {
    setTheme(colorScheme === 'dark' ? eva.dark : eva.light);
  });

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...theme, ...CustomTheme}}>
        <ThemeProvider theme={{...theme, ...CustomTheme}}>
          <Index />
          <Toast />
        </ThemeProvider>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
