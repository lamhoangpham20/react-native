import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity , TextInput, TouchableHighlight } from 'react-native'
import LoadingScreen from '../../LoadingScreen'
import * as ImagePicker from 'expo-image-picker'
import { PinchGestureHandler, ScrollView } from 'react-native-gesture-handler'

const AddPost = (props) => {
  const [photo, setPhoto] = useState(null);
  const [imagePost, setImagePost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [Shippingtype, setShippingtype] = useState("");

  function picture()
  {
    
    if (photo ===null)
    {
      return <></>
    }
    else 
    {
      console.log(photo.uri);
      return <Image style={{ width : 100 , height : 100} } source={photo}></Image>
    }
  }
  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if(pickerResult.cancelled == true)
    {
      alert('Image picker cancelled or failed');
      return;
    }
    var source;
    source = {uri:pickerResult.uri.replace('file://', ''), isStatic: true};
    const fileNameSplit = pickerResult.uri.split('/');
    const fileName = fileNameSplit[fileNameSplit.length - 1];

    let postForm = new FormData();
    postForm.append('testFile', {
      uri: pickerResult.uri,
      name: fileName,
      type: 'image/png'
    });
    postForm.append('foo', 'bar');
    setPhoto(source);
    setImages(fileName);
    setImagePost(postForm);
    console.log(postForm);
  }
  function postPressed()
  {
    console.log(imagePost);
    fetch(props.apiURI + '/fileUpload', {
      method: "POST",
      body: imagePost,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => response.text())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        setPhoto(null);
        setImagePost(null);
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
    
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
        console.log(json);
        
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
      props.updateData();
    

  }

  if (props.user === null)
  {
    return(<LoadingScreen></LoadingScreen>)
  }
  else{
  return (
    <ScrollView>
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
      <TouchableOpacity onPress={()=> openImagePickerAsync()} style={{ borderWidth: 1, borderColor: 'black'}}>
          <Text>Pick a photo</Text>
        </TouchableOpacity>
        {picture()}
      
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
    </ScrollView>
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
