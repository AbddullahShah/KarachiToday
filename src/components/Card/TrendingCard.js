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
import images from '../../assets/images';
import globalStyle from '../../utils/globalStyle';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';

const TrendingCard = ({id, image, title, views, onPress, date}) => {
  const onShare = () => {};
  const handleMenu = () => {};

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.trendingCard}>
      <View style={styles.cardImg}>
        <Image
          source={image !== undefined ? {uri: image} : images.Dummy}
          style={styles.img100}
          resizeMode="cover"
        />
      </View>

      <Text numberOfLines={3} style={styles.txt4}>
        {title}
      </Text>
      <View
        style={{
          ...globalStyle.rcb,
          marginTop: height * 0.01,
        }}>
        <View style={{...globalStyle.rc, gap: width * 0.03}}>
          <Text style={styles.txt1}>{new Date(date).getDay()} days ago</Text>
          <View style={{...globalStyle.rc, gap: width * 0.01}}>
            <Image source={images.OpenEye} style={styles.eyeImg} />
            <Text style={styles.txt1}>{views || 0}</Text>
          </View>
          <View style={{...globalStyle.rc, gap: width * 0.01}}>
            <Image source={images.message} style={styles.msgImg} />
            <Text style={styles.txt1}>3.2k</Text>
          </View>
        </View>

        <View style={{...globalStyle.rc, gap: width * 0.03}}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onShare()}>
            <Image source={images.Share} style={styles.msgImg} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleMenu()}>
            <Image source={images.Menu} style={styles.msgImg} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  trendingCard: {
    width: width * 0.7,
    marginRight: width * 0.04,
  },
  cardImg: {
    width: width * 0.7,
    height: height * 0.2,
    borderRadius: width * 0.04,
    overflow: 'hidden',
  },
  eyeImg: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: colors.textLight,
  },
  msgImg: {
    width: width * 0.04,
    height: width * 0.04,
  },
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
  },
  txt4: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    marginTop: heightPercentageToDP(1.5),
  },
  img100: {
    width: '100%',
    height: '100%',
  },
});
