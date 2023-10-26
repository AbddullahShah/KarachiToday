import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const {width, height} = Dimensions.get('window');

const LoadMore = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.btn}>
      <Text style={styles.txt1}>Load More</Text>
    </TouchableOpacity>
  );
};

export default LoadMore;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.01,
    marginTop: height * 0.03,
    borderRadius: width / 2,
    alignSelf: 'center',
  },
  txt1: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.white,
  },
});
