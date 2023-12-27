import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  BackHandler
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { fontsFamily, fontsSize } from '../../constants/fonts';
import SimpleCard from '../../components/Card/SimpleCard';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import { Image } from 'react-native';
import images from '../../assets/images';
import PrimaryHeader from '../../components/Headers/PrimaryHeader';
import { ActivityIndicator } from 'react-native';

const Search = ({ ...props }) => {
  const navigation = useNavigation();

  const selectedLang = useSelector(state => state.language.selectedLang);
  const { islLogin, userData } = useSelector(state => state.user);

  const [data, setData] = useState([]);
  const [text, onChangeText] = useState('');
  const [timer, setTimer] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const searching = text => {
    setIsLoader(true);
    onChangeText(text);
    clearTimeout(timer);
    const timeOut = setTimeout(() => {
      apiRequest
        .get(endPoints.searchBlogByTitle + text, config)
        .then(res => {
          clearTimeout(timer);
          setData(res.data.data.allBlogsFinal);
          setIsLoader(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoader(false);
        });
    }, 2000);
    setTimer(timeOut);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <PrimaryHeader
          isLogo={false}
          style={{ height: height * 0.06 }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            value={text}
            onChangeText={searching}
            placeholderTextColor={'gray'}
            placeholder="Search blogs..."
            style={styles.input}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChangeText('')}>
            {isLoader ? (
              <ActivityIndicator size={'small'} color={'gray'} />
            ) : (
              <Image
                source={!text ? images.Search : images.Close}
                resizeMode="contain"
                style={styles.img}
              />
            )}
          </TouchableOpacity>
        </View>

        {data.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <Image
              source={images.SearchEmpty}
              style={{ width: width * 0.4, height: width * 0.4 }}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={data}
            initialNumToRender={5}
            keyExtractor={(_, index) => index.toString()}
            style={{ marginTop: height * 0.02 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SimpleCard
                id={item?._id}
                image={item?.featureImg}
                title={item?.title}
                views={item?.views}
                date={item?.createdAt}
                onPress={() => navigation.navigate('BlogDetail', { data: item })}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#d8d8d8',
    height: height * 0.06,
    marginTop: height * 0.01,
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
  },
  input: {
    width: '80%',
    padding: 0,
    height: height * 0.06,
    color: colors.textDark,
    fontFamily: fontsFamily.medium,
    fontSize: fontsSize.md1,
  },
  img: {
    width: width * 0.05,
    height: width * 0.05,
  },
  emptyWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
