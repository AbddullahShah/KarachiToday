import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// screens
import BottomTabStack from './BottomTabStack';
import Trending from '../screens/App/Trending';
import RecentStories from '../screens/App/RecentStories';
import BlogDetail from '../screens/App/BlogDetail';
import Comments from '../screens/App/Comments';
import Search from '../screens/App/Search';
import Notification from '../screens/App/Notification';
import EditProfile from '../screens/App/EditProfileInsideApp';
import SendFeedback from '../screens/App/SendFeedback';

const Stack = createNativeStackNavigator();


const HomeStack = () => {
  const { isLogin, userData } = useSelector(state => state.user);
  // console.log(userData.user.name, "isLoginisLoginisLoginisLogin")
  return (
    <Stack.Navigator
      // initialRouteName={'BottomTabStack'}
      initialRouteName={userData?.user?.name && userData?.user?.name != undefined ? 'BottomTabStack' : 'EditProfile'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="Trending" component={Trending} />
      <Stack.Screen name="RecentStories" component={RecentStories} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SendFeedback" component={SendFeedback} />

    </Stack.Navigator>
  );
};

export default HomeStack;
