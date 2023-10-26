import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import BottomTabStack from './BottomTabStack';
import Trending from '../screens/App/Trending';
import RecentStories from '../screens/App/RecentStories';
import BlogDetail from '../screens/App/BlogDetail';
import Comments from '../screens/App/Comments';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabStack'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="Trending" component={Trending} />
      <Stack.Screen name="RecentStories" component={RecentStories} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default HomeStack;
