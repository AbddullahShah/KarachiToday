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
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// local import
import Input from '../../components/Inputs/Input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import colors from '../../constants/colors';
import apiRequest from '../../utils/apiRequest';
import endPoints from '../../constants/endPoints';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/globalSlice';
import { setUser } from '../../redux/userSlice';
import languages from '../../lang/languages';
import images from '../../assets/images';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';
import { string } from 'yup';

const EditProfile = ({ ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { islLogin, userData } = useSelector(state => state.user);

  useEffect(() => {

    userData.user.phone_number && setPhone(JSON.stringify(userData.user.phone_number))
    userData.user.name && setFullName(userData.user.name)
    userData.user.bio && setBio(userData.user.bio)
  }, [])

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const onFinish = async () => {
    if (fullName === '') {
      alert('Full name is required field');
    } else {
      dispatch(setLoader(true));
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      const payload = {
        name: fullName,
        phone_number: phone,
        devicetoken: fcmToken ? fcmToken : 'abc123',
        bio: bio,
      };
      apiRequest
        .put(endPoints.updateUser + userData?.user?._id, payload)
        .then(res => {
          if (image !== null) {
            const formData = new FormData();
            formData.append('attachArtwork', {
              uri: image.path,
              type: image.mime,
              name: image.path.split('/').pop(),
            });
            apiRequest
              .put(endPoints.uploadUserImage, formData, config)
              .then(res => {
                dispatch(setUser(res.data));
                dispatch(setLoader(false));
                setImage(null);
                navigation.navigate('BottomTabStack');
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
          } else {
            dispatch(setUser(res.data));
            dispatch(setLoader(false));
            // navigation.navigate('Profile');
            setImage(null);
            navigation.navigate('BottomTabStack');
          }
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
            width: '90%',
            marginHorizontal: '5%',
            paddingBottom: 100,
          }}>
          {/* <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}> */}
          {
            userData?.user?.name != undefined &&
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backBtn}>
              <Image
                source={images.Arrow}
                resizeMode="contain"
                style={{ width: 30, height: 30, marginTop: 30 }}
              />
            </Pressable>
          }
          {/* <PrimaryHeader
              onPress={() => navigation.goBack()}
              style={{ marginTop: heightPercentageToDP(6) }}
            /> */}

          {/* <View style={styles.progressLine}>
              <View style={styles.progressLineActive} />
            </View> */}
          {
            (userData?.user?.name != undefined) ? (
              <Text style={styles.heading}>Edit public profile</Text>
            ) : (
              <Text style={styles.heading}>Create public profile</Text>
            )
          }
          <Text style={styles.txt1}>
            This profile will appear public, so people can read your
            comment’s.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then(response => {
                setImage(response);
              })
            }
            style={styles.avatar}>
            {
              (image) ? (
                <Image
                  source={{ uri: image.path }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  }}
                />

              ) : (
                <Image
                  source={userData?.user?.profile_pic ? { uri: userData?.user?.profile_pic } : images.Dummy}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  }}
                />
              )
            }

            {/* <Image
              source={userData?.user?.profile_pic ? { uri: userData?.user?.profile_pic } : images.Dummy}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
              }}
            /> */}
            <Image
              source={images.Edit}
              style={{
                width: '25%',
                height: '25%',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
          <Input
            label={'Full Name'}
            placeholderText={'Enter full name'}
            value={fullName}
            handleOnChangeTxt={setFullName}
            keyboardType={'email'}
            marginTop={heightPercentageToDP(3)}
          />
          <Input
            label={'Phone'}
            placeholderText={'+111-111-111'}
            value={phone}
            handleOnChangeTxt={setPhone}
            keyboardType={'number-pad'}
            marginTop={heightPercentageToDP(3)}
          />
          <Input
            label={'Bio'}
            placeholderText={'Like to share stories about tech...'}
            value={bio}
            handleOnChangeTxt={setBio}
            keyboardType={'email'}
            marginTop={heightPercentageToDP(3)}
          />
          <View style={{ height: 100 }} />
          {/* </KeyboardAvoidingView> */}
          <PrimaryButton
            text={userData?.user?.name != undefined ? 'Update' : 'Save'}
            onPress={() => onFinish()}
            style={{
              position: 'absolute',
              bottom: heightPercentageToDP(10),
              width: widthPercentageToDP(90),
              alignSelf: 'center',
            }}
          />
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

export default EditProfile;

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
    marginTop: heightPercentageToDP(4),
  },
  wrapper: {
    flex: 1,
    width: '85%',
  },
  avatar: {
    width: widthPercentageToDP(24),
    height: widthPercentageToDP(24),
    marginTop: heightPercentageToDP(4),
    alignSelf: 'center',
    borderRadius: 100,
  },
  txt1: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.medium,
    color: colors.textLight,
    marginTop: heightPercentageToDP(2),
  },
  progressLine: {
    marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(1),
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
  },
  progressLineActive: {
    width: widthPercentageToDP(38),
    height: heightPercentageToDP(1),
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});
