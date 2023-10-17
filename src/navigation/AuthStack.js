import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import AuthWrapper from '../screens/Auth/AuthWrapper';
import Languages from '../screens/App/Languages';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthWrapper"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthWrapper" component={AuthWrapper} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Languages" component={Languages} />
    </Stack.Navigator>
  );
};

export default AuthStack;
