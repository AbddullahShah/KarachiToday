import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const {islLogin, userData} = useSelector(state => state.user);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: userData?.token,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        <View style={{height: heightPercentageToDP(10)}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
});
