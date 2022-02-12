import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const text = (props) => {
  return props.onPress == null ? (
    <View style={[styles.viewStyle, props.viewStyle]}>
      <Text
        style={[styles.textStyle, props.textStyle]}
        numberOfLines={props.numberOfLines}>
        {props.text}
      </Text>
    </View>
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.viewStyle, props.viewStyle]}>
        <Text
          style={[styles.textStyle, props.textStyle]}
          numberOfLines={props.numberOfLines}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {},
  textStyle: {},
});

export default text;
