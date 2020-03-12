import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native'
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

  function picture() {

    if (photo === null) {
      return <></>
    }
    else {
      console.log(photo.uri);
      return <View><Image style={{ width: 200, height: 200, marginBottom: 20, alignSelf: 'center' }} source={photo}></Image></View>
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

    if (pickerResult.cancelled == true) {
      alert('Image picker cancelled or failed');
      return;
    }
    var source;
    source = { uri: pickerResult.uri.replace('file://', ''), isStatic: true };
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
  function postPressed() {
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
        idusers: props.user.id,
        title: title,
        description: description,
        category: category,
        location: location,
        images: images,
        price: price,
        Shippingtype: Shippingtype
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + props.token
      }
    })
      .then(response => {
        if (response.status != 201) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.text();
      })
      .then(json => {
        console.log(json);
        props.updateData();
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
   


  }

  if (props.user === null) {
    return (<LoadingScreen></LoadingScreen>)
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.header}>Add new Item</Text>
        </View>
        <ScrollView style={{ flex: 5 }}>
          <View style={styles.screen}>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={value => setTitle(value)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={value => setDescription(value)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Category</Text>
              <TextInput
                style={styles.input}
                value={category}
                onChangeText={value => setCategory(value)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={value => setLocation(value)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Images</Text>
              <TouchableOpacity onPress={() => openImagePickerAsync()} style={{ borderWidth: 1, borderColor: 'black' }}>
                <Text>Pick a photo</Text>
              </TouchableOpacity>
            </View>
            {picture()}
            <View style={styles.inputBox}>
              <Text style={styles.text}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={value => setPrice(value)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Shipping</Text>
              <TextInput
                style={styles.input}
                value={Shippingtype}
                onChangeText={value => setShippingtype(value)}
              />
            </View>
            <TouchableHighlight onPress={() => postPressed()}>
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Add post</Text>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    height: 70,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 35
  },
  topBar: {
    backgroundColor: 'rgb(249, 79, 85)'
  },
  screen: {
    backgroundColor: 'rgb(255, 255, 255)',
    flex: 6,
    paddingTop: 20
  },
  header: {
    fontSize: 40,
    marginTop: 20,
    color: 'white',
    alignSelf: 'center'
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black'
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 18,
    marginTop: 0,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#9399ad'
  },
  primaryButton: {
    backgroundColor: 'rgb(249, 79, 85)',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20

  }
});
export default AddPost
