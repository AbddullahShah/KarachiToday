import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import BackHeader from '../../components/Headers/BackHeader';
import globalStyle from '../../utils/globalStyle';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import CommentsCard from '../../components/Card/CommentsCard';
import CommentInput from '../../components/Inputs/CommentInput';
import { setLoader } from '../../redux/globalSlice';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import moment from "moment";

const Comments = ({ ...props }) => {
  const blogID = props?.route?.params?.data;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { userData } = useSelector(state => state.user);

  const tabLineAnimatedValue = useRef(new Animated.Value(0)).current;
  const [isNewest, setIsNewest] = useState(true);
  const [data, setData] = useState([]);
  const [newestData, setNewestData] = useState([]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  useEffect(() => {
    Animated.spring(tabLineAnimatedValue, {
      toValue: !isNewest ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isNewest]);

  const getComments = () => {
    dispatch(setLoader(true));
    apiRequest
      .get(endPoints.getCommentsByBlog + blogID, config)
      .then(res => {
        setData(res.data.data);
        let comentsFilter = res.data.data.filter(x => {
          return moment.utc(x.updatedAt).format('l') == moment.utc(new Date()).format('l')
        })
        setNewestData(comentsFilter);
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  const postComment = data => {
    let params = {
      comment: data,
    };
    dispatch(setLoader(true));
    apiRequest
      .post(endPoints.postComments + blogID, params, config)
      .then(res => {
        getComments();
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    getComments();
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


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          title={'Comments'}
          leftPress={() => navigation.goBack()}
          isRight={false}
        />
        <View style={[styles.tabView, globalStyle.rcb]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewest(true)}
            style={styles.tabs}>
            <Text style={styles.tabText(isNewest)}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewest(false)}
            style={styles.tabs}>
            <Text style={styles.tabText(!isNewest)}>Newest</Text>
          </TouchableOpacity>
          <Animated.View style={styles.animatedLine(tabLineAnimatedValue)} />
        </View>

        <FlatList
          data={isNewest ? data : newestData}
          initialNumToRender={5}
          keyExtractor={(_, index) => index.toString()}
          style={{ marginTop: height * 0.02 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ height: height * 0.2 }} />}
          renderItem={({ item }) => {
            return (
              <CommentsCard
                onRefresh={() => { getComments() }}
                id={item._id}
                likes={item.like}
                comments={item.comment}
                date={item.updatedAt}
                blogId={item.blogId}
                username={item.userId.name}
                image={item?.userId?.profile_pic}
              />
            );
          }}
        />
      </View>

      <CommentInput onPress={postComment} />
    </View>
  );
};

export default Comments;

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
  tabView: {
    width: '100%',
    overflow: 'hidden',
  },
  tabs: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    paddingVertical: heightPercentageToDP(2),
    borderBottomWidth: heightPercentageToDP(1),
    borderBottomColor: '#D9D9D9',
  },
  tabText: isSelected => ({
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: isSelected ? colors.primary : '#D9D9D9',
  }),
  animatedLine: value => ({
    bottom: 0,
    width: '50%',
    position: 'absolute',
    backgroundColor: colors.primary,
    height: heightPercentageToDP(1),
    borderRadius: width / 2,
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, widthPercentageToDP(45)],
        }),
      },
    ],
  }),
});
