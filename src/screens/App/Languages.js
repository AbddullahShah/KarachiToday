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

const Languages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lang, setLang] = useState([
    {
      lang: 'Urdu',
      icon: images.Urdu,
    },
    {
      lang: 'English',
      icon: images.English,
    },
  ]);

  const selectedLang = useSelector(state => state.language.selectedLang);

  const onChangeLang = async value => {};

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.wrapper}>
            <PrimaryHeader
              onPress={() => navigation.goBack()}
              style={{marginTop: heightPercentageToDP(6)}}
            />
            <View style={styles.progressLine}>
              <View style={styles.progressLineActive} />
            </View>
            <Text style={styles.heading}>Choose a Language</Text>
            <Text style={styles.txt1}>Select a Language.</Text>
            <DividerHorizontal mt={heightPercentageToDP(4)} bg="gray" />
            <FlatList
              data={lang}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedIndex(index)}
                    style={styles.card(selectedIndex, index)}>
                    <View style={styles.cardLeft}>
                      <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                          width: widthPercentageToDP(10),
                          height: widthPercentageToDP(10),
                        }}
                      />
                      <Text style={styles.txt3}>{item.lang}</Text>
                    </View>
                    {selectedIndex === index && (
                      <Image
                        source={images.Tick}
                        resizeMode="contain"
                        style={{
                          width: widthPercentageToDP(5),
                          height: widthPercentageToDP(5),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        <PrimaryButton
          text={'Continue'}
          onPress={() => {}}
          style={{
            position: 'absolute',
            bottom: heightPercentageToDP(4),
            width: widthPercentageToDP(90),
            alignSelf: 'center',
          }}
        />
      </View>
      <SimpleModals
        title="Sign in Successful!"
        message={'You will be directed to the homepage.'}
        isVisible={false}
      />
    </>
  );
};

export default Languages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontsSize.xl2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
    marginTop: heightPercentageToDP(8),
  },
  wrapper: {
    flex: 1,
    width: '85%',
  },
  txt1: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.medium,
    color: colors.textLight,
    marginTop: heightPercentageToDP(2),
  },
  txt3: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    textAlign: 'center',
  },
  card: (selectedIndex, index) => ({
    backgroundColor: selectedIndex === index ? 'white' : '#F0F0F0',
    borderWidth: selectedIndex === index ? 1 : 0,
    borderColor: selectedIndex === index ? colors.primary : undefined,

    marginTop: heightPercentageToDP(4),
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(3),
  },
  progressLine: {
    marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(1),
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
  },
  progressLineActive: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(1),
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});
