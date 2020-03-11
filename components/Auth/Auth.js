import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import LoginScreen from './screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import User from './screens/User'
import SignUpScreen from './screens/SignUpScreen'
// import SignUpCompleted from './components/SignUpCompleted'
import * as SecureStore from 'expo-secure-store'
import LoadingScreen from '../LoadingScreen'
import AddPost from './screens/AddPost'
import Profile from './screens/Profile'
import ModifyPost from './screens/ModifyPost'
import * as Google from 'expo-google-app-auth';
//import TodoApp from './components/TodoApp'


const Stack = createStackNavigator();

export default class AuthDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCheckingTokenStorage: true,
      activeJWT: null,
      user: null
    };
  }
  componentDidMount() {
    // Check for stored JWT when the application loads
    SecureStore.getItemAsync('demoApplicationJWT20')
      .then(response => {
        console.log("SecureStore.getItemAsync success")
        this.setState({ activeJWT: response, isCheckingTokenStorage: false })
      }).then(json => {
        console.log(json);
        fetch(this.props.apiURI + '/jwt/jwtProtectedResource', {
          method: 'GET',
          headers: {
            "Authorization": "Bearer " + this.state.activeJWT
          }
        }).then(response => {
          if (response.status == 401) {
            this.setState({ activeJWT: null, isCheckingTokenStorage: false });
            this.props.userLogin(null, null);
            throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
          }
          return response.json();
        }).then(json => {
          console.log(json.user);
          this.setState({ user: json.user });
          this.props.userLogin(json.user, this.state.activeJWT);
        }).catch(error => {
          console.log("Error message:")
          console.log(error.message)
        })
      })

  }


  onLoginReceiveJWT = (responseJWT) => {
    // Deal with successful login by storing the token into secure store
    SecureStore.setItemAsync('demoApplicationJWT20', responseJWT)
      .then(response => {
        console.log(response);
        this.setState({ activeJWT: responseJWT, isCheckingTokenStorage: false })
      }).then(json => {
        console.log(json);
        fetch(this.props.apiURI + '/jwt/jwtProtectedResource', {
          method: 'GET',
          headers: {
            "Authorization": "Bearer " + this.state.activeJWT
          }
        }).then(response => {
          if (response.status == 401) {
            throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
          }
          return response.json();
        }).then(json => {
          this.setState({ user: json.user });
          this.props.userLogin(json.user, this.state.activeJWT);
        }).catch(error => {
          console.log("Error message:")
          console.log(error.message)
        })
      })
  }
  // onLogout = ()=>{
  //   console.log("Logout");
  //   this.setState({activeJWT:null});
  //   SecureStore.deleteItemAsync('demoApplicationJWT20');
  // }
  authLogic = () => {
    let userLogout = this.props.userLogout;
    const authScreens = (
      <>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {props => <LoginScreen {...props} onLoginReceiveJWT={this.onLoginReceiveJWT} apiURI={this.props.apiURI} googleLogin={this.signInWithGoogleAsync}></LoginScreen>}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          options={{
            headerShown: false,
          }}
        >
          {props => <SignUpScreen {...props} apiURI={this.props.apiURI}></SignUpScreen>}
        </Stack.Screen>
        {/* <Stack.Screen
          name="SignupCompleted"
          options={{
            headerShown: false,
          }}
        >
          { props => <SignUpCompleted {...props}></SignUpCompleted>}
        </Stack.Screen> */}
      </>
    );

    const app = (
      <>
        <Stack.Screen
          name="Management"
          options={{
            headerShown: false,
          }}
        >
          {props => <ModifyPost {...props} updateData = {this.props.updateData} user={this.state.user} token={this.state.activeJWT} products={this.props.products}></ModifyPost>}
        </Stack.Screen>
        <Stack.Screen
          name="Update"
          options={{
            headerShown: false,
          }}
        >
          {props => <ModifyScreen {...props} updateData = {this.props.updateData} user={this.state.user} token={this.state.activeJWT} products={this.props.products}></ModifyScreen>}
        </Stack.Screen>
      </>
    )
    const second = (
      <Stack.Screen
        name="addPost"
        options={{
          headerShown: false,
        }}
      >
        {props => <AddPost {...props} apiURI={this.props.apiURI} user={this.state.user} token={this.state.activeJWT}></AddPost>}
      </Stack.Screen>
    )
    const profile = (
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
      >
        {props => <Profile {...props} onLogout={this.onLogout} apiURI={this.props.apiURI} userLogout={userLogout} user={this.state.user} token={this.state.activeJWT}></Profile>}
      </Stack.Screen>
    )




    const checkingForTokenStorage = (
      <Stack.Screen name="Loading" component={LoadingScreen} />
    )

    if (this.state.isCheckingTokenStorage) {
      console.log('Checking is token stored');
      return checkingForTokenStorage;
    }
    else {
      if (this.state.activeJWT != null) {
        if (this.props.successScreen === "productManagement") {
          console.log('JWT Token found, displaying application logged in views, page 3');
          return app;
        }
        else if(this.props.successScreen === "postProduct") {
          console.log('JWT Token found, displaying application logged in views, page 2');
          return second;
        }
        else{
          console.log('JWT Token found, displaying application logged in views, page 2');
          return profile;
        }
      }
      else {
        console.log('JWT Token not found, displaying application authentication views');
        return authScreens;
      }
    }
    console.error('Incorrect authLogic function processing');
  }



  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '497323396044-8flbehpstclt2qt738foc31eoo7tsfln.apps.googleusercontent.com',
        scopes: ['profile'],
      });

      if (result.type === 'success') {
        console.log(result);
        let opt = { access_token: result.accessToken };
        console.log(opt);
        fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/auth/google', {
          method: 'POST',
          body: JSON.stringify(opt)
        }).then(response => {
          //console.log(response);
          if (response.ok == false) {
            console.log('hello')
            throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
          }
          //console.log(response);
          return response.json();
        }).then(json => { console.log(json) })
          .catch(error => {
            console.log("Error message:")
            console.log(error.message)
          });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  onLogout = () => {
    console.log("Logout");
    this.setState({ activeJWT: null });
    SecureStore.deleteItemAsync('demoApplicationJWT18');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

        <Stack.Navigator>
          {this.authLogic()}
        </Stack.Navigator>

      </View>
    )
  }
}