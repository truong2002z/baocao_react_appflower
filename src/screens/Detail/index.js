import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import SwiperComponent from '../../components/SwiperComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {convertToNumberCommas} from '../../utilities/index';
const {width, height} = Dimensions.get('window');

const Detail = ({navigation, route}) => {
  const [numberProduct, setNumberProduct] = useState(
    route?.params?.count ? route?.params?.count : 1,
  );
  const [dataDetail, setDataDetail] = useState(route?.params?.dataItem);
  useEffect(() => {
    console.log(dataDetail);
  }, []);
  const onhandleShoppingCart = async () => {
    const user = auth().currentUser;
    console.log(user);
    let data = dataDetail;
    let body = {
      amount: numberProduct,
      idProduct: data.menuId,
      nameProduct: data.nameProducts,
      priceProduct: data.price,
      email: user?.email,
    };
    await firestore().collection('ShoppingCart').add(body);
    navigation.navigate('ShoppingCart');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={{
          height: 50,
          // width: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: '#00a46c',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Image
            source={require('../../images/17.png')}
            style={{marginVertical: 40, width: 25}}
          /> */}
          <Icon1 name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'white'}}>Chi tiết Sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
          <Icon name="shoppingcart" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: height * 0.7 - 50,
          }}>
          <View style={{width: width * 0.2, paddingLeft: 30}}>
            <View style={styles.ViewCharacteristics}>
              <Image source={require('../../images/11.png')} />
            </View>
            <View style={styles.ViewCharacteristics}>
              <Image source={require('../../images/12.png')} />
            </View>
            <View style={styles.ViewCharacteristics}>
              <Image source={require('../../images/13.png')} />
            </View>
            <View style={styles.ViewCharacteristics}>
              <Image source={require('../../images/14.png')} />
            </View>
          </View>
          <View style={{width: width * 0.8}}>
            <SwiperComponent photo={dataDetail.photo} />
          </View>
        </View>
        <View style={styles.ViewNameProduct}>
          <Text numberOfLines={1} style={styles.TxtName}>
            {dataDetail.nameProducts}
          </Text>
          <Text style={styles.TxtPrice}>
            {convertToNumberCommas(dataDetail.price)} Đ
          </Text>
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={styles.TxtIntroduce}>Mô tả:</Text>
          <Text style={[styles.TxtIntroduce, {color: 'black'}]}>
            {dataDetail.description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.ViewBottomContainer}>
        <View style={styles.ViewNumProduct}>
          <TouchableOpacity
            onPress={() => {
              if (numberProduct > 0) {
                setNumberProduct(numberProduct - 1);
              }
            }}
            style={styles.ButtomPlus}>
            <Icon name="minus" size={25} color="gray" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#62636a',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            {numberProduct}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setNumberProduct(numberProduct + 1);
            }}
            style={styles.ButtomPlus}>
            <Icon name="plus" size={25} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onhandleShoppingCart()}
          style={styles.ViewButtom}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 18,
            }}>
            Thêm vào giỏ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Detail;
