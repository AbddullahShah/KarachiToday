import {StyleSheet, View, Dimensions, Text, Image} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import globalStyle from '../../utils/globalStyle';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import images from '../../assets/images';

const CommentsCard = ({
  onPress = () => {},
  id,
  username = 'User',
  date,
  image,
  blogId,
  comments,
}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          ...globalStyle.rc,
          gap: width * 0.04,
        }}>
        <Image
          source={image !== undefined ? {uri: image} : images.Avatar}
          style={{width: width * 0.09, height: width * 0.09}}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.txt1}>{username}</Text>
          <Text style={styles.txt2}>{new Date(date).getDay()} days ago</Text>
        </View>
      </View>
      <Text style={styles.txt3}>{comments}</Text>
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
