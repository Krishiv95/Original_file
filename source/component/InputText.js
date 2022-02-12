import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import GlobalInclude from '../globalInclude/GlobalInclude';

const textinput = (props) => {
  return (
    <View>
      <View style={[styles.viewStyle, props.viewStyle]}>
        <TextInput
          style={[styles.inputStyle, props.inputStyle]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          value={props.value}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
          secureTextEntry={props.secureTextEntry}
          underlineColorAndroid="transparent"
          editable={props.editable}
          onChangeText={props.onChangeText}
        />
        {props.icon != null ? (
          props.onPressIcon != null ? (
            <TouchableOpacity
              style={props.iconView}
              onPress={props.onPressIcon}>
              <Image source={props.icon} style={props.iconStyle} />
            </TouchableOpacity>
          ) : (
            <View style={props.iconView}>
              <Image source={props.icon} style={props.iconStyle} />
            </View>
          )
        ) : null}
      </View>
      <GlobalInclude.Text
        text={props.error}
        textStyle={{
          marginLeft: 20,
          fontSize: 12,
          color: GlobalInclude.Color.ColorBlack,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {},
  inputStyle: {},
});

export default textinput;
