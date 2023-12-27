import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import SimpleCard from '../../components/Card/SimpleCard';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import { setLoader } from '../../redux/globalSlice';
import LoadMore from '../../components/Buttons/LoadMore';
import BackHeader from '../../components/Headers/BackHeader';
import hideBlog from '../../utils/hideBlog';

const RecentStories = ({ ...props }) => {
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

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const getAllBlogs = id => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.getAllBlogs + '?limit=10&page=1', config)
      // .get(endPoints.getAllBlogs + '?limit=10', config)
      .then(res => {
        console.log(res.data);
        let orginalArr = res.data.data;
        setAllBlogs(hideBlog(orginalArr, hideBlogs));
        // setAllBlogs(res.data.data);
        setTotalPages(res.data.totalPages);
        console.log(res.data, "setTotalPagessetTotalPages");
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
        .get(URL + '?limit=10&page=' + (page + 1), config)
        // .get(URL + '?limit=' + (page + 4), config)
        .then(res => {
          let orginalArr = res.data.data;
          const updated = allBlogs.concat(hideBlog(orginalArr, hideBlogs));
          setAllBlogs(updated);
          // setAllBlogs([...allBlogs, hideBlog(orginalArr, hideBlogs)]);
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
          setAllBlogs(res.data.data.allBlogsFinal);
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

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, [userData]);

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

  return (
    <View style={styles.container}>

      <View style={styles.wrapper}>
        <BackHeader
          title={'Recent Stories'}
          leftPress={() => navigation.goBack()}
          rightPress={() => navigation.navigate('Search')}
        />
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
                style={styles.categoryBox(item.isActive)}>
                <Text style={styles.catTxt(item.isActive)}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
          <FlatList
            data={allBlogs}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            style={{ marginTop: height * 0.02 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              if (totalPages > page) {
                return allBlogs && allBlogs.length != 0 && <LoadMore onPress={getMoreBlogData} />;
              } else {
                return null;
              }
            }}
            renderItem={({ item }) => (
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
      </View >
    </View >
  );
};

export default RecentStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
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
});
