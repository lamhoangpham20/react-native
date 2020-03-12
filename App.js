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
import * as SecureStore from 'expo-secure-store'
import Details from './components/Layout/Details';
import { createStackNavigator } from '@react-navigation/stack'

const { manifest } = Constants;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      products: null,
      userLoggedin: false,
      search: "",
      searchedProducts: null,
      searchType: 'category'
    };
  }

  componentDidMount() {
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
        console.log("product in app")

        this.setState({ products: json.products, searchedProducts: json.products });
        //console.log(this.state.products);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

    console.log(uri)
    console.log(this.state.products);
  }
  choseType = (text) => {
    this.setState({ searchType: text })
    console.log(this.state.searchType)
  }
  handleSearch = (text) => {
    console.log(text);
    this.setState({ search: text })
  }
  updateData = () => {
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
        console.log("product in app")

        this.setState({ products: json.products, searchedProducts: json.products });
        //console.log(this.state.products);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }
  userLogin = (user, token) => {
    console.log(token);
    console.log(user);
    this.setState({ user: user, token: token });

    console.log(this.state.user);
  }

  searchProduct = (category) => {
    this.setState({ searchedProducts: category })
  };

  userLogout = () => {
    this.setState({ user: null, token: null });
    SecureStore.deleteItemAsync('demoApplicationJWT20');
    console.log('bu cu');
  }
  render() {
    return (
      <NavigationContainer>

        <Tab.Navigator>
          <Tab.Screen
            name="Products"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" color={color} size={size} />)
            }}>
            {props => <MainView {...props} searchProduct={this.searchProduct} products={this.state.products} handleSearch={this.handleSearch}
              search={this.state.search} searchedProducts={this.state.searchedProducts}
              choseType={this.choseType} searchType={this.state.searchType} updateData={this.updateData} />}
          </Tab.Screen>

          <Tab.Screen
            name="Post product"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-paper" color={color} size={size} />)
            }}>
            {props => <SecondaryView
              {...props}
              apiURI='http://ec2-35-173-124-147.compute-1.amazonaws.com'
              userLogin={this.userLogin}
              successScreen="postProduct"
              token={this.state.token}
              user={this.state.user}
              updateData={this.updateData}
            />}

          </Tab.Screen>

          <Tab.Screen
            name="My Post"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-list" color={color} size={size} />)
            }}
          >
            {props => <ThirdView
              {...props}
              apiURI='http://ec2-35-173-124-147.compute-1.amazonaws.com'
              userLogin={this.userLogin}
              successScreen="productManagement"
              token={this.state.token}
              user={this.state.user}
              products={this.state.products}
              updateData={this.updateData}
            />}
          </Tab.Screen>

          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-person" color={color} size={size} />)
            }}
          >
            {props => <FourthView
              {...props}
              apiURI='http://ec2-35-173-124-147.compute-1.amazonaws.com'
              userLogin={this.userLogin}
              successScreen="Profile"
              token={this.state.token}
              user={this.state.user}
              userLogout={this.userLogout}
              products={this.state.products}
            />}
          </Tab.Screen>
          {/* <Tab.Screen
            name="Fifth"
            component={FifthView}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-menu" color={color} size={size} />)
            }}
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
