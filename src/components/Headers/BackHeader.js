import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import images from '../../assets/images';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const BackHeader = ({
  title,
  leftPress = () => {},
  rightPress = () => {},
  rightIcon = images.Search,
  isLogo = false,
  isRight = true,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={leftPress}>
        <Image
          source={isLogo ? images.Logo : images.Arrow}
          resizeMode="contain"
          style={isLogo ? styles.logoImg : styles.iconImg}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={isRight ? rightPress : null}>
        <Image
          source={rightIcon}
          resizeMode="contain"
          style={[
            styles.iconImg,
            {tintColor: isRight ? colors.textDark : 'white'},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  iconImg: {
    width: widthPercentageToDP(5),
    height: widthPercentageToDP(5),
  },
  logoImg: {
    width: widthPercentageToDP(7),
    height: widthPercentageToDP(7),
  },
  title: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
  },
});
