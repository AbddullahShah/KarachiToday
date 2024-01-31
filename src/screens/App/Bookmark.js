import { StyleSheet, View, Dimensions, Text, FlatList, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import SimpleCard from '../../components/Card/SimpleCard';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import BackHeader from '../../components/Headers/BackHeader';
import { Image } from 'react-native';
import images from '../../assets/images';
import { setSavedID } from '../../redux/userSlice';
import hideBlog from '../../utils/hideBlog';

const Bookmark = ({ ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData, isLogin } = useSelector(state => state.user);
  const hideBlogs = userData.user?.hideBloged
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const getBookmark = () => {
    apiRequest
      .get(endPoints.getSaveBlogs, config)
      .then(res => {
        setData(hideBlog(res.data, hideBlogs));
        const savedID = res?.data?.map(x => x._id);
        dispatch(setSavedID(savedID));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookmark();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getBookmark();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBookmark();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>

      {
        (isLogin) ? (
          <ScrollView style={styles.wrapper}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <BackHeader
              isLogo
              title={'Bookmark'}
              rightPress={() => navigation.navigate('Search')}
            />
            {data.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Image
                  source={images.Empty}
                  style={{ width: width * 0.4, height: width * 0.4 }}
                  resizeMode="contain"
                />
                <Text style={styles.txt1}>Empty!</Text>
                <Text style={styles.txt2}>
                  You have not saved any news to this collection.
                </Text>
              </View>
            ) : (
              <FlatList
                data={data}
                initialNumToRender={5}
                keyExtractor={(_, index) => index.toString()}
                style={{ marginTop: height * 0.02 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <SimpleCard
                    id={item?._id}
                    image={item?.featureImg}
                    title={item?.title}
                    views={item?.views}
                    commentCount={item?.commentCount}
                    date={item?.createdAt}
                    onRefresh={() => getBookmark()}
                    onPress={() => navigation.navigate('BlogDetail', { data: item })}
                  />
                )}
              />
            )}
          </ScrollView>

        ) : (
          <View style={styles.isNotLogin}>
            <TouchableOpacity style={styles.isNotLogin}
              onPress={() => { navigation.navigate('AuthStack') }}
            >
              <Image
                source={images.Logo}
                style={{ height: '10%', width: '20%', marginBottom: 10 }}
                resizeMode="cover"
              />
              <Text style={[styles.text3]}>Sign In To Continue</Text>
            </TouchableOpacity>
          </View>
        )
      }

    </View >
  );
};

export default Bookmark;

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
  isNotLogin: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.xl2,
    color: colors.textDark,
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  txt2: {
    width: '80%',
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.md2,
    color: colors.textLight,
    marginTop: height * 0.02,
    textAlign: 'center',
  },
});
