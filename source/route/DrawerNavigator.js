import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
//tab navigator
import TabNavigator from './TabNavigator';
//drawer Navigator
import DrawerNavigator from './DrawerNavigator';

//screen
import Help from '../screen/drawer/help/Help';
import ContactUs from '../screen/drawer/contactus/ContactUs';

import GlobalInclude from '../globalInclude/GlobalInclude';

const Drawer = createDrawerNavigator();

const drawernavigator = ({props}) => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContentOptions={{
        inactiveTintColor: '#fff',
        contentContainerStyle: {},
        style: {backgroundColor: 'lightgreen'},
      }}
      initialRouteName="TabNavigator">
      <Drawer.Screen
        options={{
          drawerLabel: '',
          swipeEnabled: true,
          drawerIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }}>
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
        name="TabNavigator"
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerLabel: '',
          swipeEnabled: true,
          drawerIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text
                  style={
                    focused ? styles.textStyleUnClick : styles.textStyleClick
                  }>
                  Help
                </Text>
              </View>
            );
          },
        }}
        name="Help"
        component={Help}
      />
      <Drawer.Screen
        options={{
          drawerLabel: '',
          swipeEnabled: true,
          drawerIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text
                  style={
                    focused ? styles.textStyleUnClick : styles.textStyleClick
                  }>
                  ContactUs
                </Text>
              </View>
            );
          },
        }}
        name="ContactUs"
        component={ContactUs}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleUnClick: {
    color: 'white',
  },
  textStyleClick: {
    color: 'black',
  },
});

export default drawernavigator;
