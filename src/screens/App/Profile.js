import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// local import
import colors from '../../constants/colors';
import images from '../../assets/images';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import { logoutUser } from '../../redux/userSlice';
import languages from '../../lang/languages';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isLogin, userData } = useSelector(state => state.user);
  const selectedLang = useSelector(state => state.language.selectedLang);
  console.log(userData?.user?.email, "")
  
  const logout = () => {
    Alert.alert('Logout your account', 'Are you sure logout your account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutUser());
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack' }],
          });
        },
      },
    ]);
  };

  const deleteAccount = () => {
    Alert.alert('Delete your account', 'Are you sure delete your account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutUser());
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack' }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View
            style={styles.avatar}
            activeOpacity={0.8}
          // onPress={() => { }}
          >
            <Image
              source={
                userData?.user?.profile_pic !== undefined
                  ? { uri: userData?.user?.profile_pic }
                  : images.Dummy
              }
              style={styles.img}
              resizeMode="cover"
            />
          </View>
          <View style={styles.card}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.text1}>Profile Info</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Image
                  source={images.Edit}
                  style={{ height: 20, width: 20 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            {userData?.user?.name && (
              <View style={styles.seprator}>
                <Text style={styles.text2}>Name</Text>
                <Text style={styles.text3}>{userData?.user?.name}</Text>
              </View>
            )}
            {userData?.user?.phone_number && (
              <View style={styles.seprator}>
                <Text style={styles.text2}>Phone</Text>
                <Text style={styles.text3}>{userData?.user?.phone_number}</Text>
              </View>
            )}
            {userData?.user?.email && (
              <View style={styles.seprator}>
                <Text style={styles.text2}>Email</Text>
                <Text style={styles.text3}>{userData?.user?.email.toLowerCase()}</Text>
                {/* let lowercasetext = text.toLowerCase(); //To convert Lower Case */}
              </View>
            )}
            {userData?.user?.bio && (
              <View style={styles.seprator}>
                <Text style={styles.text2}>Bio</Text>
                <Text style={styles.text3}>{userData?.user?.bio}</Text>
              </View>
            )}
          </View>

          <View style={{ alignItems: 'center', }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => deleteAccount()}
              style={[styles.card, styles.buttonResize, { backgroundColor: colors.primary, }]}>
              <Text style={[styles.text3, { color: colors.white }]}>
                Account Delete
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => logout()}
              style={[styles.card, styles.buttonResize, { backgroundColor: 'red' }]}>
              <Text style={[styles.text3, { color: colors.white }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: heightPercentageToDP(4),
  },
  mainWrapper: {
    width: '100%',
  },
  card: {
    backgroundColor: '#eaeaea',
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(3),
    borderRadius: widthPercentageToDP(2),
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonResize: {
    width: widthPercentageToDP(70),
    alignItems: 'center'
    // height: widthPercentageToDP(21),
  },
  avatar: {
    width: widthPercentageToDP(21),
    height: widthPercentageToDP(21),
    borderRadius: widthPercentageToDP(10),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  img: {
    width: '93%',
    height: '93%',
    borderRadius: widthPercentageToDP(10),
  },
  text1: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.lg1,
    color: colors.textDark,
  },
  text2: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm2,
    color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  text3: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    // textTransform: 'capitalize',
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: widthPercentageToDP(2),
    width: widthPercentageToDP(35),
    paddingVertical: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
  },
  seprator: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingBottom: 10
  }

});
