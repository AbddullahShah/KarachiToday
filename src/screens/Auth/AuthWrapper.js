import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import colors from '../../constants/colors';
import images from '../../assets/images';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const AuthWrapper = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        <Image
          source={images.Logo}
          resizeMode="contain"
          style={styles.logoStyle}
        />
        <Text style={styles.txt1}>
          Welcome! Let’s drive in into your account!
        </Text>
        <Pressable style={styles.btn1}>
          <Image
            source={images.Google}
            resizeMode="contain"
            style={styles.icon1}
          />
          <Text style={styles.txt2}>Continue with Google</Text>
        </Pressable>
        <PrimaryButton
          text={'Sign in with password'}
          onPress={() => navigation.navigate('Login')}
        />
        <View style={{position: 'absolute', bottom: heightPercentageToDP(8)}}>
          <Text style={styles.txt3}>
            Don’t have an account?{' '}
            <Text
              style={styles.txt4}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mainWrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textLight,
    marginTop: heightPercentageToDP(10),
  },
  txt2: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    textAlign: 'center',
  },
  txt3: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    textAlign: 'center',
  },
  txt4: {
    color: colors.primary,
    fontFamily: fontsFamily.semibold,
  },
  btn1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.textLight,
    height: heightPercentageToDP(6),
    marginTop: heightPercentageToDP(10),
    marginBottom: heightPercentageToDP(2),
  },
  icon1: {
    position: 'absolute',
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
    left: widthPercentageToDP(4),
  },
  logoStyle: {
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
    marginTop: heightPercentageToDP(8),
  },
});
