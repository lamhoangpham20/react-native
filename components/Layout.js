import React from 'react'
import { View, Text } from 'react-native'

const Layout = () => {
    return (
        <View style={{ flex: 1 }}>
        <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: '#4fc2f7' }}></View>
            <View style={{ flex: 2, backgroundColor: '#0093c4' }}></View>
        </View>
            <View style={{ flex: 4, backgroundColor: '#7cb342' }}></View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ flex: 2, backgroundColor: '#4b830d' }}></View>
                <View style={{ flex: 2, backgroundColor: '#aeff71' }}></View>
                <View style={{ flex: 2, backgroundColor: '#4b830d' }}></View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#0093c4' }}></View>
            <View style={{ flex: 1, backgroundColor: '#4fc2f7' }}></View>
        </View>
    )
}

export default Layout
