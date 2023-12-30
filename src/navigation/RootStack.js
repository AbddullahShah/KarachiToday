import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// screen
import MainStack from './MainStack';
import Onboard from '../screens/Auth/Onboard';
import BlogDetail from '../screens/App/BlogDetail';

const Stack = createNativeStackNavigator();

const RootStack = ({ itemId, isFlag }) => {
  const isOnboard = useSelector(state => state.user.isOnboard);
  const navigation = useNavigation();
  const { isLogin } = useSelector(state => state.user);

  useEffect(() => {
    isLogin && itemId && navigation.navigate('BlogDetail', { id: itemId })
  }, [itemId, isFlag]);

  return (
    <Stack.Navigator
      initialRouteName={isOnboard ? 'Onboard' : 'MainStack'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
    </Stack.Navigator>
  );
};

export default RootStack;
