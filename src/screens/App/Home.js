import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import globalStyle from '../../utils/globalStyle';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import SimpleCard from '../../components/Card/SimpleCard';
import TrendingCard from '../../components/Card/TrendingCard';
import HomeHeader from '../../components/Headers/HomeHeader';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import hideBlog from '../../utils/hideBlog';
import { setLoader } from '../../redux/globalSlice';
import LoadMore from '../../components/Buttons/LoadMore';
import images from '../../assets/images';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { userData } = useSelector(state => state.user);
  const hideBlogs = userData.user?.hideBloged
  const [newsCategories, setNewsCategories] = useState([]);
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

  const getTrendingData = async () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.categorySearchByTitle + 'Trending')
      .then(res => {
        console.log('idxxxxx', res.data.data.category[0]._id);
        apiRequest
          .get(
            endPoints.getBlogsByCategory +
            res.data.data.category[0]._id +
            '?limit=5&page=1',
          )
          .then(res => {
            let orginalArr = res.data.data.allBlogsFinal;
            setTrendingData(hideBlog(orginalArr, hideBlogs));
            // setTrendingData(res.data.data.allBlogsFinal);
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
              let orginalArr = res.data.data.allBlogsFinal;
              setTrendingData([...trendingData, hideBlog(orginalArr, hideBlogs)]);
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
    }
  };

  const getAllBlogs = id => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.getAllBlogs + '?limit=5&page=1', config)
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
    const filter = newsCategories.filter(x => x.isActive === true);
    if (isFetching) {
      let URL;
      if (filter[0]?._id === 0) {
        URL = endPoints.getAllBlogs;
      } else {
        URL = endPoints.getBlogsByCategory + filter[0]?._id;
      }
      dispatch(setLoader(true));
      apiRequest
        .get(URL + '?limit=5&page=' + (page + 1), config)
        .then(res => {
          let orginalArr = res.data.data;
          setAllBlogs([...allBlogs, hideBlog(orginalArr, hideBlogs)]);
          // setAllBlogs([...allBlogs, ...res.data.data]);
          dispatch(setLoader(false));
          setPage(page + 1);
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
        });
    }
  };

  const getAllCategories = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.getAllCategories)
      .then(res => {
        const result = res.data.allCategory.map((item, index) => ({
          ...item,
          isActive: false,
        }));
        let dummyData = {
          _id: 0,
          name: 'All',
          isActive: true,
        };
        result.unshift(dummyData);
        setNewsCategories(result);
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log(err);
        setIsFetching(true);
        dispatch(setLoader(false));
      });
  };

  const getBlogsByCategoryId = id => {
    if (id === 0) {
      getAllBlogs(id);
    } else {
      dispatch(setLoader(true));
      apiRequest
        .get(endPoints.getBlogsByCategory + id + '?limit=5&page=1')
        .then(res => {
          let orginalArr = res.data.data;
          setAllBlogs(hideBlog(orginalArr, hideBlogs));
          // setAllBlogs(res.data.data.blog);
          setTotalPages(res.data.totalPages);
          dispatch(setLoader(false));
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
        });
    }
  };

  const handleCategories = id => {
    let tempArr = [...newsCategories];
    const result = tempArr.map(item => {
      if (item._id === id) {
        return {
          ...item,
          isActive: true,
        };
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });
    getBlogsByCategoryId(id);
    setNewsCategories(result);
  };

  // useEffect(() => {
  //   getTrendingData();
  //   getAllCategories();
  //   getAllBlogs();
  // }, []);

  useEffect(() => {
    getTrendingData();
    getAllCategories();
    getAllBlogs();
  }, [userData]);

  const reCall = () => {
    // setAllBlogs([])
    // setTrendingData([])
    // getTrendingData();
    // getAllCategories();
    // getAllBlogs();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HomeHeader
          name={userData?.user?.name}
          image={userData?.user?.profile_pic}
          onPress={() => navigation.navigate('Notification')}
          onPressProfile={() => navigation.navigate('Profile')}
        />

        

        {trendingData && trendingData.length !== 0 && (
          <View style={{ ...globalStyle.rcb, marginTop: height * 0.04 }}>
            <Text style={styles.txt2}>Trending</Text>
            <Text
              style={styles.txt3}
              onPress={() => navigation.navigate('Trending', { screenTitle: 'Trending' })}>
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
              date={item?.createdAt}
              commentCount={item?.commentCount}
              onPress={() => navigation.navigate('BlogDetail', { data: item })}
            />
          )}
        />

        {newsCategories && newsCategories.length !== 0 && (
          <View style={{ ...globalStyle.rcb, marginTop: height * 0.04 }}>
            <Text style={styles.txt2}>Recent Stories</Text>
            <Text
              style={styles.txt3}
              onPress={() => navigation.navigate('RecentStories')}>
              {'View All'}
            </Text>
          </View>
        )}

        <FlatList
          horizontal
          initialNumToRender={5}
          data={newsCategories}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: height * 0.02 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleCategories(item._id)}
                style={{ ...styles.categoryBox(item.isActive) }}>
                <Text style={{ ...styles.catTxt(item.isActive) }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={allBlogs}
          initialNumToRender={5}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: height * 0.02 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            if (totalPages > page) {
              return allBlogs.length != 0 && <LoadMore onPress={getMoreBlogData} />;
            } else {
              return null;
            }
          }}
          renderItem={({ item }) => (
            <SimpleCard
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
        <View style={{ height: heightPercentageToDP(10) }} />
        {trendingData && trendingData.length === 0 && allBlogs && allBlogs.length === 0 && (
          <View style={styles.empty}>
            <Image
              source={images.Empty}
              style={{ width: width * 0.4, height: width * 0.4 }}
              resizeMode="contain"
            />
          </View>
        )}
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
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.white,
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
  categoryBox: isActive => ({
    backgroundColor: isActive ? colors.primary : colors.white,
    borderColor: isActive ? colors.primary : colors.textLight,
    borderWidth: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.02,
    borderRadius: width / 2,
    marginRight: width * 0.02,
  }),
  catTxt: isActive => ({
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.sm2,
    color: isActive ? colors.white : colors.textLight,
  }),
  empty: {
    alignSelf: 'center',
    // position: 'absolute',
    // top: height * 0.35,
  },
});
