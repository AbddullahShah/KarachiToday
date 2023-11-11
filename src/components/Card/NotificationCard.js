import {StyleSheet, View, Dimensions, Text} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import {Image} from 'react-native';
import images from '../../assets/images';

const NotificationCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Image
        source={images.Banner}
        style={styles.avatar}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.txt1}>Maryland Winkles like your comment.</Text>
        <Text style={styles.txt2}>09 : 41 AM</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    gap: width * 0.04,
    marginTop: height * 0.01,
  },
  avatar: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width / 2,
  },
  txt1: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
    width: '70%',
  },
  txt2: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.sm1,
    color: colors.textLight,
    marginTop: height * 0.01,
  },
});
