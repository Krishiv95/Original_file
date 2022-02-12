import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const image = (props) => {
  return props.onPress == null ? (
    <View style={[styles.viewStyle, props.viewStyle]}>
      {props.uri == true ? (
        <Image
          source={{uri: props.source}}
          style={[styles.imageStyle, props.imageStyle]}
        />
      ) : (
        <Image
          source={props.source}
          style={[styles.imageStyle, props.imageStyle]}
        />
      )}
    </View>
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.viewStyle, props.viewStyle]}>
        {props.uri == true ? (
          <Image
            source={{uri: props.source}}
            style={[styles.imageStyle, props.imageStyle]}
          />
        ) : (
          <Image
            source={props.source}
            style={[styles.imageStyle, props.imageStyle]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {},
  imageStyle: {},
});

export default image;
