import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainView from './components/Layout/MainView'
import SecondaryView from './components/Layout/SecondaryView'
import ThirdView from './components/Layout/ThirdView'
import FourthView from './components/Layout/FourthView'
import FifthView from './components/Layout/FifthView'
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default class TabNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Main"
            component={MainView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Secondary"
            component={SecondaryView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-paper" color={color} size={size} />)
            }}
          />

          <Tab.Screen
            name="Third"
            component={ThirdView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-list" color={color} size={size} />)
            }}
          />

          <Tab.Screen
            name="Fourth"
            component={FourthView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-person" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Fifth"
            component={FifthView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-menu" color={color} size={size} />)
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
