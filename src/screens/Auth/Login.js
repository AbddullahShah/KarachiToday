import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
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
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
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

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('PK');
  const [selectCountry, setSelectCountry] = useState('92');

  const SignInSchema = Yup.object().shape({
    mobileNo: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A phone number is required'),
  });

  const signIn = async value => {
    dispatch(setLoader(true));
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    let phoneNum;
    if (value.mobileNo.at(0) === '0') phoneNum = value.mobileNo.substring(1);
    else phoneNum = value.mobileNo;

    let payload = {
      phone: '+' + selectCountry + phoneNum,
      deviceToken: fcmToken ? fcmToken : 'abc',
      deviceType: Platform.OS,
    };
    apiRequest
      .post(endPoints.login, payload)
      .then(res => {
        dispatch(setLoader(false));
        if (res.data.status) {
          dispatch(setUser(res.data.data));
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeStack'}],
          });
        } else {
          Toast.show({
            type: 'error',
            text1: res.data.message,
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
        Toast.show({
          type: 'error',
          text1: err.data.message,
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View style={styles.wrapper}>
            <Text style={styles.heading}>{languages[selectedLang].signIn}</Text>
            <Formik
              initialValues={{
                mobileNo: '',
              }}
              onSubmit={value => {
                signIn(value);
              }}
              validationSchema={SignInSchema}>
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                isValid,
                handleSubmit,
              }) => (
                <View>
                  <Text style={styles.titleStyle}>
                    {
                      languages[selectedLang]
                        .pleaseEnterYourEmailAddressandPassword
                    }
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShow(true)}
                    style={styles.countryPicker}>
                    <View>
                      <CountryPicker
                        visible={show}
                        onClose={() => setShow(false)}
                        {...{
                          countryCode: countryCode,
                          withFilter: true,
                          withFlag: true,
                          withCountryNameButton: true,
                          withAlphaFilter: true,
                          withFlagButton: true,
                          onSelect: e => {
                            setCountryCode(e.cca2);
                            setSelectCountry(e.callingCode[0]);
                            setShow(false);
                          },
                          containerButtonStyle: {},
                        }}
                      />
                    </View>
                    <Image
                      source={images.down_arrow}
                      style={styles.dropDownIc}
                    />
                  </TouchableOpacity>
                  <Input
                    placeholderText={'Enter your phone number'}
                    value={values.mobileNo}
                    handleOnChangeTxt={handleChange('mobileNo')}
                    onBlur={() => setFieldTouched('mobileNo')}
                    keyboardType={'number-pad'}
                    error={touched.mobileNo && errors.mobileNo}
                    errorType={errors.mobileNo}
                    marginTop={heightPercentageToDP(3)}
                  />
                  <PrimaryButton
                    disabled={!isValid}
                    text={languages[selectedLang].signIn}
                    onPress={handleSubmit}
                    style={{marginTop: heightPercentageToDP(5)}}
                  />
                  <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text2}>
                      {languages[selectedLang].createaAccount}
                    </Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontsSize.xl2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  titleStyle: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  text2: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    marginTop: heightPercentageToDP(2),
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  countryPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    height: heightPercentageToDP(6),
    borderRadius: widthPercentageToDP(100),
    paddingHorizontal: widthPercentageToDP(4),
    marginTop: heightPercentageToDP(3),
    borderColor: '#d7d7d7',
    borderWidth: 0.5,
  },
  subtitle: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
    marginLeft: widthPercentageToDP(10),
  },
  dropDownIc: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(4),
  },
});
