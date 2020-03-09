import React from 'react'
import { View, Text } from 'react-native'
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {props.products.filter(i=>i.name === props.user.name).map(i=>
        <Text onPress={()=>modify(i.idproduct, i)} key={i.idproduct}>{i.Title}</Text>)}
        
    </View>
  )
      }
  }


export default ModifyPost
