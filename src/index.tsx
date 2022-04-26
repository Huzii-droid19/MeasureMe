import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';
import {useGetUserByDeviceIdQuery} from './store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {ActivityIndicator} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

const Index = () => {
  const {isSuccess} = useGetUserByDeviceIdQuery(getUniqueId());
  return isSuccess ? (
    <Navigation />
  ) : (
    <ActivityIndicator
      size="large"
      color="#0000ff"
      animating
      hidesWhenStopped
    />
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Index />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
