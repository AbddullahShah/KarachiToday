import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

// local imports
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../components/Headers/BackHeader';
import SimpleCard from '../../components/Card/SimpleCard';

const Trending = ({...props}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackHeader
          title={'Trending'}
          leftPress={() => navigation.goBack()}
          rightPress={() => {}}
        />
        <FlatList
          initialNumToRender={5}
          data={Array(10).fill(undefined)}
          keyExtractor={(_, index) => index.toString()}
          style={{marginTop: height * 0.02}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: height * 0.2}} />}
          renderItem={({item, index}) => (
            <SimpleCard
              item={item}
              onPress={() => navigation.navigate('Trending')}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
});
