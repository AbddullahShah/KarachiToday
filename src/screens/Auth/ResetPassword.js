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
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
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
import languages from '../../lang/languages';
import images from '../../assets/images';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';

const ResetPassword = ({...props}) => {
  const email = props?.route?.params?.email;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const SignUpSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please choose a password'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password does not match!')
      .required('Confirm Password is Required'),
  });

  const handleResetPassword = async value => {
    dispatch(setLoader(true));
    let payload = {
      password: value.password,
    };
    apiRequest
      .post(endPoints.resetPassword + email, payload)
      .then(res => {
        dispatch(setLoader(false));
        setIsSuccessModal(true);
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
        Toast.show({
          type: 'error',
          text1: res?.data || 'Something went wrong',
          position: 'bottom'
        });
      });
  };

  useEffect(() => {
    if (isSuccessModal) {
      setTimeout(() => {
        setIsSuccessModal(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainStack'}],
        });
      }, 2000);
    }
  }, [isSuccessModal]);

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
            <Text style={styles.heading}>Create new Password</Text>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              onSubmit={value => {
                handleResetPassword(value);
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
                <View style={{flex: 1}}>
                  <Text style={styles.titleStyle}>
                    Create your new password.
                  </Text>

                  <Input
                    isPassword
                    label={'New Password'}
                    icon={images.Lock}
                    placeholderText={'Enter a new password'}
                    value={values.password}
                    handleOnChangeTxt={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    keyboardType={'email'}
                    error={touched.password && errors.password}
                    errorType={errors.password}
                    marginTop={heightPercentageToDP(3)}
                  />
                  <Input
                    isPassword
                    label={'Confirm New Password'}
                    icon={images.Lock}
                    placeholderText={'Confirm a password'}
                    value={values.confirmPassword}
                    handleOnChangeTxt={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    keyboardType={'email'}
                    error={touched.confirmPassword && errors.confirmPassword}
                    errorType={errors.confirmPassword}
                    marginTop={heightPercentageToDP(3)}
                  />

                  <PrimaryButton
                    disabled={!isValid}
                    text={'Continue'}
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
        icon={images.Lock}
        title="Reset Password Successful!"
        message={'You will be directed to the Sign in Page.'}
        isVisible={isSuccessModal}
      />
    </>
  );
};

export default ResetPassword;

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
});
