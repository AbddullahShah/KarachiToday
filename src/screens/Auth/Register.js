import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// local import
import Input from '../../components/Inputs/Input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import colors from '../../constants/colors';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/globalSlice';
import languages from '../../lang/languages';
import images from '../../assets/images';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';
import { setUser } from '../../redux/userSlice';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [isRemember, setIsRemember] = useState(false);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('This email address is not valid')
      .required('Please enter your email address!')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'This email address is not valid',
      ),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please choose a password'),
  });

  const signUp = async value => {
    if (isRemember == false) {
      Alert.alert('Accept Terms & Condition');
    } else {
      dispatch(setLoader(true));
      let payload = {
        email: value.email.toLowerCase(),
        password: value.password,
      };
      apiRequest
        .post(endPoints.register, payload)
        .then(res => {
          dispatch(setLoader(false));
          dispatch(setUser(res.data));
          navigation.navigate('Languages');
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
          Toast.show({
            type: 'error',
            text1: err?.data || 'Some thing went wrong',
            position: 'bottom'
          });
        });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            // flex: 1,
            // width: '100%',
            // alignItems: 'center',
            width: '90%',
            marginHorizontal: '5%',
            paddingBottom: 100
          }}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            style={styles.wrapper}> */}
          <PrimaryHeader
            onPress={() => navigation.goBack()}
            style={{ marginTop: heightPercentageToDP(6) }}
          />
          <Text style={styles.heading}>Create Account</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
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
              <View style={{ flex: 1 }}>
                <Text style={styles.titleStyle}>
                  Join our community and personalize your news experience.
                </Text>

                <Input
                  label={'Email'}
                  icon={images.Email}
                  placeholderText={'Email'}
                  value={values.email}
                  handleOnChangeTxt={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  keyboardType={'email-address'}
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
                  // keyboardType={'password'}
                  // keyboardType={'email-address'}
                  error={touched.password && errors.password}
                  errorType={errors.password}
                  marginTop={heightPercentageToDP(3)}
                />
                <View style={styles.rememberWrapper}>
                  <View style={styles.checkBoxWrapper}>
                    {Platform.OS === 'ios' ? (
                      <View style={styles.checkBox}>
                        <CheckBox
                          disabled={false}
                          boxType="square"
                          value={isRemember}
                          onValueChange={newValue => setIsRemember(newValue)}
                          tintColors={{
                            true: colors.primary,
                            false: colors.textLight,
                          }}
                          hideBox
                          style={{
                            height: widthPercentageToDP(6),
                            width: widthPercentageToDP(6),
                          }}
                        />
                      </View>
                    ) : (
                      <CheckBox
                        disabled={false}
                        value={isRemember}
                        onValueChange={newValue => setIsRemember(newValue)}
                        tintColors={{
                          true: colors.primary,
                          false: colors.textLight,
                        }}
                      />
                    )}
                    <Text style={styles.txt1}>I agree to KarachiToday</Text>
                  </View>
                  <Text
                    onPress={() => { }}
                    style={[styles.txt1, { color: colors.primary }]}>
                    Terms, & Policy.
                  </Text>
                </View>
                <View style={{ marginTop: heightPercentageToDP(4) }}>
                  <Text style={styles.txt3}>
                    Already have an account?{' '}
                    <Text
                      style={styles.txt4}
                      onPress={() => navigation.navigate('Login')}>
                      Sign In
                    </Text>
                  </Text>

                  <PrimaryButton
                    disabled={!isValid}
                    text={'Sign Up'}
                    onPress={handleSubmit}
                    style={{
                      position: 'absolute',
                      bottom: heightPercentageToDP(-10),
                    }}
                  />
                </View>
              </View>
            )}
          </Formik>
          {/* </KeyboardAvoidingView> */}
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

export default Register;

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
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: 1,
    borderColor: '#000',
    height: widthPercentageToDP(6),
    width: widthPercentageToDP(6),
    borderRadius: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
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
