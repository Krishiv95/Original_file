import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
//tab navigator
import TabNavigator from './TabNavigator';
//drawer Navigator
import DrawerNavigator from './DrawerNavigator';
//screen
import DashBoard from '../screen/tab/dashBoard/Dashboard';
import Profile from '../screen/tab/profile/Profile';
import Login from '../screen/auth/Login';

import GlobalInclude from '../globalInclude/GlobalInclude';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabnavigator = () => {

  // const homeStack = () => {
  //   return(
  //     <Stack.Navigator initialRouteName={'DashBoard'} headerMode={true}>
  //       <Stack.Screen name="DashBoard" component={DashBoard} />
  //       <Stack.Screen name="Login" component={Login} />
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        showIcon: false,
        style: {
          backgroundColor: 'lightgreen',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 100,
          //marginBottom: getStatusBarHeight(true),
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      initialRouteName={'DashBoard'}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarVisible: true,
          headerShown:false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={styles.mainView}>
                <Text
                  style={
                    focused ? styles.textStyleUnClick : styles.textStyleClick
                  }>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        
        options={{
          tabBarVisible: true,
          headerShown:false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={styles.mainView}>
                <Text
                  style={
                    focused ? styles.textStyleUnClick : styles.textStyleClick
                  }>
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '200%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyleUnClick: {
    color: 'blue',
    fontSize: 17,
  },
  textStyleClick: {
    color: 'black',
    fontSize: 15,
  },
});

export default tabnavigator;
