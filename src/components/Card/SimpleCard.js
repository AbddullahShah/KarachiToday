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
  Share,
} from 'react-native';
import React, { useState } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import colors from '../../constants/colors';
import images from '../../assets/images';
import globalStyle from '../../utils/globalStyle';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import MenuModal from '../Modals/MenuModal';
import { generateLink } from '../../utils/generateShareLink';

const SimpleCard = ({ id, image, title, views, onPress, onRefresh, date, commentCount, }) => {
  const navigation = useNavigation();
  const { isLogin } = useSelector(state => state.user);

  const [isModal, setIsModal] = useState(false);

  const onShare = async () => {
    const getLink = await generateLink(id)
    try {
      Share.share({
        message: getLink,
      });
    } catch (error) {
      console.log('Sharing Error:', error)
    }
  }

  const handleMenu = () => {
    setIsModal(true);
  };
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={{ ...styles.storiesCard }}>
        <View style={{ width: '70%' }}>
          <Text numberOfLines={2} style={styles.txt4}>
            {title}
          </Text>
          <View
            style={{
              ...globalStyle.rcb,
              marginTop: height * 0.02,
            }}>
            <View style={{ ...globalStyle.rc, gap: width * 0.03 }}>
              <Text style={styles.txt1}>
                {new Date(date).getDay()} days ago
              </Text>
              <View style={{ ...globalStyle.rc, gap: width * 0.01 }}>
                <Image source={images.OpenEye} style={{ ...styles.eyeImg }} />
                <Text style={styles.txt1}>{views || 0}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Comments', { data: id })}
                style={{ ...globalStyle.rc, gap: width * 0.01 }}
                activeOpacity={0.5}>
                <Image source={images.message} style={{ ...styles.msgImg }} />
                <Text style={styles.txt1}>{commentCount || 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ width: '30%' }}>
          <View style={{ ...styles.storiesImg }}>
            <Image
              source={image !== undefined ? { uri: image } : images.Dummy}
              style={{ ...styles.img100, ...{ borderRadius: width * 0.02 } }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              ...globalStyle.rc,
              ...styles.shares,
            }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onShare()}>
              <Image source={images.Share} style={{ ...styles.msgImg }} />
            </TouchableOpacity>
            {
              isLogin &&
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleMenu()}>
                <Image source={images.Menu} style={{ ...styles.msgImg }} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </TouchableOpacity>
      <MenuModal
        onPress={onRefresh}
        isVisible={isModal}
        onClose={() => setIsModal(false)}
        blogID={id}
      />
    </>
  );
};

export default SimpleCard;

const styles = StyleSheet.create({
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
  eyeImg: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: colors.textLight,
  },
  msgImg: {
    width: width * 0.04,
    height: width * 0.04,
  },
  storiesCard: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: height * 0.01,
    justifyContent: 'space-between',
  },
  storiesImg: {
    alignSelf: 'flex-end',
    width: width * 0.26,
    height: width * 0.2,
    borderRadius: width * 0.1,
  },
  shares: {
    gap: width * 0.03,
    alignSelf: 'flex-end',
    marginTop: height * 0.01,
  },
});
