import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';

// local import
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../assets/images';

const PrimaryHeader = ({title, leftOnPress, rightOnPress, ...props}) => {
  return (
    <View style={[styles.container, {...props.style}]}>
      <TouchableOpacity
        style={styles.notification}
        activeOpacity={0.8}
        onPress={leftOnPress}>
        <Image
          source={images.notification}
          style={{width: '50%', height: '50%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {title && (
        <Text numberOfLines={1} style={styles.text}>
          {title} 👋
        </Text>
      )}
      <TouchableOpacity
        style={styles.profile}
        activeOpacity={0.8}
        onPress={rightOnPress}>
        <Image
          source={images.avatar}
          style={{width: '90%', height: '90%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notification: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    backgroundColor: colors.primaryLightExtra,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.primaryLightExtra,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    width: widthPercentageToDP(60),
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
