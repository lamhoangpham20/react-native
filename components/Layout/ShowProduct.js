import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from 'react-native-vector-icons';
import * as theme from '../../theme';
import img from '../../assets/nightwishCover.jpg';
const { width, height } = Dimensions.get('screen');
import { createStackNavigator } from '@react-navigation/stack';
import Details from './Details';

export default class ShowProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            products:this.props.products
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
        const filteredProducts = this.props.products.filter(i => {
            return (typeof i.Title || i.Location || i.Category === 'string') &&
                i.Title.includes(search) || i.Location.includes(search) || i.Category.includes(search)
        });
        this.setState({
            search, products: filteredProducts
        })
    };

    List = (product) => {
        return (
            <View style={{ flex: 0.5, padding: 10, justifyContent: "center", flexDirection: 'row', flexWrap: 'wrap', marginLeft: 3 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { product })}>
                    <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
                        <Image style={styles.recommendationImage} source={img}></Image>
                        <View style={{ fontSize: 20, fontWeight: "100", alignSelf: 'center', margin: 5 }}>
                            <Text>{product.item.Title} : {product.item.Price}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    render() {
        console.log('hung ngu', this.props.products)
        if (this.state.isLoading) {
            return (
                <View >
                    <ActivityIndicator />
                </View>
            );
        }
        else {
            /*console.log('product', this.props.products)*/
            return (
                <View style={{ flex: 1}}>
                  <View style={{ height: 80 , backgroundColor: '#8A2BE2' , justifyContent: 'center', paddingHorizontal:5 }}>
                    <View style={{height:50 , backgroundColor:'white' , flexDirection:'row' , padding: 5, alignItems:'center'}}>
                      <Ionicons name="ios-search" style={{fontSize:24 }}/>
                      <TextInput style={{fontSize:24, marginLeft: 15}} onChange={this.handleSearch.bind(this)}  placeholder="Type Here..." value={this.state.search}/>
                    </View>
                  </View>
                  <FlatList data={this.state.products}
                              renderItem={this.List}
                              style={{marginTop: 10}}
                              keyExtractor={(item,index) => index.toString()}
                              numColumns={2}/>
                   
                </View>
                // /*<View style={{ flex: 0.5, padding: 10, justifyContent: "center", flexDirection: 'row', flexWrap: 'wrap', marginLeft: 3 }}>
                //     {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { product })}> */}
                //         <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
                //             <Image style={styles.recommendationImage} source={img}></Image>
                //             <View style={{ fontSize: 20, fontWeight: "100", alignSelf: 'center', margin: 5 }}>
                //                 <Text>{this.props.products[0].Title} : {this.props.products[0].Price}</Text>
                //             </View>

                //         </View>
                //     {/* </TouchableOpacity> */}
                // </View>*/
            );
        }
    }
}

const styles = StyleSheet.create({
    recommendationImage: {
        width: (width - (theme.sizes.padding * 2)) / 2,
        height: (width - (theme.sizes.padding * 2)) / 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    }
});