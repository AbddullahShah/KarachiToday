import {
  StyleSheet, View, Dimensions, FlatList,
  BackHandler, RefreshControl, ScrollView
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import SimpleCard from '../../components/Card/SimpleCard';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import { setLoader } from '../../redux/globalSlice';
import LoadMore from '../../components/Buttons/LoadMore';
import BackHeader from '../../components/Headers/BackHeader';
import hideBlog from '../../utils/hideBlog';

const Trending = ({ ...props }) => {
  const screenTitle = props?.route?.params?.screenTitle;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { userData } = useSelector(state => state.user);
  const hideBlogs = userData.user?.hideBloged

  const [isFetching, setIsFetching] = useState(true);

  // Trending data states
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [totalTrendingPages, setTotalTrendingPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

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
            // '?limit=5&page=1',
            // '?limit=2',
          )
          .then(res => {
            let orginalArr = res.data.data.allBlogsFinal;
            setTrendingData(hideBlog(orginalArr, hideBlogs));
            // setTrendingData(res.data.data.allBlogsFinal);
            // setTotalTrendingPages(res.data.total);
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
            let orginalArr = res.data.data.allBlogsFinal;
            dispatch(setLoader(false));
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

  useEffect(() => {
    getTrendingData();
  }, [userData]);

  useEffect(() => {
    getTrendingData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTrendingData();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          title={screenTitle ? screenTitle : 'Trending'}
          leftPress={() => navigation.goBack()}
          rightPress={() => navigation.navigate('Search')}
        />
        <ScrollView  showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >

          <FlatList
            data={trendingData}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            style={{ flex: 1, marginTop: height * 0.02 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              // if (totalTrendingPages > trendingPage) {
              //   return trendingData && trendingData.length != 0 &&
              //     <View style={{ marginBottom: 20 }}>
              //       <LoadMore onPress={getMoreTrendingData} />
              //     </View>
              // } else {
              //   return null;
              // }
              if (totalTrendingPages > trendingPage) {
                return (
                  <>
                    <LoadMore onPress={getMoreTrendingData} />
                    <View style={{ height: height * 0.1 }} />
                  </>
                );
              } else {
                return <View style={{ height: height * 0.1 }} />;
              }
            }}
            renderItem={({ item, index }) => (
              <SimpleCard
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

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
