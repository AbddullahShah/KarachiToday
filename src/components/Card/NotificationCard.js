import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

// local imports
import colors from '../../constants/colors';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import { Image } from 'react-native';
import images from '../../assets/images';
import globalStyle from '../../utils/globalStyle';

const NotificationCard = ({ item }) => {
  const navigation = useNavigation();

  const { userData } = useSelector(state => state.user);
  return (
    // <TouchableOpacity style={styles.card}>
    //   <Image
    //     source={userData?.user?.profile_pic ? { uri: userData?.user?.profile_pic } : images.Dummy}
    //     style={styles.avatar}
    //     resizeMode="contain"
    //   />
    //   <View>
    //     <Text style={styles.txt1}>{item?.blogId.title}</Text>
    //     <Text style={[styles.txt1, { marginTop: 5, color: colors.textLight }]}>{item?.comment}</Text>
    //     <Text style={styles.txt2}>{moment(item?.createdAt).calendar()}</Text>
    //     {/* <Text style={styles.txt2}>09 : 41 AM</Text> */}
    //   </View>
    // </TouchableOpacity>
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('BlogDetail', { data: item?.blogId })}
        activeOpacity={1}
        style={{ ...styles.storiesCard }}>
        <View style={{ width: '70%' }}>
          <Text numberOfLines={2} style={styles.txt4}>
            {item?.blogId.title}
          </Text>
          <Text style={[styles.txt1, { marginTop: 5, color: colors.textLight }]}>{item?.comment}</Text>

          <View
            style={{
              ...globalStyle.rcb,
              marginTop: height * 0.01,
            }}>
            <View style={{ ...globalStyle.rc, gap: width * 0.03 }}>
              <Text style={styles.txt1}>
                {moment(item?.createdAt).calendar()}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '30%' }}>
          <View style={{ ...styles.storiesImg }}>
            <Image
              source={item?.blogId.featureImg !== undefined ? { uri: item?.blogId.featureImg } : images.Dummy}
              style={{ ...styles.img100, ...{ borderRadius: width * 0.02 } }}
              resizeMode="cover"
            />
          </View>
        </View>
      </TouchableOpacity>

    </>
  );
};

export default NotificationCard;

// const styles = StyleSheet.create({
//   card: {
//     width: '100%',
//     // height: height * 0.1,
//     flexDirection: 'row',
//     gap: width * 0.04,
//     marginTop: height * 0.01,
//     padding: 12,
//     borderBottomColor: 'gray',
//     borderBottomWidth: 0.5
//     // backgroundColor: 'red'
//   },
//   avatar: {
//     width: width * 0.08,
//     height: width * 0.08,
//     borderRadius: width / 2,
//   },
//   txt1: {
//     fontFamily: fontsFamily.semibold,
//     fontSize: fontsSize.md2,
//     color: colors.textDark,
//     width: '70%',
//   },
//   txt2: {
//     fontFamily: fontsFamily.medium,
//     fontSize: fontsSize.sm1,
//     color: colors.textLight,
//     marginTop: height * 0.01,
//   },
// });



const styles = StyleSheet.create({
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
  },
  txt4: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    marginTop: heightPercentageToDP(1.5),
  },
  img100: {
    width: '100%',
    height: '100%',
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
  storiesCard: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: height * 0.01,
    justifyContent: 'space-between',
  },
  storiesImg: {
    alignSelf: 'flex-end',
    width: width * 0.26,
    height: width * 0.2,
    borderRadius: width * 0.1,
  },
  shares: {
    gap: width * 0.03,
    alignSelf: 'flex-end',
    marginTop: height * 0.01,
  },
});
