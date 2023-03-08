import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
    Feather,
    AntDesign,
    Entypo,
    MaterialCommunityIcons
  } from '@expo/vector-icons';


export default class Loading extends React.Component {
    checkIcon = (params) => {
      switch(params){
        case 'Connected':
          return 'lan-check';
        break;
        case 'failed' :
          return 'alert';
        break;
        case 'IsFetching' :
          return 'lan-pending';
        break;
      }
    }

    render() {
        return (
          <View style={[styles.container,{display:this.props.visible == false ? "none" : "flex",backgroundColor:this.props.bg == '' ? 'white' : this.props.bg}]}>
            <View style={styles.innerLoad}>
            <ActivityIndicator size="small" color="white" style={{display:this.props.loading == true ? 'flex' : 'none'}}/>
            <Text style={styles.textLoad}>{this.props.titleLoad}</Text>
            </View>
            <MaterialCommunityIcons name={this.checkIcon(this.props.icon)} color="white" size={25}></MaterialCommunityIcons>
          </View>
        )
    }
}

const styles = StyleSheet.create({
container:{
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'#19161C',
  paddingVertical:5,
  paddingHorizontal:15,
  justifyContent:'space-between',
  borderRadius:5,
},
innerLoad: {
  flexDirection:'row',
  padding:5,
  alignItems:'center',
},
textLoad:{
    fontFamily:'InterSemi',
    marginLeft:10,
    color:'white',
}
})
