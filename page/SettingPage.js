import { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal,Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';
import { LinearGradient } from "expo-linear-gradient";
import HomePage from "./HomePage";
import ProfilePic from '../assets/misc/samplepic.jpg';

class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputan: "",
      hasilAsync: "",
      isDialogVisible: false,
      isDialogProfileVisible: false,
      modalMqtt: false,
      modalProfileEdit: false,
      mqttUrl: "",
      mqttPort: "",
      mqttTopicPath: "",
      mqttUsername: "",
      mqttPassword: "",
      changedConfig:true,
      data: [],
    };
  }

  clearAllData() {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => alert('success'));
  }

  getDataFromUsernameInput = async (inputUsername) => {
    let strInpt = inputUsername.toString()
    let inputToUsername = {
      name: strInpt
    }

    try {
      await AsyncStorage.setItem('username', JSON.stringify(inputToUsername))
      await this.setState({modalProfileEdit:false})
    } catch {
      return
    }
    

  }



  getDataFromMqttInput = async () => {
    const strUrl = await this.state.mqttUrl.toString();
    const strPort = await this.state.mqttPort.toString();
    const strTopicPath = await this.state.mqttTopicPath.toString();
    const strUsername = await this.state.mqttUsername.toString();
    const strPassword = await this.state.mqttPassword.toString();

    let inputToUrlMqtt = {
      mqttUrl: strUrl,
      mqttPort: strPort,
      mqttTopicPath: strTopicPath,
      mqttUsername: strUsername,
      mqttPassword: strPassword
    }

    let parsed = JSON.stringify(inputToUrlMqtt);
  
    try {
      await AsyncStorage.setItem('mqttConfig',parsed)
    } catch {
       console.log('error')
    }

    await this.setState({ modalMqtt: false })
    this.props.navigation.navigate('Homepage','true');
  }


  render() {
    
    console.log(`params setting : ${this.props.route.params}`);

    return (
      <View style={styles.container}>
        <Modal visible={this.state.modalMqtt}>
          <View style={styles.modalMqtt}>
            <View style={styles.modalMqttHeader}>
              <TouchableOpacity onPress={() => this.setState({ modalMqtt: false })}>
                <MaterialCommunityIcons name="arrow-left" size={25}></MaterialCommunityIcons>
              </TouchableOpacity>
              <Text style={styles.modalMqttTitle}>Set Up MQTT</Text>
            </View>
            <View style={styles.modalMqttContainer}>
              <Text style={styles.modalConfigTitle}>
                MQTT CONFIGURATION
              </Text>
              <TextInput onChangeText={(paramUrl) => this.setState({ mqttUrl: paramUrl })} placeholder="Your Mqtt Url" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TextInput onChangeText={(paramPort) => this.setState({ mqttPort: paramPort })} placeholder="Your Mqtt Port" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TextInput onChangeText={(paramPath) => this.setState({ mqttTopicPath: paramPath })} placeholder="Your Topic Path" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TextInput onChangeText={(paramUsername) => this.setState({ mqttUsername: paramUsername })} placeholder="Your Mqtt Username" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TextInput secureTextEntry={true} onChangeText={(paramPassword) => this.setState({ mqttPassword: paramPassword })} placeholder="Your Mqtt Password" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TouchableOpacity onPress={this.getDataFromMqttInput}>
                <LinearGradient colors={["#2380bf", "#239ffb", "#55cfdb"]} style={styles.modalMqttUpload}>
                  <Entypo name="network" size={24} color="white" />
                  <Text style={styles.buttonSetUp}>Set Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={this.state.modalProfileEdit}>
        <View style={styles.modalMqtt}>
            <View style={styles.modalMqttHeader}>
              <TouchableOpacity onPress={() => this.setState({ modalProfileEdit: false })}>
                <MaterialCommunityIcons name="arrow-left" size={25}></MaterialCommunityIcons>
              </TouchableOpacity>
              <Text style={styles.modalMqttTitle}>Set Up Your Profile</Text>
        
            </View>
            <View style={styles.modalMqttContainer}>
              <Text style={styles.modalProfileTitle}>
                 USER CONFIGURATION
              </Text>
              <View style={styles.userPictureEdit}>
                 <View style={styles.userPictureInner}>
                    <Image source={ProfilePic} style={styles.profilepic}></Image>
                 </View>
                 <TouchableOpacity style={styles.edit}>
                 <Entypo name="pencil" size={17} color={'white'}></Entypo>
                 </TouchableOpacity>
              </View>
              <View style={styles.userInputName}>
              <TextInput onChangeText={(paramUsername) => this.setState({ mqttUsername: paramUsername })} placeholder="Your Mqtt Username" style={styles.modalMqttInputUrl}>
              </TextInput>
              <TouchableOpacity onPress={()=>this.getDataFromUsernameInput(this.state.mqttUsername)}>
                <LinearGradient colors={["#2380bf", "#239ffb", "#55cfdb"]} style={styles.modalMqttUpload}>
                  <Entypo name="save" size={24} color="white" />
                  <Text style={styles.buttonSetUp}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
              </View>
           
            </View>
        </View>

        </Modal>
        <View style={styles.title}>
          <Feather name="settings" size={20} color="#787E87" />
          <Text style={styles.setingTitle}>
            Settings
          </Text>
        </View>
        <View style={styles.menuList}>
          <TouchableOpacity onPress={() => this.setState({ modalProfileEdit:true })} style={styles.mqttConnect}>
            <View style={styles.mqttConnectInner}>
              <Entypo name="user" size={24} color="#787E87" />
              <Text style={styles.mqttTitle}>Change Profile User</Text>
            </View>
            <AntDesign name="right" size={24} color="#787E87" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ modalMqtt: true })} style={styles.mqttConnect}>
            <View style={styles.mqttConnectInner}>
              <MaterialCommunityIcons name="connection" size={24} color="#787E87" />
              <Text style={styles.mqttTitle}>Set Up Your MQTT URL</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.mqttConnect}>
            <View style={styles.mqttConnectInner}>
              <Ionicons name="ios-notifications" size={24} color="#787E87" />
              <Text style={styles.mqttTitle}>Set Up Notifications</Text>
            </View>
            <AntDesign name="right" size={24} color="#787E87" />
          </View>
          <View style={styles.mqttConnect}>
            <View style={styles.mqttConnectInner}>
              <Entypo name="help-with-circle" size={24} color="#787E87" />
              <Text style={styles.mqttTitle}>Help</Text>
            </View>
            <AntDesign name="right" size={24} color="#787E87" />
          </View>
          <TouchableOpacity onPress={this.clearAllData} style={styles.mqttConnect}>
            <View style={styles.mqttConnectInner}>
              <Entypo name="trash" size={24} color="#787E87" />
              <Text style={styles.mqttTitle}>Clear All Data</Text>
            </View>
            <AntDesign name="right" size={24} color="#787E87" />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  title: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,

  },
  setingTitle: {
    fontFamily: 'Inter',
    fontSize: 22,
    color: '#787E87',
    marginLeft: 4,
    fontWeight: '600',
  },
  menuList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  mqttConnect: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 2,
    borderRadius: 7,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '100%',

  },
  mqttTitle: {
    fontFamily: 'Jakarta',
    marginLeft: 5,
    color: '#787E87',
  },
  mqttConnectInner: {
    flexDirection: 'row',
  },
  modalMqtt: {
    backgroundColor: '#eee',
    flex: 1,
    padding: 20,
  },
  modalMqttTitle: {
    fontFamily: 'Inter',
    marginLeft: 10,
  },
  modalMqttHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalMqttContainer: {
    flex: 1,
    paddingTop: 20,
  },
  modalMqttInputUrl: {
    borderWidth: 0.8,
    width: "100%",
    backgroundColor: 'white',
    padding: 10,
    fontFamily: "Jakarta",
    borderRadius: 10,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  mqttUrl: {
    fontFamily: 'Inter',
  },
  modalMqttUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSetUp: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '700'
  },
  modalConfigTitle: {
    marginVertical: 10,
    color: '#787E87',
    fontFamily: 'Inter'
  },
  userPictureEdit: {
    flex:1,
  },
  userPictureInner: {
     alignSelf:"center",
     overflow:"hidden",
     height:90,
     borderRadius:20,
     width:90,
  },
  userInputName: {
    flex:4,
  },
  modalProfileTitle: {
    flex:.4,
  },
  profilepic:{
    height:90,
    width:90,
  },
  edit: {
    position:'absolute',
    alignSelf:'center',
    bottom:35,
    padding:5,
    backgroundColor:'#239ffb',
    borderRadius:10,
    right:120,
  }
});

export default SettingPage;
