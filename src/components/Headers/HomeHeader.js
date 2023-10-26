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
import globalStyle from '../../utils/globalStyle';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const HomeHeader = ({name, image, onPress}) => {
  return (
    <View
      style={{
        ...globalStyle.rcb,
        marginTop: height * 0.02,
      }}>
      <View style={{...globalStyle.rc, gap: width * 0.03}}>
        <View style={styles.avatar}>
          <Image
            source={image !== undefined ? {uri: image} : images.Dummy}
            resizeMode="cover"
            style={styles.img100}
          />
        </View>
        <View>
          <Text style={styles.txt1}>Welcome</Text>
          <Text numberOfLines={1} style={styles.txt2}>
            {name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.notifiIc}
        onPress={onPress}>
        <Image
          source={images.Bell}
          resizeMode="contain"
          style={styles.img100}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
  },
  txt2: {
    marginTop: heightPercentageToDP(0.5),
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    width: width * 0.5,
  },
  img100: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatar: {
    width: width * 0.14,
    height: width * 0.14,
  },
  notifiIc: {
    width: width * 0.1,
    height: width * 0.1,
  },
});
