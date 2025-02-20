import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList, BackHandler, TouchableOpacity, Image, Text } from 'react-native';
const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BackHeader from '../../components/Headers/BackHeader';
import images from '../../assets/images';
import NotificationCard from '../../components/Card/NotificationCard';
import apiRequest from '../../utils/apiRequest';
import { setLoader } from '../../redux/globalSlice';
import endPoints from '../../constants/endPoints';
// import hideBlog from '../../utils/hideBlog';
import { fontsFamily, fontsSize } from '../../constants/fonts';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData, isLogin } = useSelector(state => state.user);
  const [myComments, setmyComments] = useState([]);
  const hideBlogs = userData.user?.hideBloged
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  }
  useEffect(() => {
    getUserComments();
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


  const hideBlogComment = (a, b) => {
    // Filter array a to exclude objects with blogId matching any ID in array b
    let nonMatchingObjects = a.filter(objA => !b.includes(objA.blogId._id));
    return nonMatchingObjects;
  }

  const getUserComments = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.findBlogcomment + userData?.user?._id, config)
      .then(res => {
        let orginalArr = res.data.data
        setmyComments(hideBlogComment(orginalArr, hideBlogs))
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          title={'My Comments'}
          rightIcon={images.Setting}
          leftPress={() => navigation.goBack()}
          rightPress={() => navigation.navigate('Profile')}
        />

        {
          isLogin && <FlatList
            // data={Array(10).fill(undefined)}
            data={myComments}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: height * 0.1 }} />}
            style={{ marginTop: height * 0.02 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <NotificationCard item={item} />}
          />
        }

        {
          !isLogin &&
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

        }

      </View>
    </View>
  );
};

export default Notification;

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
});
