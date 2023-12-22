import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
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

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const [myComments, setmyComments] = useState([]);
  console.log(userData?.user?._id, "userDatauserDatauserDatauserData")

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  }
  useEffect(() => {
    getUserComments();
  }, []);

  const getUserComments = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.findBlogcomment + userData?.user?._id, config)
      .then(res => {
        setmyComments(res.data.data)
        console.log(res.data.data, "resresresresresresresresresresresresresres")
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
        <FlatList
          // data={Array(10).fill(undefined)}
          data={myComments}
          initialNumToRender={5}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={() => <View style={{ height: height * 0.1 }} />}
          style={{ marginTop: height * 0.02 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationCard item={item} />}
        />
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
});
