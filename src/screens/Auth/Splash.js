import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import images from '../../assets/images/index';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';

const Splash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image resizeMode="contain" source={images.Logo} style={styles.logo1} />
        <Image
          resizeMode="contain"
          source={images.Logo_Horizontal}
          style={styles.logo2}
        />
      </View>
      <Text style={styles.txt}>
        All type of news from all trusted sources for all type of people
      </Text>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{
          position: 'absolute',
          bottom: heightPercentageToDP(10),
          transform: [{scale: 1.5}],
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(3),
  },
  logo1: {
    width: widthPercentageToDP(18),
    height: widthPercentageToDP(18),
  },
  logo2: {
    width: widthPercentageToDP(50),
    height: widthPercentageToDP(18),
  },
  txt: {
    width: '80%',
    textAlign: 'center',
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textLight,
    marginTop: heightPercentageToDP(2),
  },
});
