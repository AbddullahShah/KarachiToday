import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Share,
  Alert,
  BackHandler,
  Linking
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import BlogDetailHeader from '../../components/Headers/BlogDetailHeader';
import images from '../../assets/images';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import globalStyle from '../../utils/globalStyle';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import { setLoader } from '../../redux/globalSlice';
import MenuModal from '../../components/Modals/MenuModal';
import hideBlog from '../../utils/hideBlog';
import { generateLink } from '../../utils/generateShareLink';

const BlogDetail = ({ ...props }) => {
  const data = props?.route?.params?.data;
  const itemId = props?.route?.params?.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [oneBlog, setoneBlog] = useState({});
  const { userData, isLogin } = useSelector(state => state.user);
  const hideBlogs = userData.user?.hideBloged
  const [isModal, setIsModal] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  }

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

  useEffect(() => {
    getOneBlog();
  }, [userData]);

  const getOneBlog = async () => {
    dispatch(setLoader(true));
    console.log(endPoints.oneBlog + (data?._id || itemId), 'getBlog');
    apiRequest
      .get(endPoints.oneBlog + (data?._id || itemId), config)
      .then(res => {
        let data = hideBlog([res.data.cleanBlogData], hideBlogs)
        if (data.length != 0) {
          setoneBlog(data[0])
        }
        else {
          (itemId) ? (
            navigation.navigate('MainStack')
          ) : (
            navigation.goBack()
          )
        }
        dispatch(setLoader(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };

  const onShare = async () => {
    const getLink = await generateLink(data?._id || itemId)
    try {
      Share.share({
        message: getLink,
      });
    } catch (error) {
      console.log('Sharing Error:', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BlogDetailHeader
          // leftPress={() => navigation.goBack()}
          leftPress={() => {
            (itemId) ? (
              (isLogin) ? (navigation.goBack()) :
                navigation.navigate('MainStack')
            ) : (
              navigation.goBack()
            )
          }}
          onShare={() => { onShare() }}
          onMenu={() => { setIsModal(true) }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <Image
              source={
                oneBlog?.featureImg !== undefined
                  ? { uri: oneBlog?.featureImg }
                  : images.Dummy
              }
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>{oneBlog?.title}</Text>

          <View
            style={{
              ...globalStyle.rc,
              gap: width * 0.03,
              marginTop: height * 0.02,
            }}>
            <Text style={styles.txt1}>
              {new Date(oneBlog?.createdAt).getDate()} days ago
            </Text>
            <View style={{ ...globalStyle.rc, gap: width * 0.01 }}>
              <Image source={images.OpenEye} style={styles.eyeImg} />
              <Text style={styles.txt1}>{oneBlog.views || 0}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Comments', { data: data._id })}
              style={{ ...globalStyle.rc, gap: width * 0.01 }}>
              <Image source={images.message} style={styles.msgImg} />
              <Text style={styles.txt1}>{data?.commentCount || oneBlog?.commentCount || 0}</Text>
            </TouchableOpacity>
          </View>

          {/* {
            oneBlog && oneBlog?.data != undefined && oneBlog?.data[0]?.length != 0 &&
            <Text style={styles.title}>{oneBlog?.data[0]?.content}</Text>
          } */}

          {
            (oneBlog && oneBlog?.data != undefined && oneBlog?.data.length) ? (
              oneBlog?.data.map((key, index) => {
                return (
                  <View key={index} style={{ marginTop: 10 }}>
                    {
                      key.ctype === 'text' && <Text style={styles.txt1}>{key.content}</Text>
                    }
                    {
                      key.ctype === 'heading' && <Text style={styles.title}>{key.content}</Text>
                    }
                    {
                      key.ctype === 'image' &&
                      <View style={styles.banner}>
                        <Image
                          source={{ uri: key?.content }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                      </View>
                    }
                  </View>
                )
              })
            ) : null
          }

          {/* <RenderHtml
            contentWidth={width}
            source={{
              html: oneBlog?.data,
            }}
          /> */}
        </ScrollView>
      </View>
      <MenuModal
        isVisible={isModal}
        onClose={() => setIsModal(false)}
        blogID={oneBlog._id}
      />
    </View>
  );
};

export default BlogDetail;

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
  title: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.lg1,
    color: colors.textDark,
    marginTop: height * 0.02,
  },
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
  },
  banner: {
    width: '100%',
    overflow: 'hidden',
    height: height * 0.2,
    borderRadius: width * 0.02,
    marginTop: height * 0.02,
  },
  eyeImg: {
    width: width * 0.04,
    height: width * 0.04,
    tintColor: colors.textLight,
  },
  msgImg: {
    width: width * 0.04,
    height: width * 0.04,
  },
});
