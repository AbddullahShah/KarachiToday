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

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [isRemember, setIsRemember] = useState(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A phone number is required'),
    password: Yup.number()
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

    let payload = {};
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
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            style={styles.wrapper}>
            <PrimaryHeader
              onPress={() => navigation.goBack()}
              style={{marginTop: heightPercentageToDP(6)}}
            />
            <Text style={styles.heading}>{languages[selectedLang].signIn}</Text>
            <Formik
              initialValues={{
                passwordemail: '',
                password: '',
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
                <View style={{flex: 1}}>
                  <Text style={styles.titleStyle}>
                    Welcome! Let’s drive in into your account!
                  </Text>

                  <Input
                    label={'Email'}
                    icon={images.Email}
                    placeholderText={'Email'}
                    value={values.email}
                    handleOnChangeTxt={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    keyboardType={'email'}
                    error={touched.email && errors.email}
                    errorType={errors.email}
                    marginTop={heightPercentageToDP(3)}
                  />
                  <Input
                    isPassword
                    label={'Password'}
                    icon={images.Lock}
                    placeholderText={'Password'}
                    value={values.password}
                    handleOnChangeTxt={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    keyboardType={'email'}
                    error={touched.password && errors.password}
                    errorType={errors.password}
                    marginTop={heightPercentageToDP(3)}
                  />
                  <View style={styles.rememberWrapper}>
                    <View style={styles.checkBox}>
                      <CheckBox
                        disabled={false}
                        value={isRemember}
                        onValueChange={newValue => setIsRemember(newValue)}
                        tintColors={{
                          true: colors.primary,
                          false: colors.textLight,
                        }}
                      />
                      <Text style={styles.txt1}>Remeber me</Text>
                    </View>
                    <Text
                      onPress={() => {}}
                      style={[styles.txt1, {color: colors.primary}]}>
                      Forgot password?
                    </Text>
                  </View>
                  <View style={{marginTop: heightPercentageToDP(4)}}>
                    <Text style={styles.txt3}>
                      Don’t have an account?{' '}
                      <Text
                        style={styles.txt4}
                        onPress={() => navigation.navigate('Register')}>
                        Sign Up
                      </Text>
                    </Text>
                  </View>

                  <PrimaryButton
                    disabled={!isValid}
                    text={languages[selectedLang].signIn}
                    onPress={handleSubmit}
                    style={{
                      position: 'absolute',
                      bottom: heightPercentageToDP(4),
                    }}
                  />
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <SimpleModals
        title="Sign in Successful!"
        message={'You will be directed to the homepage.'}
        isVisible={false}
      />
    </>
  );
};

export default Login;

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
    marginTop: heightPercentageToDP(3),
  },
  wrapper: {
    flex: 1,
    width: '85%',
  },
  titleStyle: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  txt1: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.semibold,
    color: colors.textDark,
  },
  txt3: {
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
    color: colors.textDark,
    textAlign: 'center',
  },
  txt4: {
    color: colors.primary,
    fontFamily: fontsFamily.semibold,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: heightPercentageToDP(4),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
});
