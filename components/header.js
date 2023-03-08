import React from "react";
import { View, Platform,Image,StyleSheet ,Text} from "react-native";
import { Surface } from "react-native-paper";
import Icon from '../assets/icons/mikroAPP.png';

const CustomHeader = () => {
  return (
    <View style={{marginTop:30, width:'100%',backgroundColor:'white',height:50,alignItems:'center',justifyContent:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={Icon} style={{width:30,height:30}}></Image>
    <Text style={{marginLeft:5,fontWeight:"bold",fontSize:15,color:'#55cfdb',fontFamily:'Jakarta'}}>Mikro</Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
   
})

export default CustomHeader;
