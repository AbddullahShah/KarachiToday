import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// local imports
import colors from '../../constants/colors';
import images from '../../assets/images';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {skipOnboard} from '../../redux/userSlice';

const ONBOARD_IMAGE = [images.banner1, images.banner2, images.banner1];
const ONBOARD_TEXT = {
  0: 'News from Reliable source only.',
  1: 'Stay Informed, Anytime, Anywhere',
  2: 'Elevate Your News Experience Now!',
};

const Onboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex === 2) {
      // dispatch(skipOnboard());
      navigation.reset({
        index: 0,
        routes: [{name: 'MainStack'}],
      });
    }
  }, [activeIndex]);

  const renderBanner = ({item}) => {
    return (
      <View style={styles.renderBannerStyle}>
        <Image source={item} resizeMode="stretch" style={styles.bannerImg} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        <FlatList
          data={ONBOARD_IMAGE}
          renderItem={renderBanner}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          scrollEventThrottle={10}
          onMomentumScrollEnd={e => {
            setActiveIndex(
              e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
            );
          }}
        />
        <View style={styles.dotConatiner}>
          <View style={styles.indicatorContainer}>
            {ONBOARD_IMAGE &&
              ONBOARD_IMAGE.map((_, imageIndex) => {
                return (
                  <View
                    key={imageIndex}
                    style={[
                      styles.normalDot,
                      {
                        transform: [
                          {
                            scale:
                              Math.round(activeIndex) == imageIndex ? 2 : 1,
                          },
                        ],
                        opacity:
                          Math.round(activeIndex) == imageIndex ? 1 : 0.5,
                      },
                    ]}
                  />
                );
              })}
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txt1}>
            {ONBOARD_TEXT[Math.round(activeIndex)]}
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.skipBtn}
        onPress={() => setActiveIndex(Math.round(activeIndex) + 1)}>
        <Text style={styles.txt2}>Skip</Text>
      </Pressable>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    width: width * 0.9,
    paddingVertical: height * 0.02,
  },
  dotConatiner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(6),
  },
  normalDot: {
    height: widthPercentageToDP(2),
    width: widthPercentageToDP(2),
    borderRadius: 100,
    backgroundColor: colors.primary,
    marginHorizontal: widthPercentageToDP(0.6),
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: widthPercentageToDP(2),
  },
  renderBannerStyle: {
    width: width * 0.9,
    height: heightPercentageToDP(18),
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(6),
  },
  skipBtn: {
    backgroundColor: colors.primary,
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(6),
    borderBottomLeftRadius: widthPercentageToDP(8),
    borderTopLeftRadius: widthPercentageToDP(8),
    bottom: heightPercentageToDP(6),
    position: 'absolute',
    right: 0,
  },
  txt1: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg1,
    color: colors.textLight,
    textAlign: 'center',
  },
  txt2: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg1,
    color: colors.white,
  },
});
