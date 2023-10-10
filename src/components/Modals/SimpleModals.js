import React, {Component} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../assets/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const SimpleModals = ({
  navigation,
  isVisible,
  onPress,
  message,
  ...props
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.lModalView}>
          <Image
            source={images.Logo}
            style={styles.imgStyleCont}
            resizeMode={'contain'}
          />
          <Text style={styles.msgText}>{message}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.okBox}>
            <Text style={styles.okText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SimpleModals;

const styles = StyleSheet.create({
  centeredView: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  lModalView: {
    width: widthPercentageToDP(90),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: widthPercentageToDP(6),
    paddingVertical: heightPercentageToDP(6),
  },

  msgText: {
    fontSize: fontsSize.md1,
    width: widthPercentageToDP(70),
    color: colors.textDark,
    textAlign: 'center',
    marginVertical: heightPercentageToDP(3),
    fontFamily: fontsFamily.regular,
  },
  okBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: heightPercentageToDP(1.2),
    borderRadius: widthPercentageToDP(100),
    backgroundColor: colors.primary,
  },
  okText: {
    fontSize: fontsSize.md1,
    color: colors.white,
    fontFamily: fontsFamily.bold,
  },
  imgStyleCont: {
    width: width * 0.3,
    height: width * 0.3,
  },
});
