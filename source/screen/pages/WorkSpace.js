import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native'
import GlobalInclude from '../../globalInclude/GlobalInclude'

import { useDispatch, useSelector } from 'react-redux'
import Helper from '../../helper/Helper'
import { scale } from '../../theme/Scalling'
import AsyncStorage from '@react-native-async-storage/async-storage'

const workSpace = ({ navigation }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    global.global_loader_reff.show_loader(1)

    var subscriber_id = 1

    GlobalInclude.AsyncStorage.getItem('loginstatus').then(value => {
      //   subscriber_id = JSON.parse(value)

      let url = 'get_all_workspace'

      var data1 = new FormData()
      data1.append('subscriber_id', JSON.parse(value))

      console.log('data1 : ', data1)

      Helper.UrlReq(url, 'POST', data1).then(response => {
        console.log('response123 : ', response)
        if (response.data != null) {
          if (response.success) {
            // Helper.ToastShow(response.message, 'success')
            console.log('if part response : ', response.data)

            setData(response.data)

            global.global_loader_reff.show_loader(0)
          } else {
            Helper.ToastShow(response.message, 'fail')
            global.global_loader_reff.show_loader(0)
          }
        } else {
          Helper.ToastShow(response.message, 'fail')
          global.global_loader_reff.show_loader(0)
        }
      })
    })
  }

  return (
    <View style={styles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainTextView}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.mainText}>Choose Workspaces</Text>
          </View>

          {data.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChooseSurvey', {
                    id: item.id
                  })
                }
                style={styles.touchableMainView}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.inerBox}>
                    <View style={styles.inerBoxView}>
                      <Text style={styles.boxText}>NPS Survey</Text>
                    </View>
                  </View>
                  <View style={styles.inerDetailView}>
                    <Text style={styles.inerTextView}>{item.title}</Text>
                    {/* <Text
                                            style={{
                                                fontSize: scale(11),
                                                fontWeight: 'normal',
                                                color:
                                                    GlobalInclude.Color
                                                        .PlaceHolder,
                                            }}>
                                            In Mine. Last modified on{' '}
                                            {item.updated_at}
                                        </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainTextView: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainText: {
    fontSize: scale(25),
    marginHorizontal: scale(30),
    marginVertical: scale(20),
    textAlign: 'center',
    fontWeight: '500',
    color: GlobalInclude.Color.ColorBlack
  },
  touchableMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(10),
    marginBottom: scale(15),
    borderRadius: scale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  inerBox: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center'
  },
  inerBoxView: {
    height: scale(60),
    width: scale(60),
    backgroundColor: '#05B36D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5)
  },
  boxText: {
    textAlign: 'center',
    fontWeight: '900',
    color: GlobalInclude.Color.Colorwhite,
    fontSize: scale(11)
  },
  inerDetailView: {
    flex: 6,
    justifyContent: 'center'
  },
  inerTextView: {
    fontSize: scale(14),
    fontWeight: 'normal',
    color: GlobalInclude.Color.ColorBlack
  }
})

export default workSpace
