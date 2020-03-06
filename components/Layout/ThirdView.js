import React from 'react'
import { View, Text } from 'react-native'
import Auth from '../Auth/Auth'
import ModifyPost from '../Auth/screens/ModifyPost'
const ThirdView = (props) => {
  if(props.token === null)
  {
      console.log('hello');
      return( <Auth apiURI = {props.apiURI}
      userLogin = {props.userLogin}
      successScreen={props.successScreen}
      products = {props.products}></Auth>)
  }
  else{
  return (
    <ModifyPost user={props.user} token={props.token} products = {props.products}></ModifyPost>
  )
  }
}

export default ThirdView
