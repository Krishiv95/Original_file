import React from 'react';
import {AppRegistry, StyleSheet, View, StatusBar, Platform} from 'react-native';
import GlobalInclude from '../globalInclude/GlobalInclude';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusbar = (props) => {
  return (
    <View
      style={[
        styles.statusBar,
        {
          backgroundColor:
            props.backgroundColor == null
              ? GlobalInclude.Color.Colorwhite
              : props.backgroundColor,
        },
      ]}>
      <StatusBar
        translucent
        backgroundColor={
          props.backgroundColor == null
            ? GlobalInclude.Color.Colorwhite
            : props.backgroundColor
        }
        barStyle={'light-content'}
      />
    </View>
  );
};

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default statusbar;
