import React from 'react'
import { View, Text } from 'react-native'
import Auth from '../Auth/Auth'
import AddPost from '../Auth/screens/AddPost'
const SecondaryView = (props) => {

  if(props.token === null)
  {
      console.log('hello');
      return( <Auth apiURI = {props.apiURI}
      userLogin = {props.userLogin}
      successScreen={props.successScreen}
      updateData = {props.updateData}></Auth>)
  }
  else{
  return (
    <AddPost user={props.user} token={props.token} apiURI = {props.apiURI}
    updateData = {props.updateData}></AddPost>
  )
  }
}

export default SecondaryView
