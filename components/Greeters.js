import React from 'react'
import { View, Text } from 'react-native'

const Greeters = (props) => {
    return (
        <View>
            <Text>Greetings {props.name} from {props.country}</Text>
        </View>
    )
}

export default Greeters
