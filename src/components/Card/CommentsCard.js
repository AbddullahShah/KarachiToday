import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import moment from "moment";
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
const { width, height } = Dimensions.get('window');
import { useDispatch, useSelector } from 'react-redux';

// local imports
import colors from '../../constants/colors';
import globalStyle from '../../utils/globalStyle';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import images from '../../assets/images';

const CommentsCard = ({
  onPress = () => { },
  id,
  username = 'User',
  date,
  image,
  blogId,
  comments,
  likes,
  onRefresh
}) => {
  const { userData, isLogin } = useSelector(state => state.user);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  useEffect(() => {
    let result = isLogin && likes.includes(userData.user._id);
  }, [likes]);

  const likeDislike = () => {
    isLogin &&
      apiRequest
        .get(endPoints.likeComment + id, config)
        .then(response => {
          onRefresh()
        })
        .catch(err => {
          console.log(err);
        });
  }

  return (
    <View style={styles.card}>
      <View
        style={{
          ...globalStyle.rc,
          gap: width * 0.04,
        }}>
        <Image
          source={image !== undefined ? { uri: image } : images.Dummy}
          style={{ width: width * 0.09, height: width * 0.09 }}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.txt1}>{username}</Text>
          <Text style={styles.txt2}> {moment(date).calendar()}</Text>
          {/* <Text style={styles.txt2}>{new Date(date).getDay()} days ago</Text> */}
        </View>
      </View>
      <Text style={styles.txt3}>{comments}</Text>

      <TouchableOpacity activeOpacity={1}
        style={{ flexDirection: 'row', }}
        onPress={() => { likeDislike() }}
      >
        {
          isLogin &&
          <Image
            source={likes.includes(userData.user._id) ? images.Like : images.Dislike}
            style={{
              width: width * 0.05, height: width * 0.05, marginTop: 10,
              color: 'red'
            }}
            resizeMode="contain"
          />
        }
        {
          !isLogin &&
          <Image
            source={images.Dislike}
            style={{
              width: width * 0.05, height: width * 0.05, marginTop: 10,
              color: 'red'
            }}
            resizeMode="contain"
          />
        }

        <Text style={[styles.txt1, { marginTop: 10, marginLeft: 5, color: colors.textLight }]}>{likes?.length}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Text style={styles.txt4}>Reply</Text>
      </TouchableOpacity> */}

    </View>
  );
};

export default CommentsCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: height * 0.01,
    paddingVertical: height * 0.01,
  },
  txt1: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
  },
  txt2: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
  },
  txt3: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md2,
    color: colors.textLight,
    marginTop: height * 0.01,
  },
  txt4: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    marginTop: height * 0.01,
  },
});
