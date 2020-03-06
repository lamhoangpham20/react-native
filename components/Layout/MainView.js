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

import React from 'react';
import { StyleSheet, Text, View , ActivityIndicator, FlatList , Image , Dimensions} from 'react-native';
import img from '../../assets/nightwishCover.jpg';
import { TextInput } from 'react-native-gesture-handler';
import {Ionicons} from 'react-native-vector-icons';
import * as theme from '../../theme';

const {width , height} = Dimensions.get('screen')
export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount () {
    return fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/products')
        .then ( (res) => res.json())
        .then ( (responseJson) => {
          this.setState (
            {
              isLoading: false,
              dataSource: responseJson.products,
              viewSource: responseJson.products
            },
            function() {
             
            }
          );
        })
    .catch((error) => {
        console.log(error);
    });
  }

  handleSearch(event) {
    const search = event.nativeEvent.text;
    const filteredProducts = this.state.dataSource.filter(i => {
      return (typeof i.Title === 'string') &&
              i.Title.includes(search) 
    });
    this.setState({
      search, viewSource:filteredProducts
    })
  };

  List = (product) => {
    return(
      <View style={{ flex: 1, padding: 10, justifyContent: "space-between",  flexDirection: 'row' , flexWrap:'wrap' ,marginLeft:10  }}>
        <View style={{flex: 0.45,  backgroundColor:'white' ,borderRadius: 10, justifyContent: 'center' }}>
          <Image style={ styles.recommendationImage } source={img}></Image>
          <Text style={{ fontSize: 10, fontWeight: '100', alignSelf: 'flex-start', margin:5}}>
            {product.item.Title}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View >
            <ActivityIndicator/>
        </View>
      );
    }
    return (
         <View style={{ flex: 1}}>
           <View style={{ height: 80 , backgroundColor: '#8A2BE2' , justifyContent: 'center', paddingHorizontal:5 }}>
             <View style={{height:50 , backgroundColor:'white' , flexDirection:'row' , padding: 5, alignItems:'center'}}>
               <Ionicons name="ios-search" style={{fontSize:24 }}/>
               <TextInput style={{fontSize:24, marginLeft: 15}} onChange={this.handleSearch.bind(this)}  placeholder="Type Here..." value={this.state.search}/>
             </View>
           </View>
           <FlatList data={this.state.viewSource}
                       renderItem={this.List}
                       style={{marginTop: 10}}
                       keyExtractor={(item,index) => index.toString()}
                       numColumns={2}/>
         </View>
        );
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
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
    borderTopLeftRadius: 10 ,
    borderTopRightRadius: 10
  }
});
