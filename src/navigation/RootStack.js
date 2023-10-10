import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screen
import MainStack from './MainStack';
import Onboard from '../screens/Auth/Onboard';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const isOnboard = useSelector(state => state.user.isOnboard);
  console.log(isOnboard);

  return (
    <Stack.Navigator
      initialRouteName={isOnboard ? 'Onboard' : 'MainStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
