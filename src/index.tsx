import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
