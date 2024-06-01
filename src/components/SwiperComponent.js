import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
const {width, height} = Dimensions.get('window');

const SwiperComponent = ({photo}) => {
  return (
    <Swiper
      style={StyleSheet.wrapper}
      dotStyle={{
        marginTop: -20,
        width: 15,
        height: 5,
        borderRadius: 10,
        backgroundColor: '#00a46c',
      }}
      activeDotColor="#00a46c"
      activeDotStyle={{
        marginTop: -20,
        width: 30,
        height: 6,
        borderRadius: 10,
        backgroundColor: '#00a46c',
        activeDotColor: '#00a46c',
      }}>
      {photo.map((item, index) => {
        return (
          <View key={index} style={styles.slide}>
            <Image
              source={item.path}
              style={{
                marginLeft: 140,
                marginBottom: 130,
                height: height * 0.7,
                width: 420,
                marginTop: 60,
                resizeMode: 'stretch',
                borderBottomLeftRadius: 50,
                // borderTopLeftRadius: 20,
              }}
            />
          </View>
        );
      })}
    </Swiper>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
export default SwiperComponent;
