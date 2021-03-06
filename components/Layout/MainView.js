/*import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import LoadingScreen from '../LoadingScreen'
import Header from './Header';
import { LinearGradient } from 'expo-linear-gradient';
import img from '../../assets/nightwishCover.jpg';
export default class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null,
      loadingScreen: true
    };
  }
  componentDidMount() {
    // Check for stored JWT when the application loads
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

        this.setState({ products : json.products, loadingScreen : false });
        console.log(this.state.products);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
  }
  loop = ()=>
  {
    let output_array = [];
    for (let i = 0; i < this.state.products.length; i++)
    {
      let output;
      if((i % 2) === 0)
      {
        console.log(i);
       output = 
          <View key={i} style={{ flex: 1, padding: 10, justifyContent: 'space-between',  flexDirection: 'row'}}>
           <View key={this.state.products[i].id}  style={{flex: 0.48, backgroundColor:'white' ,borderRadius: 10, justifyContent: 'center', shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1 }}>
        <Image style={ styles.coverImage } source={img}></Image>
      <Text  >{this.state.products[i].name}</Text>
      <Text  style={{ fontSize: 10, fontWeight: '100',  alignSelf: 'flex-start', margin:5 }}>{this.state.products[i].username}</Text>
      </View>
      <View key={this.state.products[i].id} style={{flex: 0.48,backgroundColor:'white', borderRadius: 10, justifyContent: 'center',  shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1 }}>
        <Image style={ styles.coverImage } source={img}></Image>
      <Text  style={{ fontSize: 10, fontWeight: '100', alignSelf: 'flex-start', margin:5}}>{this.state.products[i].name}</Text>
    <Text  style={{ fontSize: 10, fontWeight: '100', alignSelf: 'flex-start',margin:5}}>{this.state.products[i].username}</Text>
      </View>
          </View>
          output_array.push(output) ;
      }
    }
    return output_array;
  }
  render() {
    if(this.state.loadingScreen)
    {
      return(
        <LoadingScreen></LoadingScreen>
      )
    }
    else{
    return (
      <View style={{ flex: 1, justifyContent: 'center'} }>
        <Header height={ 80 }></Header>
      <ScrollView style={{ flex: 2}}>
       
    {this.loop()}
     
    </ScrollView>
      </View>
    )
  }
  }
  
}
const styles = StyleSheet.create({
  coverImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 189,
    height: 189,
    borderTopLeftRadius: 10 ,
    borderTopRightRadius: 10
  }
});*/

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ShowProduct from './ShowProduct'
import Details from './Details';

const Stack = createStackNavigator();

export default class MainView extends Component {
  render() {
    let products = this.props.products;
    let handleSearch = this.props.handleSearch;
    let search = this.props.search;
    let searchedProducts= this.props.searchedProducts;
    let searchProduct = this.props.searchProduct;
    let choseType = this.props.choseType;
    let searchType = this.props.searchType;
    let updateData = this.props.updateData;
    return ( 
        <Stack.Navigator>
          <Stack.Screen name="ShowProduct"  options={{
            headerShown: false,
          }}>
            {props=> <ShowProduct {...props} searchProduct={searchProduct} products={products} 
            handleSearch={handleSearch} search={search} choseType={choseType} searchType={searchType}
             searchedProducts={searchedProducts} updateData={updateData} />}
            </Stack.Screen>
        
          <Stack.Screen name="Details"  options={{
            headerShown: false,
          }} component={Details}/>
        </Stack.Navigator>  
    // <View>
    //   <ShowProduct products={this.props.products}></ShowProduct>
    // </View>
        )

  }
}
