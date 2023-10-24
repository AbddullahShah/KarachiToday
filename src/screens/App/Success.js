import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

// local import
import Input from '../../components/Inputs/Input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/globalSlice';
import {setUser} from '../../redux/userSlice';
import languages from '../../lang/languages';
import images from '../../assets/images';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';
import DividerHorizontal from '../../components/DividerHorizontal';

const Success = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const letsGo = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeStack'}],
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <PrimaryHeader
            isLogo={false}
            onPress={() => navigation.goBack()}
            style={{marginTop: heightPercentageToDP(6)}}
          />
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={images.Done}
              resizeMode="contain"
              style={{
                width: widthPercentageToDP(40),
                height: widthPercentageToDP(40),
              }}
            />
            <Text style={styles.txt1}>You’re All Set!</Text>
            <Text style={styles.txt2}>
              Start exploring, discovering, and engaing with the news.
            </Text>
          </View>
        </View>
        <PrimaryButton
          text={'Lets Go!'}
          onPress={() => letsGo()}
          style={{
            position: 'absolute',
            bottom: heightPercentageToDP(4),
            width: widthPercentageToDP(90),
            alignSelf: 'center',
          }}
        />
      </View>
    </>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  wrapper: {
    flex: 1,
    width: '85%',
    alignSelf: 'center',
  },

  txt1: {
    fontSize: fontsSize.lg2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: heightPercentageToDP(2),
  },

  txt2: {
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.medium,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: heightPercentageToDP(2),
    width: '90%',
  },
});
