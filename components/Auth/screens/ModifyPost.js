import React from 'react'
import { View, Text } from 'react-native'
import LoadingScreen from '../../LoadingScreen'
const ModifyPost = (props) => {
  if (props.user === null)
  {
    return(<LoadingScreen></LoadingScreen>)
  }
  else{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {props.products.filter(i=>i.name === props.user.name).map(i=>
        <Text key={i.idproduct}>{i.Title}</Text>)}
    </View>
  )
      }
  }


export default ModifyPost
