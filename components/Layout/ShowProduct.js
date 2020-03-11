import React  from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions, Button, CheckBox } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from 'react-native-vector-icons';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

function ShowProduct(props) {
    /*handleSearch(event) {
        const search = event.nativeEvent.text;
        const filteredProducts = props.products.filter(i => {
            return (typeof i.Title || i.Location || i.Category === 'string') &&
                i.Title.includes(search) || i.Location.includes(search) || i.Category.includes(search)
        });
        setState({
            search, products: filteredProducts
        })
    };*/
    let products = props.products;
    function checkBox(text)
    {
        console.log(text);
        props.choseType(text);
    }

    function searchByCategory(text) {
        console.log(text);
        fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/products/category/' + text,
        {
            method: 'GET',
        }).then(response => {
            if (response.ok == false) {
              throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
            }
            //console.log(response);
            return response.json();
            
          })
          .then(json => {
            console.log("product in app")
    
            props.searchProduct(json);
            console.log(products);
            //console.log(this.state.products);
          })
          .catch(error => {
            console.log("Error message:")
            console.log(error.message)
          });
    }

    function searchByLocation(text) {
        console.log(text);
        fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/products/location/' + text,
        {
            method: 'GET',
        }).then(response => {
            if (response.ok == false) {
              throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
            }
            //console.log(response);
            return response.json();
            
          })
          .then(json => {
            console.log("product in app")
    
            props.searchProduct(json);
            console.log(products);
            //console.log(this.state.products);
          })
          .catch(error => {
            console.log("Error message:")
            console.log(error.message)
          });
    }
 
    
    function button()
    {
        if(props.searchType === 'category'){
            return (
              <View style={{height: 80, width:50, backgroundColor: '#8A2BE2', justifyContent: 'center' }}>
                <View >
                  <Button  title='Search' onPress={()=>searchByCategory(props.search)}></Button>
                </View>
              </View>
            )
        }
        else{
            return (
              <View style={{height: 80, width:50, backgroundColor: '#8A2BE2', justifyContent: 'center' }}>
                <View>
                  <Button  title='Search' onPress={()=>searchByLocation(props.search)}></Button>
                </View>
              </View>
            )
        }
    }
    
    List = (product) => {
        return (
            <View style={{ flex: 0.5, padding: 10, justifyContent: "center", flexDirection: 'row', flexWrap: 'wrap', marginLeft: 3 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Details', { product })}>
                    <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
                        <Image style={styles.recommendationImage} source={{uri:'http://ec2-35-173-124-147.compute-1.amazonaws.com/image/'+ product.item.Images}}></Image>
                        <View style={{ fontSize: 20, fontWeight: "100", alignSelf: 'center', margin: 5 }}>
                            <Text>{product.item.Title} : {product.item.Price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    
    console.log('hung ngu', props.products);
    // if (state.isLoading) {
    //     return (
    //         <View >
    //             <ActivityIndicator />
    //         </View>
    //     );
    // }
    // else {
        /*console.log('product', props.products)*/
        return (
            <View style={{ flex: 1 }}>
                <View style={{  height: 80, width:340, backgroundColor: '#8A2BE2', justifyContent: 'center', paddingHorizontal: 0}}>
                    <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Ionicons name="ios-search" style={{ fontSize: 24 }} />
                        <TextInput style={{ fontSize: 24, marginLeft: 15,  width:300 }} onChangeText={(text)=>props.handleSearch(text)} /> 
                        {/* <Button title='Click me' onPress={()=>click(props.search)}></Button> */}
                        {button()} 
                    </View>
                </View>
                <Button title='Category' onPress={()=>checkBox('category')}></Button>
                <Button title='Location' onPress={()=>checkBox('location')}></Button>
                <FlatList data={props.searchedProducts}
                    renderItem={List}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2} />

            </View>
            // /*<View style={{ flex: 0.5, padding: 10, justifyContent: "center", flexDirection: 'row', flexWrap: 'wrap', marginLeft: 3 }}>
            //     {/* <TouchableOpacity onPress={() => props.navigation.navigate('Details', { product })}> */}
            //         <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center' }}>
            //             <Image style={styles.recommendationImage} source={img}></Image>
            //             <View style={{ fontSize: 20, fontWeight: "100", alignSelf: 'center', margin: 5 }}>
            //                 <Text>{props.products[0].Title} : {props.products[0].Price}</Text>
            //             </View>

            //         </View>
            //     {/* </TouchableOpacity> */}
            // </View>*/
        );
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

export default ShowProduct;