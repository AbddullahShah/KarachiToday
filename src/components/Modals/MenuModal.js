import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import { fontsFamily, fontsSize } from '../../constants/fonts';
import colors from '../../constants/colors';
import images from '../../assets/images';
import endPoints from '../../constants/endPoints';
import apiRequest from '../../utils/apiRequest';
import { setSavedID, setUser } from '../../redux/userSlice';
import ActionModal from './ActionModal';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MenuModal = ({
  // navigation,
  isVisible,
  onPress = () => { onPress() },
  onClose,
  blogID,
  ...props
}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { userData, savedID } = useSelector(state => state.user);

  const [isActionModal, setIsActionModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData?.token,
    },
  };

  const isSaved = savedID?.includes(blogID);

  const menuData = [
    {
      name: isSaved ? 'Remove from Bookmark' : 'Save to Bookmark',
      icon: images.Bookmark,
      onPress: () => savedUnsaved(),
      color: isSaved ? colors.danger : colors.textDark,
    },
    {
      name: 'Hide this',
      icon: images.CloseEye,
      onPress: () => hideUnHide(),
      color: colors.textDark,
    },
    {
      name: 'Report this',
      icon: images.IBtn,
      color: colors.textDark,
      onPress: () => {
        onClose();
        navigation.navigate('SendFeedback', { screenTitle: 'Report Blog' })
      },
    },
    {
      name: 'Send Feedback',
      icon: images.Feedback,
      color: colors.textDark,
      onPress: () => {
        onClose();
        navigation.navigate('SendFeedback', { screenTitle: 'Send Feedback' })
      },
    },
  ];

  const savedUnsaved = () => {
    onClose();
    const params = { savedBlog: blogID };
    apiRequest
      .post(endPoints.saveUnsavedBlogs, params, config)
      .then(response => {
        apiRequest
          .get(endPoints.getSaveBlogs, config)
          .then(res => {
            const savedID = res?.data?.map(x => x._id);
            dispatch(setSavedID(savedID));
            // onPress();
            setIsActionModal(true);
            setToastMsg(
              savedID.includes(blogID)
                ? 'Saved to bookmark'
                : 'Remove from bookmark',
            );
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const hideUnHide = () => {
    onClose();
    const params = { hideBloged: blogID };
    apiRequest
      .post(endPoints.hideUnHideBlogs, params, config)
      .then(res => {
        apiRequest
          .get(endPoints.findUser + userData.user._id, config)
          .then(res => {
            dispatch(setUser(res.data));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        presentationStyle={Platform.OS === 'ios' ? 'formSheet' : undefined}
        animationType="slide"
        hardwareAccelerated
        transparent={true}
        onRequestClose={onClose}
        visible={isVisible}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={onClose}>
          <View style={styles.lModalView}>
            <FlatList
              data={menuData}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                <View style={{ height: height * 0.1 }} />
              )}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={item.onPress}
                    activeOpacity={0.8}
                    style={styles.card}>
                    <Image
                      source={item.icon}
                      style={[styles.iconStyle, { tintColor: item.color }]}
                      resizeMode="contain"
                    />
                    <Text style={[styles.txt1, { color: item.color }]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <ActionModal
        isVisible={isActionModal}
        onClose={() => setIsActionModal(false)}
        title={toastMsg}
      />
    </>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  centeredView: {
    height,
    width,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.5)' : undefined,
  },
  lModalView: {
    bottom: 0,
    width: widthPercentageToDP(100),
    maxHeight: height * 0.8,
    minHeight: height * 0.3,
    backgroundColor: 'white',
    position: 'absolute',
    borderTopEndRadius: widthPercentageToDP(6),
    borderTopStartRadius: widthPercentageToDP(6),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05,
    gap: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  txt1: {
    fontFamily: fontsFamily.medium,
    color: colors.textDark,
    fontSize: fontsSize.md1,
  },

  imgStyleCont: {
    width: width * 0.4,
    height: width * 0.4,
    marginLeft: widthPercentageToDP(-4),
    marginTop: heightPercentageToDP(-1),
  },
  iconStyle: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: colors.textDark,
  },
});
