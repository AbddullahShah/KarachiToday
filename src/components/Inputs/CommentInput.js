import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import images from '../../assets/images';

const CommentInput = ({onPress}) => {
  const [text, onChangeText] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputBox(isFocus)}>
        <TextInput
          value={text}
          placeholder="Add comment here..."
          placeholderTextColor={isFocus ? 'black' : 'gray'}
          onChangeText={onChangeText}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (text) {
            onPress(text);
            onChangeText('');
          }
        }}
        activeOpacity={0.8}
        style={styles.sendBtn}>
        <Image source={images.Send} style={styles.img} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    backgroundColor: colors.bg,
    height: height * 0.11,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputBox: isFocus => ({
    width: '82%',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    backgroundColor: isFocus ? '#BBDCF1' : '#F2F2F2',
    borderColor: isFocus ? colors.primary : undefined,
    borderWidth: isFocus ? 1 : 0,
  }),
  input: {
    padding: 0,
    height: height * 0.07,
    color: colors.textDark,
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  img: {
    width: width * 0.06,
    height: width * 0.06,
  },
});
