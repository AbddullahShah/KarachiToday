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
  BackHandler
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import BackHeader from '../../components/Headers/BackHeader';
import TrendingCard from '../../components/Card/TrendingCard';
import { setLoader } from '../../redux/globalSlice';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import globalStyle from '../../utils/globalStyle';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import hideBlog from '../../utils/hideBlog';

const Bookmark = ({ ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { userData } = useSelector(state => state.user);
  const hideBlogs = userData.user?.hideBloged

  const [isFetching, setIsFetching] = useState(true);

  // Blogs data states
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Trending data states
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [totalTrendingPages, setTotalTrendingPages] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.goBack()
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const getTrendingData = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.categorySearchByTitle + 'Trending')
      .then(res => {
        apiRequest
          .get(
            endPoints.getBlogsByCategory +
            res.data.data.category[0]._id +
            '?limit=10&page=1'
            // '?limit=2',
            // '?limit=5&page=1',
          )
          .then(res => {
            let orginalArr = res.data.data.allBlogsFinal;
            setTrendingData(hideBlog(orginalArr, hideBlogs));
            // setTrendingData(res.data.data.allBlogsFinal);
            setTotalTrendingPages(res.data.totalPages);
            setTrendingPage(1);
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
    // if (isFetching && totalTrendingPages > trendingPage) {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.categorySearchByTitle + 'Trending')
      .then(res => {
        apiRequest
          .get(
            endPoints.getBlogsByCategory +
            res.data.data.category[0]._id +
            '?limit=10&page=' + (trendingPage + 1)
            // '?limit=' + (trendingPage + 4),
            // '?limit=5&page=' +
            // (trendingPage + 1),
          )
          .then(res => {
            dispatch(setLoader(false));
            let orginalArr = res.data.data.allBlogsFinal;
            const updated = trendingData.concat(hideBlog(orginalArr, hideBlogs));
            setTrendingData(updated);
            // setTrendingData(hideBlog(orginalArr, hideBlogs));
            // setTrendingData([...trendingData, hideBlog(orginalArr, hideBlogs)]);
            // setTrendingData([...trendingData, ...res.data.data.allBlogsFinal]);
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
    // }
  };

  const getAllBlogs = id => {
    dispatch(setLoader(true));
    apiRequest
      // .get(endPoints.getAllBlogs + '?limit=5&page=1', config)
      // .get(endPoints.getAllBlogs + '?limit=2', config)
      .get(endPoints.getAllBlogs + '?limit=10&page=1', config)
      .then(res => {
        let orginalArr = res.data.data;
        setAllBlogs(hideBlog(orginalArr, hideBlogs));
        // setAllBlogs(res.data.data);
        setTotalPages(res.data.totalPages);
        dispatch(setLoader(false));
        if (id !== undefined) {
          setPage(1);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  const getMoreBlogData = () => {
    if (isFetching) {
      let URL;
      URL = endPoints.getAllBlogs;
      dispatch(setLoader(true));
      apiRequest
        .get(URL + '?limit=10&page=' + (page + 1), config)
        .then(res => {
          let orginalArr = res.data.data;
          const updated = allBlogs.concat(hideBlog(orginalArr, hideBlogs));
          setAllBlogs(updated);
          dispatch(setLoader(false));
          setPage(page + 1);
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
        });
    }
  };

  // const getMoreBlogData = () => {
  //   if (isFetching) {
  //     dispatch(setLoader(true));
  //     apiRequest
  //       // .get(endPoints.getAllBlogs + '?limit=5&page=' + (page + 1), config)
  //       // .get(URL + '?limit=' + (page + 4), config)
  //       .get(endPoints.getAllBlogs + + '?limit=10&page=' + (page + 1), config)
  //       .then(res => {
  //         let orginalArr = res.data.data;
  //         const updated = allBlogs.concat(hideBlog(orginalArr, hideBlogs));
  //         setAllBlogs(updated);
  //         // setAllBlogs(hideBlog(orginalArr, hideBlogs));
  //         // setAllBlogs([...allBlogs, hideBlog(orginalArr, hideBlogs)]);
  //         // setAllBlogs([...allBlogs, ...res.data.data]);
  //         dispatch(setLoader(false));
  //         setPage(page + 1);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         dispatch(setLoader(false));
  //       });
  //   }
  // };

  useEffect(() => {
    getTrendingData();
    getAllBlogs();
  }, [userData]);

  const reCall = () => {
    // getTrendingData();
    // getAllBlogs();
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          isLogo
          title={'Discover'}
          rightPress={() => navigation.navigate('Search')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {trendingData && trendingData.length !== 0 && (
            <View style={{ ...globalStyle.rcb, marginTop: height * 0.04 }}>
              <Text style={styles.txt2}>Top Stories</Text>
              <Text
                style={styles.txt3}
                onPress={() => navigation.navigate('Trending', { screenTitle: 'Top Stories' })}>
                {'View All'}
              </Text>
            </View>
          )}

          <FlatList
            horizontal
            data={allBlogs}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={getMoreBlogData}
            style={{ marginTop: height * 0.02 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TrendingCard
                refreshFunc={() => reCall()}
                id={item?._id}
                image={item?.featureImg}
                title={item?.title}
                views={item?.views}
                commentCount={item?.commentCount}
                date={item?.createdAt}
                onPress={() => navigation.navigate('BlogDetail', { data: item })}
              />
            )}
          />

          {trendingData && trendingData.length !== 0 && (
            <View style={{ ...globalStyle.rcb, marginTop: height * 0.04 }}>
              <Text style={styles.txt2}>Recommendations for You</Text>
              <Text
                style={styles.txt3}
                onPress={() => navigation.navigate('Trending', { screenTitle: 'Recommendations for You' })}>
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
            style={{ marginTop: height * 0.02 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TrendingCard
                refreshFunc={() => reCall()}
                id={item?._id}
                image={item?.featureImg}
                title={item?.title}
                views={item?.views}
                commentCount={item?.commentCount}
                date={item?.createdAt}
                onPress={() => navigation.navigate('BlogDetail', { data: item })}
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
