import React, { useState, useEffect } from 'react'
import {} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import GlobalInclude from '../globalInclude/GlobalInclude'
//tab navigator
import TabNavigator from './TabNavigator'
//drawer Navigator
import DrawerNavigator from './DrawerNavigator'

//screen
import Splash from '../screen/auth/Splash'
import Login from '../screen/auth/Login'

import Rating from '../screen/pages/Rating'
import WorkSpace from '../screen/pages/WorkSpace'
import ChooseSurvey from '../screen/pages/ChooseSurvey'
import AsyncStorage from './../helper/AsyncStorage'
import Constant from '../theme/Constant'
import DeviceInfo from 'react-native-device-info'

const stackNavigator = () => {
  const Stack = createStackNavigator()

  const [initRoute, setInitRoute] = useState(null)

  const sessionInfo = async () => {
    console.log('sessionInfo =>')

    const deviceId = DeviceInfo.getDeviceId()
    console.log('deviceId : ', deviceId)

    var data1 = new FormData()
    data1.append('device_id', 'deviceId')

    try {
      const response = await fetch(Constant.baseURL + 'check_deviceid', {
        method: 'POST',
        body: data1
        // headers: headers,
      })
      let responseJson = await response.json()

      console.log('BodyDataJson ==>', JSON.stringify(data1))
      // console.log('BodyDataString ==>', loginString);
      console.log('responseJson => ', responseJson.login_status)
      if (responseJson.login_status) {
        setInitRoute('WorkSpace')
      } else {
        // no access token
        setInitRoute('Login')
      }
    } catch (err) {
      console.log('error', err)
    }

    // AsyncStorage.getItem(GlobalInclude.Constant.sessId).then((value) => {
    //   console.log('Tokan =>', value);
    //   if (value === null) {
    //     setInitRoute('Login');
    //   } else {
    //     // no access token
    //     setInitRoute('WorkSpace');
    //   }
    // });
  }

  useEffect(() => {
    sessionInfo()
  }, [initRoute])

  return (
    initRoute && (
      <Stack.Navigator initialRouteName={initRoute} headerMode={true}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Rating' component={Rating} />
        <Stack.Screen name='WorkSpace' component={WorkSpace} />
        <Stack.Screen name='ChooseSurvey' component={ChooseSurvey} />
      </Stack.Navigator>
    )
  )
}

export default stackNavigator
