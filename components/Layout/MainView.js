import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import LoadingScreen from '../LoadingScreen'

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
    fetch('http://ec2-35-173-124-147.compute-1.amazonaws.com/users', {
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

        this.setState({ products : json.users, loadingScreen : false });
        console.log(this.state.products);
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
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
      <View style={{ flex: 1, justifyContent: 'center',  borderColor:'#000000', borderWidth:'1px'}}>
      <View style={{ flex: 0.1, justifyContent: 'center',borderColor:'#000000', borderWidth:'1px'}}>
      <Text  style={{ fontSize: 10, fontWeight: '100' }}>Search</Text></View>
      <ScrollView style={{ flex: 2, borderColor:'#000000', borderWidth:'1px'}}>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row',  borderColor:'#000000', borderWidth:'1px'}}> 
      {this.state.products.map(i=> 
      <View key={i.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  borderColor:'#000000', borderWidth:'1px' }}>
      <Text  style={{ fontSize: 10, fontWeight: '700' }}>{i.name}</Text>
      <Text  style={{ fontSize: 10, fontWeight: '700' }}>{i.username}</Text>
      </View>
    )}
    </View>
    </ScrollView>
      </View>
    )
  }
  }
}
