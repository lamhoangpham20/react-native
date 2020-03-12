import React, { useState } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, Button, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native'
import LoadingScreen from '../../LoadingScreen'
import * as ImagePicker from 'expo-image-picker'
const ModifyScreen = (props) => {
  const { idproduct } = props.route.params;
  const { user } = props.route.params;
  const { token } = props.route.params;
  const { apiURI } = props.route.params;
  const { products } = props.route.params;
  const { updateData } = props.route.params;
  console.log(apiURI);
  console.log('user', user.id);
  console.log('idproduct', token);
  const [photo, setPhoto] = useState(null);
  const [imagePost, setImagePost] = useState("");
  const [title, setTitle] = useState(products.Title);
  const [description, setDescription] = useState(products.Description);
  const [category, setCategory] = useState(products.Category);
  const [location, setLocation] = useState(products.Location);
  const [images, setImages] = useState(products.Images);
  const [price, setPrice] = useState(products.Price);
  const [Shippingtype, setShippingtype] = useState(products.ShippingType);
  function picture() {

    let source = 'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/' + images;
    console.log(source);
    if (photo === null) {
      return <View><Image style={{ width: 200, height: 200, marginBottom: 20, alignSelf: 'center' }} source={{ uri: 'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/' + images }}></Image></View>
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
  function deleteItem(idproduct) {
    fetch(apiURI + '/products/' + idproduct, {
      method: "DELETE",
      headers: {
        //"Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token
      }
    }).then(response => response.text())
      .then(response => {
        console.log("upload succes", response);
        updateData();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Management' }],
        });
      })
      .catch(error => {
        console.log("upload error", error);
      });
  }
  function editItem(idproduct) {
    console.log(idproduct);
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
    fetch(apiURI + '/products/' + idproduct, {
      method: 'PUT',
      body: JSON.stringify({
        idusers: user.id,
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
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        if (response.status != 201) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return  response.text();
      })
      .then(json => {
      console.log(json);
      updateData();
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Management' }],
    });
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });

    
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.header}>Modify Item</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.screen}>
          <View style={styles.inputBox}>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              placeholder="johndoe"
              onChangeText={value => setTitle(value)}
            /></View>
          <View style={styles.inputBox}>
            <Text>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              placeholder="test@email.com"
              onChangeText={value => setDescription(value)}
            /></View>
          <View style={styles.inputBox}>
            <Text>Category</Text>
            <TextInput
              style={styles.input}
              value={category}
              placeholder="password"
              onChangeText={value => setCategory(value)}
            /></View>
          <View style={styles.inputBox}>
            <Text>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              placeholder="phoneNumber"
              onChangeText={value => setLocation(value)}
            /></View>
          <View style={styles.inputBox}>
            <TouchableOpacity onPress={() => openImagePickerAsync()} style={{ borderWidth: 1, borderColor: 'black' }}>
              <Text>Pick a photo</Text>
            </TouchableOpacity></View>
          {picture()}
          <View style={styles.inputBox}>
            <Text>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              placeholder="phoneNumber"
              onChangeText={value => setPrice(value)}
            /></View>
          <View style={styles.inputBox}>
            <Text>Shipping</Text>
            <TextInput
              style={styles.input}
              value={Shippingtype}
              placeholder="phoneNumber"
              onChangeText={value => setShippingtype(value)}
            /></View>

          <TouchableHighlight onPress={() => editItem(idproduct)}>
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Edit Item</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => deleteItem(idproduct)}>
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Delete</Text>
            </View>
          </TouchableHighlight>
          <Button
            title="Cancel"
            color="#000000"
            onPress={
              () => props.navigation.reset({
                index: 0,
                routes: [{ name: 'Management' }],
              })
            } />
        </View>
      </ScrollView>
    </View>
  )

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
export default ModifyScreen;