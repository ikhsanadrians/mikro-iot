import React from "react";
import { View,Text, Component, Touchable, TouchableOpacity ,StyleSheet,ScrollView} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class CostumButton2 extends React.Component {
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} disabled={this.props.dis == null ? false : this.props.dis } style={[styles.CostumButton2,{height:this.props.h,width:this.props.w}]}>
                <MaterialCommunityIcons name="lamp" size={this.props.size == null ? 24 : this.props.size} color="#8956ff" />
                <Text style={{fontFamily:'Jakarta',color:'#8956ff',fontSize:this.props.fs == null ? 20 : this.props.fs}}>{this.props.btnTitle == null ? "Costum Button2" : this.props.btnTitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
 CostumButton2:{
    borderColor:'#8956ff',
    borderWidth:1,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    alignSelf:'flex-start'
 }
})
