import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Modal
} from 'react-native'
import GlobalInclude from '../../globalInclude/GlobalInclude'
import Helper from '../../helper/Helper'
import { useDispatch, useSelector } from 'react-redux'
import { LoginRequest } from '../../redux/actions/LoginAction'
import { scale } from '../../theme/Scalling'
import ProgressCircle from 'react-native-progress-circle'

const numberData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  },
  {
    id: 9
  },
  {
    id: 10
  }
]

const emojiData = [
  {
    image: GlobalInclude.Assets.KingUnfill
  },
  {
    image: GlobalInclude.Assets.KingUnfill
  },
  {
    image: GlobalInclude.Assets.KingUnfill
  },
  {
    image: GlobalInclude.Assets.KingUnfill
  },
  {
    image: GlobalInclude.Assets.KingUnfill
  }
]

const slectImageData = [
  {
    index: 0,
    img:
      'https://likemetric.io/dev/public/images_1/1641557227_Screen Shot 2021-12-13 at 21.44.55.png',
    text: 'First Choice'
  },
  {
    index: 1,
    img:
      'https://likemetric.io/dev/public/images_1/1641557282_image_2021_12_31T10_36_06_027Z.png',
    text: 'Second Choice'
  }
]

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Rating = props => {
  const [data, setData] = useState([])

  const [questionId, setQuestionId] = useState(0)
  const [indexData, setIndexData] = useState(0)
  const [lastIndexData, setLastIndexData] = useState(0)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [textAns, setTextAns] = useState('')

  const [stratAgain, setStartAgain] = useState(5)
  const [showModal, setShowModal] = useState(false)

  const [question, setQuestion] = useState(null)
  const [description, setDescription] = useState(null)
  const [options, setOptions] = useState({})

  const [selectedImage, setSelectedImage] = useState(99)

  const [buttonText, setButtonText] = useState(null)

  const dispatch = useDispatch()

  const changepreScreen = (data, ind) => {
    console.log('changeScreen : ', data)

    setLastIndexData(data.length - 1)

    var finalind = ind - 1

    data.map((item, index) => {
      console.log('index : ', index)
      console.log('indexData : ', indexData)
      console.log('item : ', item)
      console.log('++++++++++++++++++++++++++++++++++')
      if (index === finalind) {
        console.log('index : ', index)
        console.log('indexData : ', indexData)
        console.log('item : ', item)
        console.log('condition Done')

        setIndexData(index)
        setQuestionId(item.question_type_id)
        setQuestion(item.question)
        // setDescription(item.description)

        if (item.options !== null) {
          setOptions(item.options)
        } else {
          setOptions({})
        }

        if (item.question_type_id === 4) {
          setTimeout(() => {
            data.map((item, index) => {
              if (index === 0) {
                setIndexData(0)

                setStartAgain(stratAgain + 1)
              }
            })
          }, 2000)
        }
      }
    })
  }

  const changeScreen = data => {
    console.log('changeScreen : ', data)

    setLastIndexData(1 + data.length - 1)

    data.map((item, index) => {
      console.log('index : ', index)
      console.log('indexData : ', indexData)
      console.log('item : ', item)
      console.log('++++++++++++++++++++++++++++++++++')
      if (index === indexData) {
        console.log('index : ', index)
        console.log('indexData : ', indexData)
        console.log('item : ', item)
        console.log('condition Done')
        setIndexData(index + 1)
        setQuestionId(item.question_type_id)
        setQuestion(item.question)
        setDescription(item.description)

        if (item.options !== null) {
          setOptions(item.options)
        } else {
          setOptions({})
        }

        if (item.question_type_id === 4) {
          setTimeout(() => {
            data.map((item, index) => {
              if (index === 0) {
                setIndexData(0)
                setStartAgain(stratAgain + 1)
              }
            })
          }, 2000)
        }
      }
    })
  }

  const textDataAns = text => {
    if (text === '') {
      alert('Please enter your feedback')
    } else {
      sendDataIntoAPI(text, questionId)
    }
  }

  const clickOnLogin = () => {
    if (!email && !password) {
      Helper.ToastShow('Email and Password Required', 'fail')
    } else if (!email) {
      Helper.ToastShow('Email Required', 'fail')
    } else if (
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null
    ) {
      Helper.ToastShow('Email Not Match', 'fail')
    } else if (!password) {
      Helper.ToastShow('Password Required', 'fail')
    } else {
      // global.global_loader_reff.show_loader(1)
      setShowModal(false)

      let url = 'subscriber_login'

      var data = new FormData()
      data.append('email', email)
      data.append('password', password)
      data.append('device_id', 1234567890)

      dispatch(LoginRequest(url, data, props.navigation))
    }
  }

  const sendDataIntoAPI = (res, qid) => {
    global.global_loader_reff.show_loader(1)

    console.log('res : ', res)
    console.log('qid : ', qid)

    GlobalInclude.AsyncStorage.getItem('loginstatus').then(value => {
      let url = 'send_survey_response'

      var data1 = new FormData()
      data1.append('survey_id', props.route.params.id)
      data1.append('subscriber_id', JSON.parse(value))
      data1.append('response', res)
      data1.append('question_id', qid)

      Helper.UrlReq(url, 'POST', data1).then(response => {
        console.log('response123 : ', response)
        if (response.data != null) {
          if (response.success) {
            // Helper.ToastShow(response.message, 'success')
            console.log('if part response : ', response.data)

            changeScreen(data)

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

  const send_survay = () => {
    setIndexData(0)
    setQuestionId(0)
    changeScreen(data)
    // props.navigation.navigate('Login')
  }

  useEffect(() => {
    console.log('stratAgain : ', stratAgain)
    if (stratAgain == 0) {
      console.log('if part')
    } else {
      console.log('else part')
      setIndexData(0)
      setQuestionId(5)
      getQueDetails()
    }

    // setStartAgain(false)
  }, [stratAgain])

  const getQueDetails = () => {
    setIndexData(0)
    setQuestionId(5)

    console.log('ID : ', props.route.params.id)

    global.global_loader_reff.show_loader(1)

    let url = 'single_survey'

    GlobalInclude.AsyncStorage.getItem('loginstatus').then(value => {
      var data = new FormData()
      data.append('survey_id', props.route.params.id)
      data.append('subscriber_id', JSON.parse(value))

      Helper.UrlReq(url, 'POST', data).then(response => {
        console.log('response123 : ', response)
        if (response.data != null) {
          if (response.success) {
            // Helper.ToastShow(response.message, 'success')
            console.log('if part response : ', response.data)
            setData(response.data)

            changeScreen(response.data)

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
    <View style={styles.container}>
      <View style={styles.rightSideView}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true)
          }}
        >
          <Image
            style={styles.btnImage}
            source={GlobalInclude.Assets.HOME}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 5 }}>
        {/* {questionId === 0 ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: scale(40),
                                fontWeight: '600',
                                marginTop: scale(2),
                                color: GlobalInclude.Color.ColorBlack,
                            }}>
                            {props.route.params.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(13),
                                fontWeight: '400',
                                marginTop: scale(50),
                                color: GlobalInclude.Color.PlaceHolder,
                            }}>
                            Please give us your feedback.
                        </Text>

                        <TouchableOpacity
                            onPress={() => getQueDetails()}
                            style={{
                                paddingHorizontal: scale(20),
                                height: scale(35),
                                backgroundColor: GlobalInclude.Color.LightPink,
                                marginTop: scale(15),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: height * 0.1,
                                marginBottom: height * 0.05,
                                alignSelf: 'center',
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    fontSize: scale(10),
                                    color: 'white',
                                }}>
                                Click to start
                            </Text>

                            <Image
                                style={{
                                    height: scale(12),
                                    width: scale(8),
                                    marginLeft: scale(12),
                                }}
                                source={
                                    GlobalInclude.Assets.ArrowRight
                                }></Image>
                        </TouchableOpacity>
                    </View>
                ) : null} */}
        {questionId === 1 ? (
          <View style={styles.queOnewView}>
            <Text style={styles.oneThext}>Question {indexData - 1}</Text>
            {question !== null ? (
              <Text style={styles.nullText}>{question}</Text>
            ) : null}
            {description !== null ? (
              <Text style={styles.desNullText}>{description}</Text>
            ) : null}

            <View style={styles.btnViewOne}>
              {numberData.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      sendDataIntoAPI(item.id, questionId)
                    }}
                    style={styles.viewBtnStyle}
                  >
                    <Text style={styles.btnTextView}>{item.id}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={styles.likeView}>
              <View style={styles.likeViewAlign}>
                <Text style={styles.leastText}>Least Likely</Text>
              </View>
              <View style={styles.mostLike}></View>
              <View style={styles.mostLikeViewStyl}>
                <Text style={styles.mostLikeText}>Most Likely</Text>
              </View>
            </View>
            <Text style={styles.skipBtnView} onPress={() => changeScreen(data)}>
              Skip
            </Text>
          </View>
        ) : null}

        {questionId === 2 ? (
          <View style={styles.queOnewView}>
            <Text style={styles.oneThext}>Question {indexData - 1}</Text>
            {question !== null ? (
              <Text style={styles.nullText}>{question}</Text>
            ) : null}
            {description !== null ? (
              <Text style={styles.desNullText}>{description}</Text>
            ) : null}

            <View style={styles.twoViewStyl}>
              {emojiData.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      sendDataIntoAPI(index + 1, questionId)
                    }}
                    style={styles.touchView}
                  >
                    <Image source={item.image} style={styles.touchImage} />
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.skipBtnView} onPress={() => changeScreen(data)}>
              Skip
            </Text>
          </View>
        ) : null}
        {questionId === 3 ? (
          <View style={styles.queOnewView}>
            <Text style={styles.oneThext}>Question {indexData - 1}</Text>
            {question !== null ? (
              <Text style={styles.nullText}>{question}</Text>
            ) : null}
            {description !== null ? (
              <Text style={styles.desNullText}>{description}</Text>
            ) : null}

            <View style={styles.resView}>
              <TextInput
                style={styles.resInput}
                // textAlign='center'
                textAlignVertical='center'
                placeholder='Please enter your response'
                // placeholderTextColor={'#0D1F4A'}
                multiline={true}
                numberOfLines={3}
                onChangeText={val => setTextAns(val)}
              />
            </View>

            <View style={styles.nextView}>
              <TouchableOpacity
                onPress={() => textDataAns(textAns)}
                style={styles.nextBtnView}
              >
                <Text style={styles.nextBtnText}>NEXT</Text>

                <Image
                  style={styles.nextBtnImage}
                  source={GlobalInclude.Assets.ArrowRight}
                />
              </TouchableOpacity>

              <Text style={styles.pressText} onPress={() => changeScreen(data)}>
                Press <Text style={styles.enterText}>ENTER</Text> key to submit
              </Text>
            </View>
          </View>
        ) : null}

        {questionId === 6 ? (
          <ScrollView>
            <View style={styles.queOnewView}>
              <Text style={styles.oneThext}>Question {indexData - 1}</Text>

              {question !== null ? (
                <Text style={styles.nullText}>{question}</Text>
              ) : null}
              {description !== null ? (
                <Text style={styles.desNullText}>{description}</Text>
              ) : null}

              <View style={styles.imageView}>
                {slectImageData.map((item, index) => {
                  return index === selectedImage ? (
                    <Image source={{ uri: item.img }} style={styles.ifImage} />
                  ) : (
                    <TouchableOpacity onPress={() => setSelectedImage(index)}>
                      <Image
                        source={{ uri: item.img }}
                        style={styles.elseImage}
                      />
                    </TouchableOpacity>
                  )
                })}
              </View>

              <View style={styles.nextView}>
                <TouchableOpacity
                  onPress={() => textDataAns(textAns)}
                  style={styles.nextBtnView}
                >
                  <Text
                    style={{
                      fontSize: scale(10),
                      color: 'white'
                    }}
                  >
                    NEXT
                  </Text>

                  <Image
                    style={styles.nextBtnImage}
                    source={GlobalInclude.Assets.ArrowRight}
                  />
                </TouchableOpacity>

                <Text
                  style={styles.pressText}
                  onPress={() => changeScreen(data)}
                >
                  Press <Text style={styles.enterText}>ENTER</Text> key to
                  submit
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : null}
        {questionId === 4 ? (
          <View style={styles.centerView}>
            {question !== null ? (
              <Text style={styles.queForText}>{question}</Text>
            ) : null}

            {options.img !== undefined ? (
              <Image
                source={{
                  uri: options.img
                }}
                resizeMode='contain'
                style={styles.undifindImage}
              />
            ) : null}

            {description !== null ? (
              <Text style={styles.forNullText}>{description}</Text>
            ) : null}
          </View>
        ) : null}
        {questionId === 5 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.centerView]}>
              {question !== null ? (
                <Text style={styles.queForText}>{question}</Text>
              ) : null}

              {options.img !== undefined ? (
                <Image
                  source={{
                    uri: options.img
                  }}
                  resizeMode='stretch'
                  style={styles.undifindImage}
                />
              ) : null}

              {description !== null ? (
                <Text style={styles.forNullText}>{description}</Text>
              ) : null}

              {data.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => changeScreen(data)}
                  style={styles.continueBtnView}
                >
                  <Text
                    style={{
                      fontSize: scale(10),
                      color: 'white'
                    }}
                  >
                    {options.button_label !== undefined
                      ? options.button_label
                      : 'Continue'}
                  </Text>

                  <Image
                    style={styles.continueBtnImagePress}
                    source={GlobalInclude.Assets.ArrowRight}
                  ></Image>
                </TouchableOpacity>
              ) : null}
            </View>
          </ScrollView>
        ) : null}
      </View>

      <View style={styles.tebView}>
        <ProgressCircle
          percent={(100 / lastIndexData) * indexData}
          radius={scale(16)}
          borderWidth={scale(3)}
          color='#000'
          shadowColor='#999'
          bgColor='#fff'
        >
          <Text style={{ fontSize: scale(10), marginLeft: scale(2) }}>
            {isNaN(((100 / lastIndexData) * indexData).toFixed(0))
              ? 0
              : ((100 / lastIndexData) * indexData).toFixed(0)}
            <Text style={{ fontSize: scale(7) }}>%</Text>
            {/* {Math.round((indexData) * lastIndexData) / 100} */}
          </Text>
        </ProgressCircle>
        <View style={{ flex: 1 }}></View>

        <Image style={styles.imageLogo} source={GlobalInclude.Assets.LMLOGO} />

        <TouchableOpacity
          onPress={() => {
            changepreScreen(data, indexData)
          }}
          style={styles.tebMainView}
        >
          <View style={styles.tebCenterView} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeScreen(data)}
          style={styles.tebMainView}
        >
          <View style={styles.eroBtn} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType={'none'}
        transparent={true}
        visible={showModal}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {
          console.log('Modal has been closed.')
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={styles.mainViewContainer}>
            <View
              style={{
                height: 20,
                alignItems: 'flex-end',
                marginHorizontal: 20
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Image
                  style={{
                    height: scale(10),
                    width: scale(10)
                  }}
                  source={GlobalInclude.Assets.X}
                ></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.xView}>
              <Image
                style={styles.xImage}
                source={GlobalInclude.Assets.LMLOGO}
              />
            </View>

            <View style={{ marginHorizontal: scale(20) }}>
              <Text style={styles.emailText}>Email</Text>
              <View style={styles.emailBoxView}>
                <TextInput
                  value={email}
                  placeholder='johndoe@gmail.com'
                  placeholderTextColor={GlobalInclude.Color.PlaceHolder}
                  autoCapitalize='none'
                  onChangeText={value => setEmail(value)}
                  style={styles.mailInput}
                ></TextInput>
              </View>
            </View>
            <View style={styles.passwordView}>
              <Text style={styles.passwordText}>Password</Text>
              <View style={styles.emailBoxView}>
                <TextInput
                  value={password}
                  placeholder='********'
                  secureTextEntry={true}
                  onChangeText={value => setPassword(value)}
                  placeholderTextColor={GlobalInclude.Color.PlaceHolder}
                  style={styles.mailInput}
                ></TextInput>
              </View>
              <View style={styles.fpView}>
                <Text
                  onPress={() => {
                    setShowModal(true)
                  }}
                  style={styles.fpBtnView}
                >
                  Forgot Password?
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => clickOnLogin()}
                style={styles.loginBtnView}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: 'white' },
  rightSideView: {
    flex: 0.7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(10)
  },
  btnImage: {
    height: scale(20),
    width: scale(20)

    // marginTop: 15,
  },
  queOnewView: {
    flex: 1,
    paddingLeft: scale(50),
    justifyContent: 'center'
  },
  oneThext: {
    fontSize: scale(13),
    fontWeight: '400',
    color: GlobalInclude.Color.PlaceHolder
  },
  nullText: {
    fontSize: scale(20),
    fontWeight: '400',
    marginTop: scale(2),
    color: GlobalInclude.Color.ColorBlack
  },
  desNullText: {
    fontSize: scale(13),
    fontWeight: '400',
    marginTop: scale(2),
    color: GlobalInclude.Color.PlaceHolder
  },
  btnViewOne: {
    width: scale(400),
    flexDirection: 'row',
    marginTop: scale(20),
    borderWidth: 0.5,
    borderRadius: scale(5),
    overflow: 'hidden'
  },
  viewBtnStyle: {
    flex: 1,
    height: scale(40),
    //borderRadius: width * 0.07,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GlobalInclude.Color.ColorBlack,
    borderWidth: 0.5
    // opacity:0.2
  },
  btnTextView: {
    fontSize: scale(11),
    fontWeight: '700',
    color: GlobalInclude.Color.ColorBlack,
    opacity: 1
  },
  likeView: {
    width: scale(400),
    height: scale(30),
    flexDirection: 'row'
  },
  likeViewAlign: { flex: 1, justifyContent: 'center' },
  leastText: {
    fontSize: scale(11),
    color: GlobalInclude.Color.PlaceHolder
  },
  mostLike: {
    flex: 1,
    justifyContent: 'center'
  },
  mostLikeViewStyl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mostLikeText: {
    fontSize: scale(11),
    color: GlobalInclude.Color.PlaceHolder
  },
  skipBtnView: {
    fontSize: scale(12),
    fontWeight: '500',
    marginTop: scale(15),
    marginLeft: 2,
    color: GlobalInclude.Color.PlaceHolder
  },
  twoViewStyl: {
    width: '80%',
    flexDirection: 'row',
    // marginLeft: scale(-18),
    marginTop: scale(20)
  },
  touchView: {
    //marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchImage: {
    height: scale(40),
    width: scale(40),
    marginRight: scale(10)
  },
  resView: {
    height: scale(40),
    width: scale(500),
    backgroundColor: 'white',
    //borderRadius: 5,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    marginVertical: scale(10),
    marginTop: scale(20)
  },
  resInput: {
    height: scale(40),
    width: scale(500),
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    fontSize: scale(15)
  },
  nextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(15)
  },
  nextBtnView: {
    paddingHorizontal: scale(20),
    height: scale(35),
    backgroundColor: '#01C079',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height * 0.1,
    flexDirection: 'row'
    // marginBottom: height * 0.05,
  },
  nextBtnText: {
    fontSize: scale(10),
    color: 'white'
  },
  nextBtnImage: {
    height: scale(12),
    width: scale(8),
    marginLeft: scale(12)
  },
  pressText: {
    fontSize: scale(9),
    fontWeight: '500',
    marginLeft: scale(10),
    color: GlobalInclude.Color.PlaceHolder
  },
  enterText: {
    fontSize: scale(10),
    fontWeight: '800',
    marginLeft: scale(10),
    color: GlobalInclude.Color.PlaceHolder
  },
  imageView: { flexDirection: 'row' },
  ifImage: {
    height: scale(100),
    width: scale(150),
    marginTop: scale(20),
    backgroundColor: '#000',
    opacity: 0.5,
    marginRight: scale(10),
    borderRadius: scale(10)
  },
  elseImage: {
    height: scale(100),
    width: scale(150),
    marginTop: scale(20),
    marginRight: scale(10),
    borderRadius: scale(10)
  },
  queForText: {
    fontSize: scale(22),
    marginHorizontal: scale(30),
    textAlign: 'center',
    fontWeight: '500',
    color: GlobalInclude.Color.ColorBlack
  },
  undifindImage: {
    height: scale(110),
    width: scale(180),
    marginTop: scale(20),
    borderRadius: scale(10)
  },
  forNullText: {
    fontSize: scale(11),
    marginHorizontal: scale(30),
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: scale(50),
    color: GlobalInclude.Color.PlaceHolder,
    marginTop: scale(20)
  },
  continueBtnView: {
    paddingHorizontal: scale(22),
    height: scale(38),
    backgroundColor: '#01C079',
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height * 0.1,
    marginBottom: height * 0.05,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  continueBtnImagePress: {
    height: scale(12),
    width: scale(8),
    marginLeft: scale(12)
  },
  tebView: {
    flex: 0.8,
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageLogo: {
    height: scale(40),
    width: scale(140),
    marginBottom: scale(-22),
    marginRight: scale(-24)
  },
  tebMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(25),
    width: scale(25),
    borderWidth: 1,
    borderRadius: scale(25),
    marginRight: scale(5)
  },
  tebCenterView: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    //borderStyle: 'solid',
    borderLeftWidth: scale(6),
    borderRightWidth: scale(6),
    borderBottomWidth: scale(10),
    marginLeft: -4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    transform: [{ rotate: '270deg' }],
    margin: 0,
    borderWidth: 0
    // borderColor: 'black',
  },
  eroBtn: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    //borderStyle: 'solid',
    borderLeftWidth: scale(6),
    borderRightWidth: scale(6),
    borderBottomWidth: scale(10),
    marginLeft: -4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    transform: [{ rotate: '90deg' }],
    margin: 0,
    borderWidth: 0
    // borderColor: 'black',
  },
  mainViewContainer: {
    paddingVertical: scale(20),
    width: scale(300),
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: scale(10)
  },
  xView: {
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  xImage: {
    height: scale(40),
    width: scale(160)
  },
  emailText: {
    fontSize: scale(10),
    color: GlobalInclude.Color.DarkBlue,
    fontWeight: 'bold',
    marginLeft: scale(15)
  },
  emailBoxView: {
    height: scale(35),
    borderRadius: scale(35),
    borderWidth: 0.25,
    borderColor: '#C4C4C4',
    marginTop: scale(5),
    justifyContent: 'center'
  },
  mailInput: {
    height: scale(35),
    fontSize: scale(9),
    paddingLeft: scale(15),
    fontWeight: 'normal'
  },
  passwordView: {
    marginHorizontal: scale(20),
    marginTop: 15
  },
  passwordText: {
    fontSize: scale(10),
    color: GlobalInclude.Color.DarkBlue,
    marginLeft: scale(15),
    fontWeight: 'bold'
  },
  fpView: { alignItems: 'flex-end' },
  fpBtnView: {
    fontSize: scale(9),
    color: GlobalInclude.Color.DarkBlue,
    marginRight: scale(10),
    fontWeight: 'bold',
    marginTop: scale(7)
  },
  loginBtnView: {
    height: scale(35),
    // marginHorizontal: 40,
    backgroundColor: GlobalInclude.Color.LightPink,
    borderRadius: scale(35),
    marginTop: scale(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: scale(9),
    color: GlobalInclude.Color.Colorwhite,
    fontWeight: 'bold'
  }
})

export default Rating
