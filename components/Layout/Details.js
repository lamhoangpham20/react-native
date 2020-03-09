import React, { Component } from 'react';
import { AppRegistry,View,Text,
StyleSheet,FlatList,Image,StatusBar,
TouchableOpacity,Button, RefreshControl } from 'react-native';

export default class Details extends Component{
	render(){
		const {item} = this.props.route.params.product;
		console.log(this.props.route.params.product.item)
		 return(
		 <View >
		  <Text>{item.Title}</Text>
		</View>
		);
	}
}