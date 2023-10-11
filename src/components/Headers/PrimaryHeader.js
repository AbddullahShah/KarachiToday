import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Image, StyleSheet, Pressable, View} from 'react-native';
import React from 'react';

// local import
import images from '../../assets/images';

const PrimaryHeader = ({title, onPress, ...props}) => {
  return (
    <View style={[styles.container, props.style]}>
      <Pressable onPress={onPress} style={styles.backBtn}>
        <Image
          source={images.Arrow}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </Pressable>
      <Image
        source={images.Logo}
        resizeMode="contain"
        style={styles.logoStyle}
      />
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    width: widthPercentageToDP(6),
    height: widthPercentageToDP(6),
    position: 'absolute',
    left: 0,
  },
  logoStyle: {
    width: widthPercentageToDP(16),
    height: widthPercentageToDP(16),
  },
});
