import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import BottomTabStack from './BottomTabStack';
import Trending from '../screens/App/Trending';
import RecentStories from '../screens/App/RecentStories';
import BlogDetail from '../screens/App/BlogDetail';
import Comments from '../screens/App/Comments';
import Search from '../screens/App/Search';
import Notification from '../screens/App/Notification';

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
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default HomeStack;
