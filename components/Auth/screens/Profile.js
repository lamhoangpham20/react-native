import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import LoadingScreen from '../../LoadingScreen'
const Profile = (props) => {
  if (props.user === null)
  {
    return(<LoadingScreen></LoadingScreen>)
  }
  else{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:50}}>{props.user.name}</Text>
      <TouchableHighlight onPress={ () =>  props.userLogout() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Logout</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
  }
}

export default Profile
const styles = StyleSheet.create({
    primaryButton: {
    backgroundColor: 'rgb(255, 0, 0)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});