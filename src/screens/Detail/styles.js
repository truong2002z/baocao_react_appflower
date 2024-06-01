import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  ViewCharacteristics: {
    backgroundColor: '#FFF',
    height: 50,
    width: 50,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  ViewNameProduct: {
    flexDirection: 'row',
    // marginTop: -80,
    marginHorizontal: 20,
    // paddingHorizontal: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    width: width - 40,
  },
  TxtName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#62636a',
  },
  TxtPrice: {
    fontWeight: 'bold',
    color: '#00a46c',

    fontSize: 20,
  },
  TxtIntroduce: {
    paddingHorizontal: 16,
    fontWeight: '500',
    color: '#00a46c',
    fontSize: 16,
  },
  ViewBottomContainer: {
    flexDirection: 'row',
    width: width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 0.25,
    borderColor: 'gray',
  },
  ViewButtom: {
    width: width * 0.4,
    backgroundColor: '#00a46c',
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewNumProduct: {
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  ButtomPlus: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});
