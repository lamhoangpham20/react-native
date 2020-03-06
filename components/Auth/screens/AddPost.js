import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native'
import LoadingScreen from '../../LoadingScreen'

const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [Shippingtype, setShippingtype] = useState("");

  function postPressed()
  {
    fetch(props.apiURI + '/products', {
        method: 'POST',
        body: JSON.stringify({
          idusers : props.user.id,
          title: title,
          description: description,
          category:category,
          location:location,
          images:images,
          price:price,
          Shippingtype:Shippingtype
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "Bearer " + props.token
        }
      })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'SignupCompleted' }],
        })
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

  }

  if (props.user === null)
  {
    return(<LoadingScreen></LoadingScreen>)
  }
  else{
  return (
    <View style={ styles.screen }>
      <Text style={ styles.header }>Add new Item</Text>
      <Text>Title</Text>
      <TextInput
        style={ styles.input }
        value={ title }
        placeholder="johndoe"
        onChangeText={ value => setTitle(value)}
      />
      <Text>Description</Text>
      <TextInput
        style={ styles.input }
        value={ description }
        placeholder="test@email.com"
        onChangeText={ value => setDescription(value)}
      />
      <Text>Category</Text>
      <TextInput
        style={ styles.input }
        value={ category }
        placeholder="password"
        onChangeText={ value => setCategory(value)}
      />
      <Text>Location</Text>
      <TextInput
        style={ styles.input }
        value={ location }
        placeholder="phoneNumber"
        onChangeText={ value => setLocation(value)}
      />
      <Text>Images</Text>
      <TextInput
        style={ styles.input }
        value={ images }
        placeholder="phoneNumber"
        onChangeText={ value => setImages(value)}
      />
      <Text>Price</Text>
      <TextInput
        style={ styles.input }
        value={ price }
        placeholder="phoneNumber"
        onChangeText={ value => setPrice(value)}
      />
      <Text>Shipping</Text>
      <TextInput
        style={ styles.input }
        value={ Shippingtype }
        placeholder="phoneNumber"
        onChangeText={ value => setShippingtype(value)}
      />
      <TouchableHighlight onPress={ () => postPressed() }>
        <View style={ styles.primaryButton }>
          <Text style={ styles.primaryButtonText }>Add post</Text>
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
  }

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: 'rgb(227, 178, 0)',
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
      fontSize: 20,
      color: 'white'
    },
    input: {
      borderWidth: 1,
      borderRadius: 20,
      height: 40,
      width: '90%',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: 18,
      marginTop: 5,
      marginBottom: 20
    },
    primaryButton: {
      backgroundColor: 'rgb(0, 153, 51)',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 2,
      marginTop: 20,
      marginBottom: 10
    },
    primaryButtonText: {
      color: 'white',
      fontSize: 20
  
    }
  });
export default AddPost
