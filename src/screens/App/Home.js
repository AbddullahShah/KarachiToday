import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import globalStyle from '../../utils/globalStyle';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import SimpleCard from '../../components/Card/SimpleCard';
import TrendingCard from '../../components/Card/TrendingCard';
import HomeHeader from '../../components/Headers/HomeHeader';

const newsCategories = ['All', 'Politics', 'Technology', 'Business', 'Sports'];

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [isSelectedCat, setIsSelectedCat] = useState(0);

  const {islLogin, userData} = useSelector(state => state.user);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + userData?.token,
    },
  };

  console.log(userData);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HomeHeader
          name={userData?.user?.name}
          image={userData?.user?.profile_pic}
          onPress={() => {}}
        />

        <View style={{...globalStyle.rcb, marginTop: height * 0.04}}>
          <Text style={styles.txt2}>Trending</Text>
          <Text
            style={styles.txt3}
            onPress={() => navigation.navigate('Trending')}>
            {'View All >'}
          </Text>
        </View>

        <FlatList
          initialNumToRender={5}
          data={Array(10).fill(undefined)}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          style={{marginTop: height * 0.02}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TrendingCard item={item} onPress={() => {}} />
          )}
        />

        <View style={{...globalStyle.rcb, marginTop: height * 0.04}}>
          <Text style={styles.txt2}>Recent Stories</Text>
          <Text
            style={styles.txt3}
            onPress={() => navigation.navigate('Trending')}>
            {'View All >'}
          </Text>
        </View>

        <FlatList
          horizontal
          initialNumToRender={5}
          data={newsCategories}
          keyExtractor={(_, index) => index.toString()}
          style={{marginTop: height * 0.02}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsSelectedCat(index)}
                style={{...styles.categoryBox(index, isSelectedCat)}}>
                <Text style={{...styles.catTxt(index, isSelectedCat)}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <FlatList
          initialNumToRender={5}
          data={Array(10).fill(undefined)}
          keyExtractor={(_, index) => index.toString()}
          style={{marginTop: height * 0.02}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <SimpleCard item={item} onPress={() => {}} />
          )}
        />
        <View style={{height: heightPercentageToDP(10)}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  txt2: {
    marginTop: heightPercentageToDP(0.5),
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    width: width * 0.5,
  },
  txt3: {
    marginTop: heightPercentageToDP(0.5),
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.md1,
    color: colors.primary,
  },
  trendingCard: {
    width: width * 0.7,
    marginRight: width * 0.04,
  },
  categoryBox: (index, isSelectedCat) => ({
    backgroundColor: index === isSelectedCat ? colors.primary : colors.white,
    borderWidth: 1,
    borderColor: index === isSelectedCat ? colors.primary : colors.textLight,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.02,
    borderRadius: width / 2,
    marginRight: width * 0.02,
  }),
  catTxt: (index, isSelectedCat) => ({
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.sm2,
    color: index === isSelectedCat ? colors.white : colors.textLight,
  }),
});
