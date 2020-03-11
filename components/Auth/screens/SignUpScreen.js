import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native'


const SignUpScreen = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function signupPressed()
  {
    fetch(props.apiURI + '/users', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          phoneNumber:phoneNumber
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => {
        if (response.status != 201) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.text();
      })
      .then(json => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

  }

  return (
    <View style={ styles.screen }>
      <Text style={ styles.header }>Sign Up</Text>
      <Text style={ styles.text}>Please enter your username</Text>
      <TextInput
        style={ styles.input }
        value={ username }
        placeholder="johndoe"
        onChangeText={ value => setUsername(value)}
      />
      <Text style={ styles.text}>Please enter your email</Text>
      <TextInput
        style={ styles.input }
        value={ email }
        placeholder="test@email.com"
        onChangeText={ value => setEmail(value)}
      />
      <Text style={ styles.text}>Please enter your password</Text>
      <TextInput
        style={ styles.input }
        secureTextEntry={true}
        value={ password }
        type="password"
        placeholder="password"
        onChangeText={ value => setPassword(value)}
      />
      <Text style={ styles.text}>Please enter your phone number</Text>
      <TextInput
        style={ styles.input }
        value={ phoneNumber }
        placeholder="phone number"
        onChangeText={ value => setPhoneNumber(value)}
      />
      <TouchableHighlight onPress={ () => signupPressed() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Sign up</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Cancel"
        color="#000000"
        onPress={
          () => props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        } />
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
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: 'white'
  },
  text: {
    fontSize: 13,
    color: 'white'
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    borderRadius:5,
    marginTop: 5,
    marginBottom: 20
  },
  primaryButton: {
    backgroundColor: 'rgb(79, 105, 162)',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    marginTop: 20,
    marginBottom: 10
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});


export default SignUpScreen
