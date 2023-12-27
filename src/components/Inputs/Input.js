import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';

// local import
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../assets/images';

const Input = ({
  value,
  placeholderText,
  isPassword,
  icon,
  label,
  handleOnChangeTxt,
  keyboardType,
  editable = true,
  marginTop,
  error,
  errorType,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(isPassword || false);
  return (
    <>
      <Text style={styles.label(marginTop)}>{label}</Text>
      <View style={styles.container}>
        {icon && (
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: widthPercentageToDP(5),
              height: widthPercentageToDP(5),
            }}
          />
        )}
        <TextInput
          autoCapitalize='none'
          editable={editable}
          value={value}
          placeholder={placeholderText}
          placeholderTextColor="#c6c6c6"
          style={styles.textInput}
          onChangeText={handleOnChangeTxt}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setIsSecure(!isSecure)}
            style={styles.passWrapper}>
            <Image
              source={!isSecure ? images.OpenEye : images.CloseEye}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{errorType}</Text>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: marginTop => ({
    marginTop: marginTop,
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: colors.textDark,
  }),
  container: {
    width: '100%',
    marginTop: heightPercentageToDP(1),
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(6),
    backgroundColor: '#F0F0F0',
    paddingHorizontal: widthPercentageToDP(4),
    borderRadius: widthPercentageToDP(2),
  },
  textInput: {
    fontSize: fontsSize.md2,
    width: widthPercentageToDP(50),
    padding: 0,
    marginLeft: widthPercentageToDP(2),
    color: 'grey',
  },
  errorText: {
    fontFamily: fontsFamily.regular,
    marginLeft: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    alignSelf: 'flex-start',
    color: '#ff0202',
  },
  passWrapper: {
    position: 'absolute',
    width: widthPercentageToDP(5),
    height: widthPercentageToDP(5),
    right: widthPercentageToDP(4),
  },
});
