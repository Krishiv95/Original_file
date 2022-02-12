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
import Helper from '../../helper/Helper'
// import AsyncStorage from '../../helper/AsyncStorage'
import Constant from '../../theme/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { scale } from '../../theme/Scalling'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ChooseSurvey = props => {
  const [data, setData] = useState([])
  const loginRes = useSelector(state => state.LoginReducer)

  // useEffect(() => {
  //     console.log('loginRes : ', loginRes)
  //     setData(loginRes.data.data)
  //     // AsyncStorage.getItem(Constant.LoginData).then(value => {
  //     //     // console.log('LoginData : ', value)
  //     //     setData(JSON.parse(value))
  //     // })
  //     // const dataAry = AsyncStorage.getItem(Constant.LoginData)

  //     // console.log('dataAry : ',dataAry)
  //     // setData(JSON.parse(dataAry))
  // }, [])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    global.global_loader_reff.show_loader(1)

    let url = 'single_workspace'

    var subscriber_id = 1

    GlobalInclude.AsyncStorage.getItem('loginstatus').then(value => {
      var data1 = new FormData()
      data1.append('subscriber_id', JSON.parse(value))
      data1.append('workspace_id', props.route.params.id)

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
        <View style={styles.mainContainer}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.mainText}>Choose Survey</Text>
          </View>

          {data.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Rating', {
                    id: item.id,
                    name: item.name
                  })
                }
                style={styles.btnView}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.medelView}>
                    <View style={styles.boxView}>
                      <Text style={styles.boxText}>NPS Survey</Text>
                    </View>
                  </View>
                  <View style={styles.mainBoxViewText}>
                    <Text style={styles.textOne}>{item.name}</Text>
                    <Text style={styles.textTwo}>
                      In Mine. Last modified on {item.updated_at}
                    </Text>
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
  mainContainer: {
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
  btnView: {
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
  medelView: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center'
  },
  boxView: {
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
  mainBoxViewText: {
    flex: 6,
    justifyContent: 'center'
  },
  textOne: {
    fontSize: scale(14),
    fontWeight: 'normal',
    color: GlobalInclude.Color.ColorBlack
  },
  textTwo: {
    fontSize: scale(11),
    fontWeight: 'normal',
    color: GlobalInclude.Color.PlaceHolder
  }
})

export default ChooseSurvey
