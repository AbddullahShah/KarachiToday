import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

// local import
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const PrimaryButton = ({text, onPress, disabled = false, ...props}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      style={[styles.button(disabled), {...props.style}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: isValid => ({
    width: '100%',
    height: heightPercentageToDP(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: !isValid ? colors.primary : colors.textLight,
    borderRadius: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(1),
  }),
  text: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.medium,
    color: colors.onPrimary,
  },
});
