import React, {useEffect} from 'react'
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
} from 'react-native'
import GlobalInclude from '../../../globalInclude/GlobalInclude'
import Helper from '../../../helper/Helper'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const dashboard = () => {
    useEffect(() => {
        setTimeout(() => {}, 3000)
    }, [])

    return (
        <View style={styles.mainView}>
           
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
    },
    innerView: {
        flex: 1,
        backgroundColor: GlobalInclude.Color.Colorwhite,
    },
})

export default dashboard
