import React from "react";
import { View,Text, Component, Touchable, TouchableOpacity ,StyleSheet,ScrollView} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class CostumButton3 extends React.Component {
    render(){
        return(
            <TouchableOpacity disabled={this.props.dis == null ? false : this.props.dis } style={styles.CostumButton3}>
                  <MaterialCommunityIcons name="lamp" size={24} color="white" style={styles.icon}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
 CostumButton3:{
    backgroundColor:'#90BEDE',
    borderRadius:100,
    padding:10,
    alignSelf:'flex-start'
 },
 icon:{
    justifyContent:'center',
    alignItems:'center',
 }
})
