import { StyleSheet, View, Dimensions, Text, FlatList, BackHandler } from 'react-native';
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
import BackHeader from '../../components/Headers/BackHeader';
import { Image } from 'react-native';
import images from '../../assets/images';
import { setSavedID } from '../../redux/userSlice';

const Bookmark = ({ ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { islLogin, userData } = useSelector(state => state.user);

  const [data, setData] = useState([]);

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

  const getBookmark = () => {
    apiRequest
      .get(endPoints.getSaveBlogs, config)
      .then(res => {
        setData(res.data);
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
                refreshFunc={() => getBookmark()}
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
    flex: 1,
    width: '90%',
    alignSelf: 'center',
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
