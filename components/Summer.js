import React from 'react'
import { View, Text } from 'react-native'

const Summer = (props) => {
    return (
        <View>
            <Text>{props.a} + {props.b} = {props.a + props.b}</Text>
        </View>
    )
}

export default Summer
