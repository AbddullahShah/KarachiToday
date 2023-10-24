import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import AuthWrapper from '../screens/Auth/AuthWrapper';
import Languages from '../screens/App/Languages';
import CustomizeNews from '../screens/App/CustomizeNews';
import EditProfile from '../screens/App/EditProfile';
import Success from '../screens/App/Success';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import OTPVerify from '../screens/Auth/OTPVerify';
import ResetPassword from '../screens/Auth/ResetPassword';

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
      <Stack.Screen name="CustomizeNews" component={CustomizeNews} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OTPVerify" component={OTPVerify} />
    </Stack.Navigator>
  );
};

export default AuthStack;
