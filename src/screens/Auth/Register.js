import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {Formik} from 'formik';
import * as Yup from 'yup';

// local import
import Input from '../../components/Inputs/Input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import {setLoader} from '../../redux/globalSlice';
import languages from '../../lang/languages';
import images from '../../assets/images';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const provider = useSelector(state => state.language.provider);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('PK');
  const [selectCountry, setSelectCountry] = useState('92');

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Minimum at least 5 character'),
    mobileNo: Yup.number()
      .test(
        'onlyNumbers',
        `Mobile number must be 6 or more than 6 number at least`,
        value => value.toString().length >= 6,
      )
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")

      .required('A phone number is required'),
  });

  const signUp = async value => {
    dispatch(setLoader(true));
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    let phoneNum;
    if (value.mobileNo.at(0) === '0') phoneNum = value.mobileNo.substring(1);
    else phoneNum = value.mobileNo;

    let payload = {
      username: value.username,
      phone: '+' + selectCountry + phoneNum,
      userType: provider == 'provider' ? 'Provider' : 'Consumer',
      deviceType: Platform.OS,
      deviceToken: fcmToken ? fcmToken : 'abc',
      service: '64e40933e79ea153263da441',
    };
    apiRequest
      .post(endPoints.register, payload)
      .then(res => {
        dispatch(setLoader(false));
        if (res.data.data.otp) {
          navigation.navigate('Otp', {data: res.data.data});
        }
        console.log('OTP ===>', res.data.data.otp);
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
            <Text style={styles.heading}>
              {languages[selectedLang].registerAccount}
            </Text>
            <Formik
              initialValues={{
                username: '',
                mobileNo: '',
              }}
              onSubmit={value => {
                signUp(value);
              }}
              validationSchema={SignUpSchema}>
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
                  <Input
                    placeholderText={'Username'}
                    value={values.username}
                    handleOnChangeTxt={handleChange('username')}
                    onBlur={() => setFieldTouched('username')}
                    keyboardType={'email-address'}
                    error={touched.username && errors.username}
                    errorType={errors.username}
                    marginTop={heightPercentageToDP(3)}
                  />
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
                    text={languages[selectedLang].register}
                    onPress={handleSubmit}
                    style={{marginTop: heightPercentageToDP(3)}}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontsSize.xl2,
    fontFamily: fontsFamily.bold,
    color: colors.textDark,
  },
  titleStyle: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    marginTop: heightPercentageToDP(3),
  },
  pointsWrapper: {
    paddingVertical: heightPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
  },
  points: {
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
    marginBottom: heightPercentageToDP(1),
    opacity: 0.7,
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
