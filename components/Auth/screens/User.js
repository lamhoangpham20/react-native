import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

const User = (props) => {
  return (
    <View style={ styles.screen }>
      <Text>{props.user}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default User
