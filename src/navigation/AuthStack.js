import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import AuthWrapper from '../screens/Auth/AuthWrapper';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthWrapper"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthWrapper" component={AuthWrapper} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
