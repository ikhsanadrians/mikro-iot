import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import CostumButton1 from "../../components/buttonComponents/CostumButton1";
import CostumButton2 from "../../components/buttonComponents/CostumButton2";
import CostumButton3 from "../../components/buttonComponents/CostumButton3";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from "react-native-paper";
import HomePage from '../HomePage';


class FirstStep extends Component {
    constructor(props){
      super(props),
      this.state={
          selectedBtn : null,
          templateName : "",
          topicName : "",
          currentNumber: 0,
          titleBtn: "",
          isInputNull : false,
          isButtonActive: false,
          isSendIt:false,
      }
   }



  // checkIfInputNull = ()  => {
  //   if(this.state.selectedBtn == null|| this.state.topicName == ""){
  //     this.setState({isInputNull:true});
  //   }
  // }

   generateRandomKey = () => {
      let rnd = Math.floor(Math.random() * 100) + 1;
      return rnd;
   }


  componentDidMount(){
    // this.checkIfInputNull()
  }

  selectButtonType = (params) => {
    switch(params){
      case 1 :
        this.setState({selectedBtn:1})
      break;
      case 2 :
        this.setState({selectedBtn:2})
      break;
      case 3 :
        this.setState({selectedBtn:3})
      break;
      case 4: 
        this.setState({selectedBtn:4})
      break;
    }
   }

  sendToAsync = async (key,objVal) => {
    try {
     
     let objectedVal = await JSON.stringify(objVal)
     await AsyncStorage.setItem(key,objectedVal)
     this.setState({isSendIt:!this.state.isSendIt});
     this.props.navigation.navigate('Homepage','first');
    }catch(e){
       console.log(e);
    }
}

setToObj = () => {
  let val = {
    selectedBtn : this.state.selectedBtn,
    topicName : this.state.topicName,
    templateName : this.state.templateName,
    buttonTitle : this.state.titleBtn,
    isButtonActive: this.state.isButtonActive,
  }
  let rndKey = this.generateRandomKey()
  // const stringKey = this.state.currentNumber.toString();
  this.sendToAsync(rndKey.toString(),val);
}

   render() {
    return (
      <View style={styles.containers}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Homepage")}>
          <AntDesign name="arrowleft" size={24} color="black"
           style={{
           position:'absolute',
           left:10,
           top:10,
           }}
          />
        </TouchableOpacity>
      <View style={styles.titleContainers}>
        <Text style={styles.title}> Create New Template </Text>
        <Text style={styles.title}> Make Your Own Button </Text>
      </View>
      <View style={styles.templateWrappers}>
        <TextInput
          onChangeText={(val)=>this.setState({templateName:val})}
          style={styles.templateInputName}
          placeholder="Masukan Nama Template"
        ></TextInput>
           <TextInput style={[styles.templateInputName,{marginTop:10,}]}
           onChangeText={(val)=>this.setState({topicName:val})}
           placeholder="Masukan MQTT Topic">
        </TextInput>

        <TextInput
           onChangeText={(val)=>this.setState({titleBtn:val})}
           style={[styles.templateInputName,{marginTop:10}]} placeholder="Masukan Title Button"></TextInput>
                <TextInput
           onChangeText={(val)=>this.setState({titleBtn:val})}
           style={[styles.templateInputName,{marginTop:10}]} placeholder="Masukan Message"></TextInput>

          <Text style={styles.hintTypeBtn}>Pilih Jenis Button</Text>
          <ScrollView horizontal={true} style={styles.btnOption}>
             <TouchableOpacity onPress={() => this.selectButtonType(1)} style={[styles.grid,{
              borderColor:this.state.selectedBtn == 1 ? "#239ffb" : "#ddd",
              borderWidth:this.state.selectedBtn == 1 ? 2 : 1,
             }]}>
              <CostumButton1 h={40} w={100} fs={10} dis={true}></CostumButton1>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.selectButtonType(2)} style={[styles.grid,{borderColor:this.state.selectedBtn == 2 ? "#239ffb" : "#ddd",
              borderWidth:this.state.selectedBtn == 2 ? 2 : 1,
            }]}>
               <CostumButton2 h={40} w={100} fs={9} size={15} dis={true}></CostumButton2>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.selectButtonType(3)} style={[styles.grid,{borderColor:this.state.selectedBtn == 3 ? "#239ffb" : "#ddd",
              borderWidth:this.state.selectedBtn == 3 ? 2 : 1,
             }]}>
               <CostumButton3 dis={true}></CostumButton3>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.selectButtonType(4)} style={[styles.grid,{borderColor:this.state.selectedBtn == 4 ? "#239ffb" : "#ddd",
              borderWidth:this.state.selectedBtn == 4 ? 2 : 1,
             }]}>
               <Switch disabled={true}/>
             </TouchableOpacity>


          </ScrollView>

          <TouchableOpacity disabled={this.state.isInputNull == false ? false : true} onPress={this.setToObj}>
            <LinearGradient
              colors={["#2380bf", "#239ffb", "#55cfdb"]}
              style={styles.btnlinearGradient}
              >
              <Text style={styles.buttonText}>Next </Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      )
    }
  }

  const styles = StyleSheet.create({
    containers: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop:'3%',
    },
    title: {
      fontFamily: "Jakarta",
    },
    titleContainers: {
      alignItems: "center",
    },
    templateInputName: {
      borderWidth: 0.8,
      width: "100%",
      padding: 10,
      fontFamily: "Jakarta",
      backgroundColor:'white',
      borderRadius: 10,
      borderColor: "#ddd",
      marginBottom: 10,
    },
    templateWrappers: {
      width: "100%",
      marginTop: 40,
      paddingHorizontal: 10,
    },
    btnlinearGradient: {
      padding: 10,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttonText: {
      color: "white",
      fontSize: 15,
      fontWeight: "600",
    },
    hintTypeBtn: {
      fontFamily:'Jakarta',
    },
    btnOption:{
      marginVertical:20,
    },
    grid:{
    borderColor:'#ddd',
      flexDirection:'row',
      marginLeft:10,
      overflow:"hidden",
      flexWrap:'wrap',
      borderWidth:1,
      width:100,
      backgroundColor:'white',
      height:100,
      alignItems:'center',
      justifyContent:"center",
      alignContent:'center',
      borderRadius:5,
    }
  });

  export default FirstStep;


