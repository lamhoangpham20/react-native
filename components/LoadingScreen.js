import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={ styles.screen }>
      <ActivityIndicator size="large" color="#D3D3D3" />
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

export default LoadingScreen
