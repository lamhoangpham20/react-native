import React from 'react'
import { View, Text } from 'react-native'
import Auth from '../Auth/Auth'
import Profile from '../Auth/screens/Profile'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const FourthView = (props) => {
  if(props.token === null){
  return (
    <Auth apiURI = {props.apiURI}
    userLogin = {props.userLogin}
    successScreen={props.successScreen}
    products = {props.products}
    userLogout={props.userLogout}></Auth>
  )
  }
  else{
    return <Profile user={props.user} userLogout={props.userLogout} token={props.token}></Profile>
  }
}

export default FourthView
