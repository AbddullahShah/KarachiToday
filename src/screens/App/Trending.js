import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import SimpleCard from '../../components/Card/SimpleCard';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import {setLoader} from '../../redux/globalSlice';
import LoadMore from '../../components/Buttons/LoadMore';
import BackHeader from '../../components/Headers/BackHeader';

const Trending = ({...props}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const {islLogin, userData} = useSelector(state => state.user);

  const [isFetching, setIsFetching] = useState(true);

  // Trending data states
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingData, setTrendingData] = useState([]);
  const [totalTrendingPages, setTotalTrendingPages] = useState(0);

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
        <BackHeader
          title={'Trending'}
          leftPress={() => navigation.goBack()}
          rightPress={() => {}}
        />
        <FlatList
          data={trendingData}
          initialNumToRender={5}
          keyExtractor={(_, index) => index.toString()}
          style={{flex: 1, marginTop: height * 0.02}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            if (totalTrendingPages > trendingPage) {
              return (
                <>
                  <LoadMore onPress={getMoreTrendingData} />
                  <View style={{height: height * 0.1}} />
                </>
              );
            } else {
              return <View style={{height: height * 0.1}} />;
            }
          }}
          renderItem={({item, index}) => (
            <SimpleCard
              id={item?._id}
              image={item?.featureImg}
              title={item?.title}
              views={item?.views}
              date={item?.createdAt}
              onPress={() => navigation.navigate('BlogDetail', {data: item})}
            />
          )}
        />
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
