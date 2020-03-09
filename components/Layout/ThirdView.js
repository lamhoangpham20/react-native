import React from 'react'
import { View, Text } from 'react-native'
import Auth from '../Auth/Auth'
import ModifyPost from '../Auth/screens/ModifyPost'
import ModifyScreen from '../Auth/screens/ModifyScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
const ThirdView = (props) => {
  let products = props.products;
  let user = props.user;
  let token = props.token;
  let apiURI = props.apiURI;
  let updateData = props.updateData;
  //  console.log('product', props.products);
  if(props.token === null)
  {
      console.log('hello');
      return( <Auth apiURI = {props.apiURI}
      userLogin = {props.userLogin}
      successScreen={props.successScreen}
      products = {props.products}
      updateData = {props.updateData}></Auth>)
  }
  else{
    return (
      <View style={{ flex: 1 }}>
       <Stack.Navigator>
          <Stack.Screen
            name="Management"
            options={{
              headerShown: false,
            }}
          >
            {props => <ModifyPost  {...props} updateData = {updateData} apiURI =  {apiURI} user={user} token={token} products={products}></ModifyPost>}
          </Stack.Screen>
          <Stack.Screen
            name="Update"
            options={{
              headerShown: false,
            }}
          >
            {props => <ModifyScreen  {...props} updateData = {updateData} apiURI = {apiURI} user={user} token={token} products={products}></ModifyScreen>}
          </Stack.Screen>
          </Stack.Navigator>
      </View>

    )
  }
}

export default ThirdView
