import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import BlogDetailHeader from '../../components/Headers/BlogDetailHeader';
import images from '../../assets/images';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import globalStyle from '../../utils/globalStyle';

const BlogDetail = ({...props}) => {
  const data = props?.route?.params?.data;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const {islLogin, userData} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BlogDetailHeader
          leftPress={() => navigation.goBack()}
          onShare={() => {}}
          onMenu={() => {}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <Image
              source={
                data?.featureImg !== undefined
                  ? {uri: data?.featureImg}
                  : images.Dummy
              }
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>{data?.title}</Text>

          <View
            style={{
              ...globalStyle.rc,
              gap: width * 0.03,
              marginTop: height * 0.02,
            }}>
            <Text style={styles.txt1}>1 days ago</Text>
            <View style={{...globalStyle.rc, gap: width * 0.01}}>
              <Image source={images.OpenEye} style={styles.eyeImg} />
              <Text style={styles.txt1}>1</Text>
            </View>
            <View style={{...globalStyle.rc, gap: width * 0.01}}>
              <Image source={images.message} style={styles.msgImg} />
              <Text style={styles.txt1}>3.2k</Text>
            </View>
          </View>

          <RenderHtml
            contentWidth={width}
            source={{
              html: data?.data,
            }}
          />
        </ScrollView>
      </View>
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
