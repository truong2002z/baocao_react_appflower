import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Service from './Service';
import AddService from './AddService';
import Logout from './Logout';
import Setting from './Setting';
import Orders from './Orders';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarIcon = icon => ({ color }) => (
  <Icon name={icon} size={26} style={{ color }} />
);

const ServiceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Service"
        component={Service}
        options={({ navigation }) => ({
          headerRight: () => (
            <React.Fragment>
              <Icon
                name="add"
                size={30}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('AddService')}
              />
             
            </React.Fragment>
          ),
        })}
      />
      <Stack.Screen name="AddService" component={AddService} />
    </Stack.Navigator>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Service'
      barStyle={{ backgroundColor: 'red' }}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name='Service'
        component={ServiceStack}
        options={{
          tabBarIcon: getTabBarIcon('house'),
        }}
      />
      <Tab.Screen
        name='Orders'
        component={Orders}
        options={{
          tabBarIcon: getTabBarIcon('attach-money'),
        }}
      />
      <Tab.Screen
        name='Customer'
        component={Logout}
        options={{
          tabBarIcon: getTabBarIcon('supervised-user-circle'),
        }}
      />
      <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          tabBarIcon: getTabBarIcon('settings'),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
