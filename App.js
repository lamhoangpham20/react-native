import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainView from './components/Layout/MainView'
import SecondaryView from './components/Layout/SecondaryView'
import ThirdView from './components/Layout/ThirdView'
import FourthView from './components/Layout/FourthView'
import FifthView from './components/Layout/FifthView'
import Auth from './components/Auth/Auth'
import { Ionicons } from 'react-native-vector-icons';
import Constants from "expo-constants";

const { manifest } = Constants;
const Tab = createBottomTabNavigator();
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      product: null
    };
  }
  
  componentDidMount()
  {
    fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/products', {
      method: 'GET',
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        //console.log(response);
        return response.json();
        
      })
      .then(json => {
        console.log("Todos GET successful")
        console.log("Received following JSON");
        console.log(json);

        this.setState({ products : json.products });
        console.log(this.state.products);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
      
      console.log(uri)
  }
  userLogin = (user)=>
  {
    console.log(user);
    this.setState({user:user});
    console.log(this.state.user);
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Products"
            component={MainView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Post product"
            component={SecondaryView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-paper" color={color} size={size} />)
            }}
          />

          <Tab.Screen
            name="My Post"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-list" color={color} size={size} />)
            }}
          >
            { props => <Auth
                          {...props}
                          apiURI = 'http://10.4.0.6:4000'
                          userLogin = {this.userLogin}
                        />}
            </Tab.Screen>

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
