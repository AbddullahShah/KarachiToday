import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import BottomTabStack from './BottomTabStack';
import Trending from '../screens/App/Trending';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="Trending" component={Trending} />
    </Stack.Navigator>
  );
};

export default HomeStack;
