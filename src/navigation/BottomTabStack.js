import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// local imports
import colors from '../constants/colors';
import {fontsFamily, fontsSize} from '../constants/fonts';
import images from '../assets/images';

// screens
import Home from '../screens/App/Home';
import Profile from '../screens/App/Profile';
import Discover from '../screens/App/Discover';
import Bookmark from '../screens/App/Bookmark';

const Tab = createBottomTabNavigator();

const bottomTabData = [
  {
    name: 'Home',
    component: Home,
    image: images.Radio,
  },
  {
    name: 'Discover',
    component: Discover,
    image: images.Radio,
  },
  {
    name: 'Bookmark',
    component: Bookmark,
    image: images.Radio,
  },
  {
    name: 'Profile',
    component: Profile,
    image: images.Radio,
  },
];

const BottomTabStack = () => {
  const TabImage =
    (name, image) =>
    ({focused}) => {
      return (
        <View style={styles.iconBox}>
          <Image
            source={image}
            style={styles.tabImage(focused)}
            resizeMode="contain"
          />
          <Text style={styles.tabTitle(focused)}>{name}</Text>
        </View>
      );
    };
  return (
    <Tab.Navigator
      initialRouteName={bottomTabData[0].name}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.mainTabbar,
      }}>
      {bottomTabData.map(tab => {
        return (
          <Tab.Screen
            name={tab.name}
            component={tab.component}
            options={{tabBarIcon: TabImage(tab.name, tab.image)}}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  mainTabbar: {
    height:
      Platform.OS === 'ios'
        ? heightPercentageToDP(11)
        : heightPercentageToDP(10),
    backgroundColor: colors.bg,
    borderTopWidth: undefined,
    backgroundColor: 'white',
    marginTop: heightPercentageToDP(2),
    borderTopRightRadius: widthPercentageToDP(10),
    borderTopLeftRadius: widthPercentageToDP(10),
    elevation: 10,
  },
  iconBox: {
    width: widthPercentageToDP(20),
    height: heightPercentageToDP(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabImage: focused => ({
    width: widthPercentageToDP(5.5),
    height: widthPercentageToDP(5.5),
    tintColor: !focused ? 'grey' : colors.primary,
  }),
  tabTitle: focused => ({
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.sm1,
    marginTop: heightPercentageToDP(1),
    color: !focused ? 'grey' : colors.primary,
  }),
});
