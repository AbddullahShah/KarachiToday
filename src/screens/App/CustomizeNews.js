import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

// local import
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import SimpleModals from '../../components/Modals/SimpleModals';
import localData from '../../utils/localData';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import {setLoader} from '../../redux/globalSlice';

const CustomizeNews = ({...props}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const {islLogin, userData} = useSelector(state => state.user);

  const [categories, setCategories] = useState(localData.newsCategories);

  const gotoEditProfile = () => {
    const filterCat = categories.filter(x => x.isActive === true);
    if (filterCat.length === 0) {
      alert('Please select at least one or more news categories');
    } else {
      dispatch(setLoader(true));
      let payload = {
        UserCategories: [
          '65383655f9dbc39d016552ba',
          '653842989305e57cf9c1e7d8',
        ],
      };
      apiRequest
        .put(endPoints.updateUser + userData?.user?._id, payload)
        .then(res => {
          dispatch(setLoader(false));
          navigation.navigate('EditProfile');
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));
          Toast.show({
            type: 'error',
            text1: err?.data || 'Some thing went wrong',
          });
        });
    }
  };

  const onSelectCat = index => {
    let tempArr = [...categories];
    if (tempArr[index].isActive) {
      tempArr[index].isActive = false;
    } else {
      tempArr[index].isActive = true;
    }
    setCategories(tempArr);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
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
            <Text style={styles.heading}>Customize Your News</Text>
            <Text style={styles.txt1}>
              Tell us what you’re interested in to tailor your news experience.
              Don’t worry, you can always update your preferences later.
            </Text>
            <FlatList
              data={categories}
              numColumns={3}
              scrollEnabled={false}
              style={{marginTop: heightPercentageToDP(3)}}
              contentContainerStyle={{gap: widthPercentageToDP(3)}}
              columnWrapperStyle={{gap: widthPercentageToDP(3)}}
              ListFooterComponent={() => <View style={{height: 20}} />}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onSelectCat(index)}
                    style={styles.card(item.isActive, index)}>
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{
                        width: widthPercentageToDP(10),
                        height: widthPercentageToDP(10),
                      }}
                    />
                    <Text numberOfLines={1} style={styles.txt3}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        <PrimaryButton
          text={'Continue'}
          onPress={() => gotoEditProfile()}
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

export default CustomizeNews;

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
    marginTop: heightPercentageToDP(1.5),
  },
  card: isActive => ({
    flex: 1,
    backgroundColor: isActive ? 'white' : '#F0F0F0',
    borderWidth: isActive ? 1 : 0,
    borderColor: isActive ? colors.primary : undefined,
    paddingHorizontal: widthPercentageToDP(4),
    height: heightPercentageToDP(12),
    borderRadius: widthPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
  }),
  progressLine: {
    marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(1),
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
  },
  progressLineActive: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(1),
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});
