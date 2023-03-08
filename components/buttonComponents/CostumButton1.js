import React from "react";
import { View,Text, Component, Touchable, TouchableOpacity ,StyleSheet} from "react-native";


export default class CostumButton1 extends React.Component {
    render(){
        return(
            <TouchableOpacity disabled={this.props.dis == null ? false : this.props.dis } style={[styles.CostumButton1,{height:this.props.h,width:this.props.w}]}>
                <Text style={{fontFamily:'Jakarta',color:'white',fontSize:this.props.fs}}>{this.props.btnTitle == null ? "Costum Button 1" : this.props.btnTitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
 CostumButton1:{
    backgroundColor:'#00C9FF',
    borderRadius:10,
    marginVertical:5,
    padding:10,
    alignSelf:'flex-start',
    alignItems:'center',
 }
})
