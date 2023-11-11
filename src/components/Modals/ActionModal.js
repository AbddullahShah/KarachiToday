import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useEffect} from 'react';
import {View, Modal, Text, Dimensions, Image, StyleSheet} from 'react-native';

// local imports
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../assets/images';

const {width, height} = Dimensions.get('window');

const ActionModal = ({onClose, isVisible, title = 'Saved to Bookmark'}) => {
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isVisible]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.lModalView}>
          <Image
            source={images.Tick}
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={styles.txt1}>{title}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  centeredView: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  lModalView: {
    width: widthPercentageToDP(90),
    backgroundColor: '#DBF1FF',
    alignItems: 'center',
    gap: width * 0.04,
    borderRadius: widthPercentageToDP(3),
    justifyContent: 'center',
    flexDirection: 'row',
    padding: width * 0.06,

    borderColor: colors.primary,
    borderWidth: 2,

    shadowColor: '#DBF1FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txt1: {
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.semibold,
    color: colors.primary,
  },
  iconStyle: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: colors.primary,
  },
});
