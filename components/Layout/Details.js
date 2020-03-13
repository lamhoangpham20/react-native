import React, { Component } from 'react';
import { AppRegistry,View,Text,
StyleSheet,FlatList,Image,StatusBar,
TouchableOpacity,Button, RefreshControl , Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import * as theme from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';
export default class Details extends Component{
	render(){
		const {item} = this.props.route.params.product;
		console.log(this.props.route.params.product.item)
		return(
			<ScrollView style={styles.container}>
		   <View style={styles.view}>
			 <View >
			   <Image style={styles.recommendationImage} source={{uri:'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/'+ item.Images}}></Image>
		     </View>
			 <View style={styles.forPriceandTitle}>
		       <Text style={styles.viewText}>{item.Title}</Text>
			 </View>
			 <View style={styles.forWordDescription}><Text style={styles.textWordDes}>Description</Text></View>
			 <View style={styles.forProductInfo}> 
			   <Text style={styles.textForDes}> - {item.Description}</Text>
			   <Text style={styles.textForDes}> - {item.Category}</Text>
			   <Text style={styles.textForDes}> - {item.Location}</Text>
			 </View>
			 <View style={styles.forWordDescription2}><Text style={styles.textWordDes}>Shipping Type</Text></View>
			 <View style={styles.forProductInfo}><Text style={styles.textForDes}> - {item.ShippingType}</Text></View>
			 <View style={styles.forWordDescription2}><Text style={styles.textWordDes}>Date of posting</Text></View>
			 <View style={styles.forProductInfo}>
				 <Text style={styles.textForDes}>{item.Date}</Text>
			 </View> 
			 <View style={styles.forWordDescription2}><Text style={styles.textWordDes}>Price: </Text></View>
			 <View>
			     <Text style={styles.viewText2}>{item.Price}</Text>
			 </View>
		   </View>
		   </ScrollView>
		   
		);
	}
}
const styles = StyleSheet.create({
    recommendationImage: {
        width: (width - (theme.sizes.padding * 0.1)) / 1,
        height: (width - (theme.sizes.padding * 0.1)) / 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center'
	},
	container: {
		backgroundColor:'#EBF5FB',
		padding:5
	},
	view:{
		paddingTop:30,
		flex:1,
		backgroundColor:'#EBF5FB',
		alignSelf:'center'
	},
	forProductInfo:{
		alignItems:'center',
		justifyContent:'center',
		margin:10,
		flex:0.4,
		width: (width - (theme.sizes.padding * 0.1)) / 1,
		marginVertical:10,
	},
	forPriceandTitle:{
		alignItems:'flex-start',
		justifyContent:'center',
		flex:0.4,
		width: (width - (theme.sizes.padding * 0.2)) / 1,
		height:60,
		marginLeft:11,
		backgroundColor:"#EBF5FB",
		shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 3
	},
	viewText:{
		fontSize:35,
		marginLeft:10,
		alignSelf:'flex-start'
	},
	viewText2:{
		fontSize:50,
		alignSelf:'flex-end',
		marginRight:20
	},
	forWordDescription:{
		alignItems:'flex-start',
		marginLeft:15,
	},
	textWordDes:{
		fontSize:20
	},
	viewWord:{
		fontSize:20,
		alignContent:'flex-start'
	},
	forWordDescription2:{
		alignItems:'flex-start',
		marginLeft:15
	},
	textForDes:{
		fontSize: 16,
		alignSelf:'flex-start',
		marginLeft:15
	}
});