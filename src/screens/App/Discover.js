import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import BackHeader from '../../components/Headers/BackHeader';
import TrendingCard from '../../components/Card/TrendingCard';
import {setLoader} from '../../redux/globalSlice';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import globalStyle from '../../utils/globalStyle';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const Bookmark = ({...props}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const {islLogin, userData} = useSelector(state => state.user);

  // Trending data states
  const [isFetching, setIsFetching] = useState(true);
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [totalTrendingPages, setTotalTrendingPages] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const getTrendingData = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.categorySearchByTitle + 'Trending')
      .then(res => {
        apiRequest
          .get(
            endPoints.getBlogsByCategory +
              res.data.data.category[0]._id +
              '?limit=5&page=1',
          )
          .then(res => {
            setTrendingData(res.data.data.blog);
            setTotalTrendingPages(res.data.totalPages);
            dispatch(setLoader(false));
          })
          .catch(err => {
            console.log(err);
            dispatch(setLoader(false));
          });
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  const getMoreTrendingData = () => {
    if (isFetching && totalTrendingPages > trendingPage) {
      dispatch(setLoader(true));
      apiRequest
        .get(endPoints.categorySearchByTitle + 'Trending')
        .then(res => {
          apiRequest
            .get(
              endPoints.getBlogsByCategory +
                res.data.data.category[0]._id +
                '?limit=5&page=' +
                (trendingPage + 1),
            )
            .then(res => {
              dispatch(setLoader(false));
              setTrendingData([...trendingData, ...res.data.data.blog]);
              setTrendingPage(trendingPage + 1);
            })
            .catch(err => {
              console.log(err);
              dispatch(setLoader(false));
            });
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
        });
    }
  };

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader isLogo title={'Discover'} rightPress={() => {}} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {trendingData && trendingData.length !== 0 && (
            <View style={{...globalStyle.rcb, marginTop: height * 0.04}}>
              <Text style={styles.txt2}>Top Stories</Text>
              <Text
                style={styles.txt3}
                onPress={() => navigation.navigate('Trending')}>
                {'View All'}
              </Text>
            </View>
          )}

          <FlatList
            horizontal
            data={trendingData}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={getMoreTrendingData}
            style={{marginTop: height * 0.02}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TrendingCard
                id={item?._id}
                image={item?.featureImg}
                title={item?.title}
                views={item?.views}
                date={item?.createdAt}
                onPress={() => navigation.navigate('BlogDetail', {data: item})}
              />
            )}
          />

          {trendingData && trendingData.length !== 0 && (
            <View style={{...globalStyle.rcb, marginTop: height * 0.04}}>
              <Text style={styles.txt2}>Recommendations for You</Text>
              <Text
                style={styles.txt3}
                onPress={() => navigation.navigate('Trending')}>
                {'View All'}
              </Text>
            </View>
          )}

          <FlatList
            horizontal
            data={trendingData}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={getMoreTrendingData}
            style={{marginTop: height * 0.02}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TrendingCard
                id={item?._id}
                image={item?.featureImg}
                title={item?.title}
                views={item?.views}
                date={item?.createdAt}
                onPress={() => navigation.navigate('BlogDetail', {data: item})}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Bookmark;

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
});
