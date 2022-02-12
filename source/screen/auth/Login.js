// Email : 'hiren@yopmail.com'
// Password : '123456'

import React, {useEffect, useState} from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    ImageBackground,
    Modal,
} from 'react-native'
import GlobalInclude from '../../globalInclude/GlobalInclude'
import Helper from '../../helper/Helper'
import {useDispatch} from 'react-redux'
import {LoginRequest} from '../../redux/actions/LoginAction'
import {scale} from '../../theme/Scalling'
import DeviceInfo from 'react-native-device-info';

const Login = ({navigation}) => {
    const [fEmail, setFEmail] = useState('')

    const [email, setEmail] = useState('akshay@yopmail.com')
    const [password, setPassword] = useState('123456')

    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {}, [])

    const clickOnLogin = () => {

        const deviceId = DeviceInfo.getDeviceId();
        console.log('deviceId : ',deviceId)

        if (!email && !password) {
            Helper.ToastShow('Email and Password Required', 'fail')
        } else if (!email) {
            Helper.ToastShow('Email Required', 'fail')
        } else if (
            email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ===
            null
        ) {
            Helper.ToastShow('Email Not Match', 'fail')
        } else if (!password) {
            Helper.ToastShow('Password Required', 'fail')
        } else {

            let url = 'subscriber_login'

            var data = new FormData()
            data.append('email', email)
            data.append('password', password)
            data.append('device_id', deviceId)

            dispatch(LoginRequest(url, data, navigation))
        }
    }

    const clickOnForgotPassword = () => {
        setShowModal(false)
        global.global_loader_reff.show_loader(1)

        let url = 'forgot_password'

        var data1 = new FormData()
        data1.append('email', fEmail)

        Helper.UrlReq(url, 'POST', data1).then(response => {
            console.log('response123 : ', response)

            if (response.success) {
                Helper.ToastShow(response.message, 'success')
                console.log('if part response : ', response.data)

                global.global_loader_reff.show_loader(0)
            } else {
                Helper.ToastShow(response.message, 'fail')
                global.global_loader_reff.show_loader(0)
            }
        })
    }

    return (
        <ImageBackground
            source={GlobalInclude.Assets.Background}
            style={styles.mainView}>
            <View style={[styles.centerView]}>
                <View
                    style={[
                        {
                            height: '100%',
                            width: '100%',
                            flexDirection: 'row',
                        },
                    ]}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: scale(30),
                                lineHeight: scale(32),
                                fontWeight: '700',
                                color: GlobalInclude.Color.DarkBlue,
                                marginRight: scale(20),
                            }}>
                            Login To Your Account
                        </Text>
                        <Text
                            style={{
                                fontSize: scale(10),
                                color: GlobalInclude.Color.LightText,
                                fontWeight: '300',
                                lineHeight: scale(15),
                                marginTop: scale(10),
                                marginRight: scale(20),
                            }}>
                            Want to learn how you can turn your customer
                            feedback into instant profitable actions with
                            likemetric?
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                paddingVertical: scale(20),
                                backgroundColor: 'white',
                                borderRadius: scale(10),
                            }}>
                            <View
                                style={{
                                    height: scale(40),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    style={{
                                        height: scale(40),
                                        width: scale(160),
                                    }}
                                    source={GlobalInclude.Assets.LMLOGO}
                                />
                            </View>

                            <View style={{marginHorizontal: scale(20)}}>
                                <Text
                                    style={{
                                        fontSize: scale(10),
                                        color: GlobalInclude.Color.DarkBlue,
                                        fontWeight: 'bold',
                                        marginLeft: scale(15),
                                    }}>
                                    Email
                                </Text>
                                <View
                                    style={{
                                        height: scale(35),
                                        borderRadius: scale(35),
                                        borderWidth: 0.25,
                                        borderColor: '#C4C4C4',
                                        marginTop: scale(5),
                                        justifyContent: 'center',
                                    }}>
                                    <TextInput
                                        value={email}
                                        placeholder='johndoe@gmail.com'
                                        placeholderTextColor={
                                            GlobalInclude.Color.PlaceHolder
                                        }
                                        autoCapitalize='none'
                                        onChangeText={value => setEmail(value)}
                                        style={{
                                            height: scale(35),
                                            fontSize: scale(9),
                                            paddingLeft: scale(15),
                                            fontWeight: 'normal',
                                        }}></TextInput>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: scale(20),
                                    marginTop: 15,
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(10),
                                        color: GlobalInclude.Color.DarkBlue,
                                        marginLeft: scale(15),
                                        fontWeight: 'bold',
                                    }}>
                                    Password
                                </Text>
                                <View
                                    style={{
                                        height: scale(35),
                                        borderRadius: scale(35),
                                        borderWidth: 0.25,
                                        borderColor:
                                            GlobalInclude.Color.TextInputBorder,
                                        marginTop: scale(5),
                                        justifyContent: 'center',
                                    }}>
                                    <TextInput
                                        value={password}
                                        placeholder='********'
                                        secureTextEntry={true}
                                        onChangeText={value =>
                                            setPassword(value)
                                        }
                                        placeholderTextColor={
                                            GlobalInclude.Color.PlaceHolder
                                        }
                                        style={{
                                            height: scale(35),
                                            fontSize: scale(9),
                                            paddingLeft: scale(15),
                                        }}></TextInput>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text
                                        onPress={() => {
                                            setShowModal(true)
                                        }}
                                        style={{
                                            fontSize: scale(9),
                                            color: GlobalInclude.Color.DarkBlue,
                                            marginRight: scale(10),
                                            fontWeight: 'bold',
                                            marginTop: scale(7),
                                        }}>
                                        Forgot Password?
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => clickOnLogin()}
                                    style={{
                                        height: scale(35),
                                        backgroundColor:
                                            GlobalInclude.Color.LightPink,
                                        borderRadius: scale(35),
                                        marginTop: scale(15),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: scale(9),
                                            color:
                                                GlobalInclude.Color.Colorwhite,
                                            fontWeight: 'bold',
                                        }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <Modal
                animationType={'none'}
                transparent={true}
                visible={showModal}
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={() => {
                    console.log('Modal has been closed.')
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            width: scale(250),
                            paddingVertical: scale(20),
                            backgroundColor: 'white',
                            borderRadius: scale(10),
                        }}>
                        <View
                            style={{
                                height: scale(20),
                                alignItems: 'flex-end',
                                marginHorizontal: scale(20),
                            }}>
                            <TouchableOpacity
                                onPress={() => setShowModal(false)}>
                                <Image
                                    style={{
                                        height: scale(10),
                                        width: scale(10),
                                    }}
                                    source={GlobalInclude.Assets.X}></Image>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: scale(40),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                style={{
                                    height: scale(40),
                                    width: scale(160),
                                }}
                                source={GlobalInclude.Assets.LMLOGO}
                            />
                        </View>

                        <View style={{marginHorizontal: scale(20)}}>
                            <Text
                                style={{
                                    fontSize: scale(10),
                                    color: GlobalInclude.Color.DarkBlue,
                                    fontWeight: 'bold',
                                    marginLeft: scale(15),
                                }}>
                                Email
                            </Text>
                            <View
                                style={{
                                    height: scale(35),
                                    borderRadius: scale(35),
                                    borderWidth: 0.25,
                                    borderColor: '#C4C4C4',
                                    marginTop: scale(5),
                                    justifyContent: 'center',
                                }}>
                                <TextInput
                                    value={fEmail}
                                    placeholder='johndoe@gmail.com'
                                    placeholderTextColor={
                                        GlobalInclude.Color.PlaceHolder
                                    }
                                    autoCapitalize='none'
                                    onChangeText={value => setFEmail(value)}
                                    style={{
                                        height: scale(35),
                                        fontSize: scale(9),
                                        paddingLeft: scale(15),
                                        fontWeight: 'normal',
                                    }}></TextInput>
                            </View>
                        </View>
                        <View
                            style={{
                                marginHorizontal: scale(20),
                                marginTop: 15,
                            }}>
                            <TouchableOpacity
                                onPress={() => clickOnForgotPassword()}
                                style={{
                                    height: scale(35),
                                    backgroundColor:
                                        GlobalInclude.Color.LightPink,
                                    borderRadius: scale(35),
                                    marginTop: scale(15),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: scale(9),
                                        color: GlobalInclude.Color.Colorwhite,
                                        fontWeight: 'bold',
                                    }}>
                                    Forgot Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        flexDirection: 'row',
    },
    centerView: {flex: 6, alignItems: 'center', marginHorizontal: scale(40)},
})

export default Login
