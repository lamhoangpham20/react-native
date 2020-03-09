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
    
    let source = 'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/'+images;
    console.log(source);
    if (photo === null) {
      return <Image style={{ width: 100, height: 100 }} source={{uri:'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/'+images}}></Image>
    }
    else {
      console.log(photo.uri);
      return <Image style={{ width: 100, height: 100 }} source={photo}></Image>
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
  function deleteItem(idproduct)
  {
    fetch(apiURI + '/products/'+idproduct, {
      method: "DELETE",
      headers: {
        //"Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + token
      }
    }).then(response => response.text())
      .then(response => {
        console.log("upload succes", response);
        updateData();
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
        if (response.Created == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Management' }],
        });
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
      updateData();
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.screen}>

        <Text style={styles.header}>Edit</Text>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="johndoe"
          onChangeText={value => setTitle(value)}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          placeholder="test@email.com"
          onChangeText={value => setDescription(value)}
        />
        <Text>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          placeholder="password"
          onChangeText={value => setCategory(value)}
        />
        <Text>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          placeholder="phoneNumber"
          onChangeText={value => setLocation(value)}
        />
        <TouchableOpacity onPress={() => openImagePickerAsync()} style={{ borderWidth: 1, borderColor: 'black' }}>
          <Text>Pick a photo</Text>
        </TouchableOpacity>
        {picture()}
        <TextInput
          style={styles.input}
          value={images}
          placeholder="phoneNumber"
          onChangeText={value => setImages(value)}
        />
        <Text>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          placeholder="phoneNumber"
          onChangeText={value => setPrice(value)}
        />
        <Text>Shipping</Text>
        <TextInput
          style={styles.input}
          value={Shippingtype}
          placeholder="phoneNumber"
          onChangeText={value => setShippingtype(value)}
        />
        <Button
          title="Cancel"
          color="#000000"
          onPress={
            () => props.navigation.reset({
              index: 0,
              routes: [{ name: 'Management' }],
            })
          } />
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
      </View>
    </ScrollView>
  )

}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(51, 153, 255)',
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
export default ModifyScreen;