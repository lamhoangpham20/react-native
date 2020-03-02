import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const UI = () => {
    return (
        <View style={{ flex: 1, marginLeft:"3%", marginRight:"3%" }}>
            <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#406c6b' }}>
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="white" />
                </View>
                <View style={{ flex: 10 }}></View>
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                    <Ionicons name="ios-arrow-round-back" size={50} color="white" />
                </View>
            </View>
            <View style={{ flex: 2, backgroundColor: '#406c6b' }}>
            <Text style={{color:'white'}}>Your wallet</Text>
            <Text style={{color:'white', fontSize: "2em"}}>$1750.50</Text>
            </View>
            <View style={{ flex: 3, backgroundColor: 'white' }}></View>
            <View style={{ flex: 1, backgroundColor: '#f5f6f8' }}>
            <Text style={{justifyContent: 'center'}}>Detail Information</Text></View>
            <View style={{ flex: 6, backgroundColor: 'white', flexDirection:'column' }}>
            <View style={{ flex: 1, flexDirection:'row' }}>
            <View style={{ flex: 1, backgroundColor: 'yellow', marginRight : "0.5%", marginBottom : "0.5%"}}></View>
            <View style={{ flex: 1, backgroundColor: 'green' , marginLeft : "0.5%", marginBottom : "0.5%"}}></View>
            </View>
            <View style={{ flex: 1, flexDirection:'row' }}>
            <View style={{ flex: 1, backgroundColor: 'red' , marginRight : "0.5%", marginTop : "0.5%" }}></View>
            <View style={{ flex: 1, backgroundColor: 'blue' , marginLeft : "0.5%", marginTop : "0.5%" }}></View>
            </View>
            
            </View>
        </View>
    )
}

export default UI
