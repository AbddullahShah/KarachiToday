import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import images from '../../assets/images/index';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={images.Logo} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: widthPercentageToDP(55),
    height: widthPercentageToDP(55),
  },
});
