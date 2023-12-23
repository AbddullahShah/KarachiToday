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
    Pressable,
    TextInput
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

const SendFeedback = ({ ...props }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const screenTitle = props?.route?.params?.screenTitle;

    const [query, setquery] = useState('');


    const { userData } = useSelector(state => state.user);


    const config = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + userData?.token,
        },
    };

    const onFinish = async () => {
        if (query === '') {
            alert(screenTitle + ' is required field');
        } else {
            dispatch(setLoader(true));
            const payload = {
                query: query,
            };
            apiRequest
                .post(endPoints.createQuery, payload, config)
                .then(res => {
                    setquery('')
                    dispatch(setLoader(false));
                    navigation.goBack()
                    console.log(res.data, "QUERRY")
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
                    <Text style={styles.heading}>{screenTitle}</Text>
                    <View
                        style={{
                            backgroundColor: '#F0F0F0',
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            marginTop: 30,
                        }}>
                        <TextInput
                            placeholder={'Type here....'}
                            placeholderTextColor="#c6c6c6"
                            // editable
                            multiline={true}
                            numberOfLines={10}
                            // maxLength={40}
                            onChangeText={text => setquery(text)}
                            value={query}
                            style={{ padding: 10 }}
                        />
                    </View>
                    <View style={{ height: 100 }} />
                    <PrimaryButton
                        text={'Submit'}
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
            {/* <SimpleModals
                title="Sign in Successful!"
                message={'You will be directed to the homepage.'}
                isVisible={false}
            /> */}
        </>
    );
};

export default SendFeedback;

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
