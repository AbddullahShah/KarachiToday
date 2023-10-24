import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// local imports
import colors from '../../constants/colors';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/userSlice';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          dispatch(logoutUser());
          navigation.reset({
            index: 0,
            routes: [{name: 'MainStack'}],
          });
        }}>
        Logout
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
