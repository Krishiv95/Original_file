import React, {useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import GlobalInclude from '../../../globalInclude/GlobalInclude';
import Helper from '../../../helper/Helper';

const profile = () => {
  return (
    <View style={styles.mainView}>
      {/* <GlobalInclude.Statusbar backgroundColor={'lightgreen'} /> */}
      <View style={styles.innerView}>
        <GlobalInclude.Text
          text={'Profile'}
          textStyle={{fontSize: 17, textAlign: 'center', marginTop: 200}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.Colorwhite,
  },
});

export default profile;
