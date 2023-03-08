import { Component } from "react";
import { View, Text, Image, StyleSheet,ScrollView, SafeAreaView} from "react-native";
import CostumButton1 from "../components/buttonComponents/CostumButton1";
import { Switch } from "react-native-switch";
import CostumButton2 from "../components/buttonComponents/CostumButton2";
import CostumButton3 from "../components/buttonComponents/CostumButton3";

class WidgetPage extends Component {
  render() {
    this.state = {
      tes:"tes",
    };
    return(
       <View style={style.container}>
        <SafeAreaView>
        <Text style={style.widgetTitle}>Widget Option</Text>

        </SafeAreaView>
        <ScrollView style={style.scrollView}>
         <View style={style.buttonWrapper1}>
          <CostumButton1/>
         </View>
         <View style={style.buttonWrapper1}>
          <CostumButton2/>
         </View>
         <View style={style.buttonWrapper1}>
          <CostumButton3/>
         </View>
         <View style={style.buttonWrapper1}>
          <CostumButton2/>
         </View>
         <View style={style.buttonWrapper1}>
          <CostumButton2/>
         </View>
         <View style={style.buttonWrapper1}>
          <CostumButton2/>
         </View>
        </ScrollView>
       </View>
       
        
        )
  }
}

const style = StyleSheet.create({
 container: {
   flex:1,
 },
 buttonWrapper1:{
   width:'100%',
   marginTop:20,
   borderBottomWidth:.8, 
   borderColor:'#ccc',
   paddingHorizontal:10,
   paddingVertical:30,
 },
 widgetTitle:{
  fontFamily:'Jakarta',
  margin:10,

 }
})

export default WidgetPage;
