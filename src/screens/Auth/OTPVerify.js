import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// local import
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';
import {setLoader} from '../../redux/globalSlice';

const CELL_COUNT = 6;

const OTPVerify = ({...props}) => {
  const data = props?.route?.params?.data;
  const email = props?.route?.params?.email;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let interval = null;

  const selectedLang = useSelector(state => state.language.selectedLang);

  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(60);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      handleOTPVerify();
    }
  }, [value]);

  useEffect(() => {
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPVerify = () => {
    if (data != value) {
      setValue('');
      alert('Wrong otp please enter a valid otp');
    } else {
      dispatch(setLoader(true));
      clearInterval(interval);
      setTimeout(() => {
        dispatch(setLoader(false));
        navigation.navigate('ResetPassword', {email: email});
      }, 2000);
    }
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
          <View style={styles.wrapper}>
            <PrimaryHeader
              onPress={() => navigation.goBack()}
              style={{marginTop: heightPercentageToDP(6)}}
            />
            <Text style={styles.heading}>OTP code verification</Text>

            <View style={{flex: 1}}>
              <Text style={styles.titleStyle}>
                We have sent an OTP code to your email
                geo*********g@example.com. Enter the OTP code below to verify
              </Text>
              <CodeField
                ref={ref}
                {...cellProps}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <Text style={styles.txt1}>Didn’t receive email?</Text>
              {timer > 0 && (
                <Text style={styles.txt1}>
                  You can resend code in{' '}
                  <Text style={{color: colors.primary}}>{timer}</Text> s
                </Text>
              )}
            </View>
          </View>
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

export default OTPVerify;

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
    textAlign: 'center',
    fontSize: fontsSize.md2,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    marginTop: heightPercentageToDP(2),
  },
  codeFieldRoot: {
    marginVertical: heightPercentageToDP(8),
  },
  cell: {
    overflow: 'hidden',
    width: widthPercentageToDP(12),
    height: widthPercentageToDP(12),
    borderRadius: widthPercentageToDP(1),
    lineHeight: heightPercentageToDP(5),
    fontSize: fontsSize.xl2,
    backgroundColor: '#D8D8D8',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLightExtra,
  },
});
