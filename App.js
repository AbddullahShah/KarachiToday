import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Platform, SafeAreaView, StatusBar, Linking, Alert } from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import Loader from './src/components/Loader';
import Splash from './src/screens/Auth/Splash';
import RootStack from './src/navigation/RootStack';

let persistor = persistStore(store);

const App = () => {
  const [isSplash, setIsSplash] = useState(true);
  const [productId, setproductId] = useState(null);
  const [isFlag, setisFlag] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // Check if the app was opened via a deep link with shared data
    const handleInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log(initialUrl, 'initialUrl');
        handleSharedData(initialUrl);
      } else {
        // Open the browser or perform other actions if no shared data exists
        // openBrowser();
      }
    };
    handleInitialUrl();
    // Listen for incoming deep links while the app is running
    const handleDeepLink = ({ url }) => {
      handleSharedData(url);
    };
    Linking.addEventListener('url', handleDeepLink);
    // return () => {
    //   Linking.removeEventListener('url', handleDeepLink);
    // };
  }, []);

  const handleSharedData = async (link) => {
    let productId = await link.split('=').pop()
    console.log('productId:', productId,)
    setproductId(productId);
    setisFlag(!isFlag);
    // Handle the shared data here
    // For example, parse the URL or perform specific actions based on the data
    console.log('Received shared data:', link);
  };

  const openBrowser = () => {
    // Open the browser or perform other actions when no shared data exists
    // For instance, open a specific URL in the device's browser
    const urlToOpen = 'https://www.google.com';
    Linking.openURL(urlToOpen);
  };

  const HandleDeepLinking = () => {
    const handleDynamicLinks = async (link) => {
      console.log('Foreground link handling:', link)
      let productId = await link.url.split('=').pop()
      setproductId(productId)
      setisFlag(!isFlag)
    }
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
      return () => unsubscribe()
    }, [])
    return null
  }

  // const deepLinking = {
  //   prefixes: ['myapp://', 'https://myapp.com/'],
  //   config: {
  //     screens: {
  //       BlogDetail: 'BlogDetail/:id',
  //     },
  //   }
  // }


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
              <NavigationContainer
                // linking={deepLinking}
                theme={{ colors: { background: 'white' } }}
              >
                <HandleDeepLinking />
                <RootStack itemId={productId} isFlag={isFlag} />
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
