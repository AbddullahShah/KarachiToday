import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';

import colors from '../../constants/colors';
import images from '../../assets/images';
import {setLoader} from '../../redux/globalSlice';
import {setLanguage} from '../../redux/languageSlice';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import languages from '../../lang/languages';

const Language = ({...props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = props?.route?.params?.data;

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const Languages = [
    {id: '1', language: 'English'},
    {id: '2', language: 'Arabic'},
  ];

  const onSelectedLanguage = () => {
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(setLoader(false));
      dispatch(setLanguage(selectedIndex));
      if (data) {
        navigation.goBack();
      } else {
        navigation.navigate('ProviderStack');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.Logo}
        style={styles.logoStyle}
        resizeMode="contain"
      />
      <View style={styles.wrapper}>
        <Text style={styles.text1}>
          {languages[selectedLang].selectLanguages}
        </Text>
        {Languages.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedIndex(index);
              }}
              style={styles.btn(selectedIndex, index)}>
              <Image
                source={
                  selectedIndex === index ? images.Radio : images.Un_radio
                }
                style={styles.radioBtn(selectedIndex, index)}
                resizeMode="contain"
              />
              <Text style={styles.text2(selectedIndex, index)}>
                {item.language}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectedLanguage()}
          style={styles.selectBtn}>
          <Text style={styles.text3}>{languages[selectedLang].select}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: widthPercentageToDP(40),
    height: widthPercentageToDP(40),
    borderRadius: widthPercentageToDP(4),
  },
  wrapper: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    width: widthPercentageToDP(80),
    paddingVertical: heightPercentageToDP(4),
    borderRadius: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(4),
  },
  btn: (selectedLang, index) => ({
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: selectedLang === index ? colors.primary : colors.textLight,
    gap: widthPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(3),
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(5),
    borderRadius: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(1),
  }),
  text1: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.lg1,
    color: colors.textDark,
    textTransform: 'uppercase',
    marginBottom: heightPercentageToDP(2),
  },
  text2: (selectedLang, index) => ({
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md2,
    color: selectedLang === index ? colors.primary : colors.textLight,
    textTransform: 'uppercase',
  }),
  text3: {
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md2,
    color: colors.white,
    textTransform: 'uppercase',
  },
  radioBtn: (selectedLang, index) => ({
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(4),
    tintColor: selectedLang === index ? colors.primary : colors.textLight,
  }),
  selectBtn: {
    backgroundColor: colors.primary,
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(6),
    borderRadius: widthPercentageToDP(100),
    marginTop: heightPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
