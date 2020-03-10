import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const Profile = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableHighlight onPress={ () =>  props.userLogout() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Add post</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default Profile
const styles = StyleSheet.create({
    primaryButton: {
    backgroundColor: 'rgb(0, 153, 51)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});