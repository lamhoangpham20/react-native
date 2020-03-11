import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native'
import { Base64 } from 'js-base64'

const LoginScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function loginClick() {
    fetch(props.apiURI + '/jwt/loginForJWT', {
      method: 'GET',
      headers: {
        "Authorization": "Basic " + Base64.encode(userName + ":" + password)
      }
    })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Login successful")
        console.log("Received following JSON");
        console.log(json);

        props.onLoginReceiveJWT(json.token);
        return json.token;
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }

  return (
    <View style={styles.screen}>

      <TextInput
        style={styles.input}
        value={userName}
        placeholder="username"
        onChangeText={value => setUserName(value)}
      />
      <TextInput
        style={styles.input2}
        value={password}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={value => setPassword(value)}
      />
      <TouchableHighlight onPress={() => loginClick()}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => props.googleLogin()}>
        <View style={styles.google}>
          <Text style={styles.primaryButtonText}>Login with Google</Text>
        </View>
      </TouchableHighlight>
      
      <Button title="Sign up" color="#FFFFFF" onPress={() => props.navigation.navigate('Signup')} />

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(59, 89, 153)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  google: {
    backgroundColor: 'rgb(207,67,50)',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 18,
  },
  input2: {
    borderWidth: 1,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 0
  },
  primaryButton: {
    backgroundColor: 'rgb(79, 105, 162)',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    marginTop: 50,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  },
  text: {
    fontSize: 20,
    color: 'white'
  },
});

export default LoginScreen
