import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';
import {useGetUserByDeviceIdQuery} from './store/api';
import {getUniqueId} from 'react-native-device-info';
import {Appearance} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {Loader} from './components';
import CustomTheme from './assets/theme/custom-theme.json';
import Toast from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components';
import {setUser} from './store/slice/authSlice';
import {useDispatch} from 'react-redux';
import * as _ from 'lodash';

const Index = () => {
  const {isSuccess, isLoading, data} = useGetUserByDeviceIdQuery(getUniqueId());
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && !_.isEmpty(data)) {
      dispatch(setUser({isLoggedIn: true, userMeta: data}));
    }
    SplashScreen.hide();
  }, [isSuccess]);
  return <>{isLoading ? <Loader /> : <Navigation />}</>;
};

const App = () => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === 'dark' ? eva.dark : eva.light,
  );
  useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? eva.dark : eva.light);
    });
  }, []);

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
