import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast from 'react-native-toast-message';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';

import Loader from './src/components/Loader';
import Splash from './src/screens/Auth/Splash';
import RootStack from './src/navigation/RootStack';

let persistor = persistStore(store);

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  return (
    <>
      {isSplash ? (
        <Splash />
      ) : (
        <>
          <SafeAreaView>
            <StatusBar
              barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}
              backgroundColor={'white'}
            />
          </SafeAreaView>
          <Provider store={store}>
            <Loader />
            <PersistGate persistor={persistor}>
              <NavigationContainer theme={{colors: {background: 'white'}}}>
                <RootStack />
                <Toast />
              </NavigationContainer>
            </PersistGate>
          </Provider>
        </>
      )}
    </>
  );
};

export default App;
