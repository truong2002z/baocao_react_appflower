import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import {TextInput, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DataProduct from '../../Data/DataProduct';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {convertToNumberCommas} from '../../utilities/index';
const {height, width} = Dimensions.get('window');
const DataProducts = DataProduct;

const Home = ({navigation}) => {
  const [dataSearch, setDataSearch] = useState([]);
  const [term, setTerm] = useState('');
  let timeout = useRef(null);
  const [textinput, setTextinput] = React.useState('');
  const [itemAll, setItemAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function onSearch(text) {
    setIsLoading(true);
    let term = text;
    let AllProducts = itemAll;
    if (term && term.length >= 1 && AllProducts.length != 0) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        var menu = AllProducts.filter(menuname =>
          menuname.nameProducts.toLowerCase().includes(term.toLowerCase()),
        );
        setDataSearch(menu);
        setIsLoading(false);
      }, 3000);
    }
  }

  useEffect(() => {
    let AllProducts = [];
    const Data = DataProducts;
    Data.map((item, index) => {
      item.menu.map((itemProduct, index) => {
        AllProducts.push(itemProduct);
      });
    });
    // Data.push({id: 1234456, name: 'Tất Cả', menu: AllProducts});
    // console.log(Data);
    setItemAll(AllProducts);
  }, []);

  const renderItemProduct = ({item, index}) => {
    return (
      <View>
        <View style={styles.ViewTitileProducts}>
          <View>
            <Text style={styles.TxtTitleProducts}>{item.name}</Text>
          </View>
          {/* <View style={{flex: 1, alignItems: 'flex-end'}}>
    <View style={styles.ViewTitileMore}>
      <Text style={styles.TxtTitileMore}>More</Text>
    </View>
  </View> */}
        </View>

        {/* view list of products */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{height: 270}}>
          <LinearGradient
            colors={['rgba(0,164,109,0.09)', 'transparent', '#FFF']}
            style={styles.ViewLinearGradient}
          />
          {item.menu.map((itemProduct, index) => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Detail', {dataItem: itemProduct})
                  }
                  style={styles.ViewProducts}>
                  <Image
                    source={itemProduct.avatarImage}
                    style={styles.ViewImageProducts}
                  />
                  <View style={styles.ViewTitilePro}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        paddingHorizontal: 10,
                      }}>
                      {itemProduct.nameProducts}
                    </Text>
                  </View>
                  {/* <Text
      style={{
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: '#b1e5d3',
        paddingTop: 3,
      }}>
      RUSSIA
    </Text> */}
                  <View
                    style={[
                      styles.ViewTitilePro,
                      {justifyContent: 'space-between', alignItems: 'center'},
                    ]}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                        color: '#b1e5d3',
                        fontSize: 16,
                        // paddingBottom: 3,
                      }}>
                      {convertToNumberCommas(itemProduct.price)} Đ
                    </Text>

                    <Icon
                      name="plus-square"
                      size={28}
                      color="#b1e5d3"
                      // style={{paddingBottom: 3}}
                    />
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const renderItemDataSearch = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        onPress={() => navigation.navigate('Detail', {dataItem: item})}
        style={styles.ViewProducts}>
        <Image source={item.avatarImage} style={styles.ViewImageProducts} />
        <View style={styles.ViewTitilePro}>
          <Text
            style={{
              fontWeight: 'bold',
              paddingHorizontal: 10,
            }}>
            {item.nameProducts}
          </Text>
        </View>
        <View
          style={[
            styles.ViewTitilePro,
            {justifyContent: 'space-between', alignItems: 'center'},
          ]}>
          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: 'bold',
              color: '#b1e5d3',
              fontSize: 16,
              // paddingBottom: 3,
            }}>
            {item.price}
          </Text>

          <Icon
            name="plus-square"
            size={28}
            color="#b1e5d3"
            // style={{paddingBottom: 3}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* ViewHeader */}
        <View style={styles.ViewHeader}>
          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => navigation.goBack()}>
            {/* <Image
            source={require('../../images/17.png')}
            style={{marginVertical: 40, width: 25}}
          /> */}
            <Icon2 name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.ViewTitile}>
            <View style={{width: '50%'}}>
              <Text style={styles.TxtTitle}>Xin Chào bạn</Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ShoppingCart')}>
                <Icon1 name="shoppingcart" size={30} color="white" />
              </TouchableOpacity>
              {/* <Image
                source={require('../../images/g.png')}
                style={{height: 60, width: 60}}
              /> */}
            </View>
          </View>
        </View>

        {/* View Tìm kiếm  */}
        <LinearGradient
          colors={['rgba(0,164,109,0.4)', 'transparent']}
          style={styles.ViewSearchContainer}>
          <View style={styles.ViewSearch}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#b1e5d3"
              style={styles.TxtTextInput}
              onChangeText={value => setTextinput(value)}
              onEndEditing={() => {
                Keyboard.dismiss();
                onSearch(textinput);
              }}
            />
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              onPress={() => {
                Keyboard.dismiss();
                onSearch(textinput);
              }}>
              <Image
                source={require('../../images/3.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* view the title of the products all */}
        {textinput.length <= 1 ? (
          <View style={{marginBottom: 360}}>
            <FlatList
              data={DataProducts}
              renderItem={renderItemProduct}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <>
            <Text style={{marginHorizontal: 16, marginVertical: 6}}>
              Kết quả tìm kiếm{' '}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#00a46c" />
            ) : (
              <View>
                {dataSearch.length != 0 ? (
                  <FlatList
                    horizontal
                    data={dataSearch}
                    renderItem={renderItemDataSearch}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <Text>Chưa có kết quả nào</Text>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Home;
