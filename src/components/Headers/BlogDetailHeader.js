import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import images from '../../assets/images';
import { fontsFamily, fontsSize } from '../../constants/fonts';

const BlogDetailHeader = ({ leftPress, onShare, onMenu }) => {
  const { isLogin } = useSelector(state => state.user);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={leftPress}>
        <Image
          source={images.Arrow}
          resizeMode="contain"
          style={styles.backImg}
        />
      </TouchableOpacity>
      <View style={styles.rightWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={onShare}>
          <Image
            source={images.Share}
            resizeMode="contain"
            style={styles.iconImg}
          />
        </TouchableOpacity>
        {
          isLogin &&
          <TouchableOpacity activeOpacity={0.8} onPress={onMenu}>
            <Image
              source={images.Menu}
              resizeMode="contain"
              style={styles.iconImg}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default BlogDetailHeader;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  backImg: {
    width: widthPercentageToDP(5),
    height: widthPercentageToDP(5),
  },
  iconImg: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(4),
  },
  title: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
  },
});
