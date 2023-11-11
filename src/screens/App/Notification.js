import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../components/Headers/BackHeader';
import images from '../../assets/images';
import NotificationCard from '../../components/Card/NotificationCard';

const Notification = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          title={'Notification'}
          rightIcon={images.Setting}
          leftPress={() => navigation.goBack()}
          rightPress={() => navigation.navigate('Profile')}
        />
        <FlatList
          data={Array(10).fill(undefined)}
          initialNumToRender={5}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={() => <View style={{height: height * 0.1}} />}
          style={{marginTop: height * 0.02}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <NotificationCard item={item} />}
        />
      </View>
    </View>
  );
};

export default Notification;

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
});
