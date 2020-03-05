import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = (props) => {
  return (
    <View style={ [styles.main, { height: props.height }] }>
      <Feather name='chevron-left' color='white' size={50}></Feather>
      <MaterialCommunityIcons name='dots-horizontal' color='white' size={50}></MaterialCommunityIcons>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor : '#4a75a2',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
})

export default Header
