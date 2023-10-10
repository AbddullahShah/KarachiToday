import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';

// local import
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const Input = ({
  value,
  placeholderText,
  isPassword,
  handleOnChangeTxt,
  keyboardType,
  editable = true,
  marginTop,
  error,
  errorType,
  ...props
}) => {
  return (
    <>
      <View style={styles.container(marginTop)}>
        <TextInput
          editable={editable}
          value={value}
          placeholder={placeholderText}
          placeholderTextColor="#c6c6c6"
          style={styles.textInput}
          onChangeText={handleOnChangeTxt}
          secureTextEntry={isPassword}
          keyboardType={keyboardType}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{errorType}</Text>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: marginTop => ({
    width: '100%',
    marginTop: marginTop,
    height: heightPercentageToDP(6),
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    borderRadius: widthPercentageToDP(100),
    borderColor: '#d7d7d7',
    borderWidth: 0.5,
  }),
  textInput: {
    fontSize: fontsSize.md2,
    padding: 0,
    width: widthPercentageToDP(80),
    color: 'grey',
    marginLeft: widthPercentageToDP(5),
  },
  errorText: {
    fontFamily: fontsFamily.regular,
    marginLeft: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    alignSelf: 'flex-start',
    color: '#ff0202',
  },
});
