import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import LoadingScreen from '../../LoadingScreen'

const ModifyPost = (props) => {
  //console.log('1',props.products);
  modify = (id, products)=>{
    console.log(id);
    props.navigation.navigate('Update', { idproduct: id, user: props.user, token : props.token, apiURI:props.apiURI, products:products, updateData:props.updateData });
  }
  if (props.user === null)
  {
    return(<LoadingScreen></LoadingScreen>)
  }
  else{
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <View style={styles.topBar}>
      </View>
      <View style={styles.topBar2}>
        <Text style={{fontSize:20, alignSelf:'center', marginTop:10, color:'white'}}>Choose Item</Text>
      </View>
      <ScrollView>
        
      {props.products.filter(i=>i.name === props.user.name).map(i=><View style={styles.view} onTouchStart={()=>modify(i.idproduct, i)} key={i.idproduct}>
        <Text style={{fontSize:20, fontWeight:'500'}} >{i.Title}</Text>
        <Text>created on {i.Date}</Text>
        </View>)}
        </ScrollView>
    </View>
  
  )
  }
}
  const styles = StyleSheet.create({
    view:{
      marginTop:20,
      width: '90%',
      alignSelf:'center',
      height:50, 
      borderWidth:1
    },
    topBar: {
      width: '100%',
      height: 20,
      backgroundColor: 'rgb(249, 85, 85)'
    },
    topBar2: {
      width: '100%',
      height: 50,
      backgroundColor: 'rgb(249, 70, 85)'
    }
  });

export default ModifyPost
