import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';
import {useGetUserByDeviceIdQuery} from './store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {ActivityIndicator} from 'react-native';

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
      <Index />
    </Provider>
  );
};

export default App;
