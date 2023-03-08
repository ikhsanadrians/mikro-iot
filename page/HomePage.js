import {
  Component,
  createRef
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Button,
  Alert,
  Image,
} from 'react-native';
import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import Paho from 'paho-mqtt';
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CostumButton1 from '../components/buttonComponents/CostumButton1';
import { ScrollView } from 'react-native';
import CostumButton2 from '../components/buttonComponents/CostumButton2';
import CostumButton3 from '../components/buttonComponents/CostumButton3';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import Weather from '../components/weather';
import { Switch } from 'react-native-paper';
import Grid from '../components/Grid';
import ProfilePic from '../assets/misc/samplepic.jpg';
import DraggableComponent from '../components/TestDragComponents';
import { ActivityIndicator } from 'react-native-paper';
import Loading from '../components/Loading';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angka: 2,
      status: '',
      data: [],
      username_mqtt: '',
      password_mqtt: '',
      subscribedTopic: '',
      parsedData: [],
      refreshing: false,
      username: "",
      temp: '',
      isClicked: false,
      mqttUrl: '',
      longitude: '',
      weatherType: '',
      cityName: '',
      latitude: '',
      mqttPort: null,
      isSwitchOn: [],
      mqttPath: '',
      mqttId: 'id_' + parseInt(Math.random() * 100000),
      isLoadingVisible: false,
    }
    this.client = null;
    this.handleSwitchToggle = this.handleSwitchToggle.bind(this)

  }



  onRefresh = () => {
    this.setState({ refreshing: true })
    this.loadData();
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000);
  }




  refreshFromSettingPage = () => {
    if (this.props.route.params == undefined || this.props.route.params == 'true') {
      this.setState({ refreshing: true });
      setTimeout(() => {
        this.setState({ refreshing: false })
        this.props.route.params = "false";
      }, 1000)
    } 
  }



  async componentDidMount() {
    this.loadData();
    this.clientConnect();
    this.getLocation();
  }


  clientConnect = async () => {
    try {
      if (await this.state.mqttUrl != '') {
        setTimeout(() => {
          this.client = new Paho.Client(
            this.state.mqttUrl, this.state.mqttPort, this.state.mqttId
          )
          this.client.onMessageArrived = this.onMessageArrived;
          this.client.onConnectionLost = this.onConnectionLost;
          try {
            this.connect();
          } catch {
            Alert.alert('error', 'tidak bisa menyambungkan ke server. tolong cek kembali konfigurasi', [
              { text: 'OK', onPress: () => console.log('OK') }
            ])
          }
        }, 5000);
      }
    } catch {
      console.log('setting ... mqtt page')
    }
  }


  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to Access Location denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude });
    this.setState({ longitude: location.coords.longitude });

    const apiKey = "74891133a9af1c283f0c9f3a9a6a18c7";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${apiKey}&units=metric`
    ).then(response => response.json())
      .then(data => {
        try {
          // console.log(data.main.temp)
          this.setState({ temp: data.main.temp });
          this.setState({ weatherType: data.weather[0].main })
          this.setState({ cityName: data.name });
        } catch {
          console.log('wait');
        }
      })
      .catch(error => console.log(error))
  }


  onConnect = async () => {
    try {
      console.log('onConnect')
      this.client.subscribe('Cikunir/lt2/suhu2/sharp')
      this.setState({ status: 'Connected' });
      setTimeout(() => {
        this.setState({status:''});
      }, 5000);
    } catch {
      console.log('Failed To Connection!')
    }
  }

  onFailure = (err) => {
    console.log('Connect Failed')
    console.log(err)
    this.setState({ status: 'failed' })
  }

  onMessageArrived = (message) => {
    console.log(message.payloadString);
  }

  onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  connect = async () => {
    try {
      this.setState({isLoadingVisible:true})
      this.setState({ status: 'IsFetching' },
        async () => {
          this.client.connect({
            onSuccess: this.onConnect,
            useSSL: false,
            userName: (await this.state.username_mqtt == '' ? 'exampleUsername' : await this.state.username_mqtt),
            password: (await this.state.password_mqtt == '' ? 'examplePassword' : await this.state.password_mqtt),
            timeout: 3,
            onFailure: this.onFailure,
          });
        }
      )
    } catch {
      console.log('failed to connect, mqtt')
      this.setState({ status: 'Connection Failed!' })
    }
  }



  loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const promises = keys.map(key => AsyncStorage.getItem(key));
      const values = await Promise.all(promises);
      // console.log(values)
      const data = keys.map((key, i) => ({ key, value: values[i] }));
      this.setState({ data });
      await this.loadConfigData();
    }
    catch {
      console.log('wait')
    }
  };


  loadConfigData = async () => {
    let value = [];
    try {
      await this.state.data.map((data, index) => {
        if (data.key == "mqttConfig") {
          let ParsedValue = JSON.parse(data.value);
          value.push(ParsedValue.mqttUrl, ParsedValue.mqttPort, ParsedValue.mqttTopicPath, ParsedValue.mqttUsername, ParsedValue.mqttPassword);
        }
      })

    } catch {
      return
    }


    // console.log(value)
    this.setState({ mqttUrl: value[0] });
    this.setState({ mqttPort: parseInt(value[1]) });
    this.setState({ mqttPath: value[2] });
    this.setState({ username_mqtt: value[3] });
    this.setState({ password_mqtt: value[4] });
  }

  runConnect = () => {
    this.clientConnect();
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000)
  }

  setData = async (key, value) => {
    await AsyncStorage.setItem(key, value, () => {
      this.loadData();
    });
  };


  clearAllData = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => alert('success'))
      .catch((error) => {
        console.log("wait")
      })
  }
  
  handleSwitchToggle(index) {
    const newSwitches = [...this.state.isSwitchOn];
    newSwitches[index] = !newSwitches[index];
    this.setState({ switches: newSwitches });
  }
   
  btnAc = () => {
    let btnState = this.state.isClicked;
    if (btnState == false) {
      let message1 = new Paho.Message("1");
      message1.destinationName = "Cikunir/lt2/suhu2/sharp"
      this.client.send(message1)
      this.setState({ isClicked: true })
    } else {
      let message2 = new Paho.Message("2")
      message2.destinationName = "Cikunir/lt2/suhu2/sharp"
      this.client.send(message2)
      this.setState({ isClicked: false })
    }

  }

  handleStatusConnect = () => {
     switch(this.state.status){
         case "IsFetching" :
           return "Connecting ...";
         break;
         case "Connected" :
           return "Connected";
         break; 
         case "failed" :
           return "Failed Connect To Server";
    } 
  }



  handleStatusBackgroundColor = () => {
    switch(this.state.status){
      case "IsFetching" :
        return "#239ffb"; 
      break;
      case "Connected" :
        return "#4EB755";
      break; 
      case "failed" :
        return "#9E0F0F";
    }
  }

  render() {
    //parameter dari page sebelumnya

    console.log(`route-params: ${this.props.route.params}`)
    console.log(`lat:${this.state.latitude}`)
    console.log(`long:${this.state.longitude}`)

    //mapping value dari async
    let arrayDataValue = []
    let configData = []
    let mqttConfigs = []
  
    console.log(this.state.data)
    // console.log(this.state.username_mqtt)
    // console.log(this.state.password_mqtt)
    // console.log(this.state.mqttPort)
    // console.log(this.state.mqttPath)
    // console.log(this.state.mqttUrl)

    // console.log(this.state.temp);
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    console.log(`mqttURL: ${this.state.mqttUrl}`);
    console.log(`status: ${this.state.status}`)


    if (this.state.data == null) {
      return
    } else {
      this.state.data.map((data, index) => {
        let ParsedValue = JSON.parse(data.value)
        if (data.key == "mqttConfig") {
          mqttConfigs.push(ParsedValue.mqttUrl, ParsedValue.mqttPort, ParsedValue.mqttTopicPath, ParsedValue.mqttUsername, ParsedValue.mqttPassword)
        } else if (data.key == "username") {
          configData.push(ParsedValue.name)
        } else {
          let key = data.key
          arrayDataValue.push([key, ParsedValue.selectedBtn, ParsedValue.topicName, ParsedValue.templateName, ParsedValue.buttonTitle]);
        }
      })
    }



    if (arrayDataValue[0] == null || !arrayDataValue) {
      return (
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onScrollBeginDrag={() => this.setState({ refreshing: false })}
          onMomentumScrollBegin={() => this.setState({ refreshing: false })}
          onMomentumScrollEnd={() => this.setState({ refreshing: false })}
        >
        <Loading loading={this.state.status === 'IsFetching' ? true : false} icon={this.state.status} titleLoad={this.handleStatusConnect()} bg={this.handleStatusBackgroundColor()} visible={this.state.isLoadingVisible}></Loading>
          <View style={styles.welcomes}>
          </View>
          <Text style={styles.title}></Text>
          <View style={styles.boxNull}>
            <AntDesign name="inbox" size={100} color="#8C8C8E" />
            <Text style={styles.boxNullDesc}>No Device Yet</Text>
            <Text style={styles.deviceNull}>Tidak Ada Device Yang Terhubung</Text>
            <TouchableOpacity onPress={() => this.client == null || this.state.status == 'failed' ? this.props.navigation.navigate('Settings', { openModal: true }) : this.props.navigation.navigate('FirstSetUp')}>
              <LinearGradient
                colors={["#2380bf", "#239ffb", "#55cfdb"]}
                style={styles.btnDevice}
              >
                <AntDesign name="plus" size={20} color="white" />
                <Text style={styles.buttonText}>Add New Devices</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.clearAllData} style={styles.btnDevelop}>
              <AntDesign name='setting' size={20} color="white"></AntDesign>
              <Text style={styles.btnDeviceTitle}>Developer Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.runConnect} style={styles.btnDevelop}>
              <AntDesign name='setting' size={20} color="white"></AntDesign>
              <Text style={styles.btnDeviceTitle}>Run</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            onScrollBeginDrag={() => this.setState({ refreshing: false })}
            onMomentumScrollBegin={() => this.setState({ refreshing: false })}
            onMomentumScrollEnd={() => this.setState({ refreshing: false })}
          >
            <View style={styles.greet}>
              <View style={styles.greetUserContainer}>
               <Text style={styles.greetTitle}>
                 Welcome Back,
               </Text>
               <Text style={styles.greetUserName}>
                 {configData}
               </Text>
              </View>
              <View style={styles.greetProfilePic}>
                <View style={styles.profilePicInner}>
                  <Image source={ProfilePic} style={styles.profilePicture}>
                  </Image>
                </View>
              </View>
            </View>
            <Weather temp={this.state.temp} weatherType={this.state.weatherType} cityName={this.state.cityName}>

            </Weather>
            <View style={styles.buttonGrid}>
              {
                arrayDataValue.map((data, index) => {
                  switch (data[1]) {
                    case 1:
                      return (
                        <Grid key={index}>
                          <CostumButton1 btnTitle={data[4]} key={index} onPress={this.btnAc}>
                          </CostumButton1>
                        </Grid>

                      )
                      break;
                    case 2:
                      return (
                        <Grid key={index}>
                          <CostumButton2 w={120} h={50} btnTitle={data[4]} key={index} onPress={this.btnAc}>
                          </CostumButton2>
                        </Grid>
                      )
                      break;
                    case 3:
                      return (
                        <Grid key={index}>
                          <CostumButton3 key={index} onPress={this.btnAc}>
                          </CostumButton3>
                        </Grid>
                      )
                      break;
                    case 4:
                      return (
                        <Grid key={index}>
                          <View style={styles.switchContainer}>
                            <View style={styles.switchInnerTop}>
                            <MaterialCommunityIcons name='floor-lamp' size={30} color="#239ffb"></MaterialCommunityIcons>             
                            </View>
                            <View style={styles.switchInnerBottom}>
                            <Text style={styles.switchInnerTitle}> 
                              {data[4]}
                            </Text>
                            <Text style={styles.switchInnerCondition}>
                                ON
                            </Text>
                            <Switch 
                              key={index}
                              color="#239ffb"
                              style={styles.switch}
                              value={this.state.isSwitchOn[index]}
                              onValueChange={()=>this.handleSwitchToggle(index)}
                            />
                            </View>                            
                          </View>
                        </Grid>
                      )
                  }
                })
              }
              <Text>
              </Text>

            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FirstSetUp')} style={styles.addNewBtn}>
            <LinearGradient colors={["#2380bf", "#239ffb", "#55cfdb"]} style={styles.addNewBtnGradient}>
              <Entypo name="plus" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          
          {/* {
            <Button title="ac" onPress={this.btnAc}>
            </Button>
          } */}

        </View>


      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 20,
  },
  title: {
    fontFamily: 'Jakarta',
  }
  ,
  // welcomes: {
  //   flex:1,
  // },
  boxNull: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxNullDesc: {
    fontFamily: 'Jakarta',
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C30',
  },
  btnDevice: {
    backgroundColor: '#2380bf',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnDeviceTitle: {
    color: 'white',
    marginLeft: 4,
  },
  deviceNull: {
    color: '#8c8c8e',
    fontFamily: 'Jakarta',
  },
  btnDevelop: {
    backgroundColor: '#133247',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Jakarta',
    marginLeft: 5,
  },
  addNewBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addNewBtnTitle: {
    fontFamily: 'Jakarta'
  },
  greet: {
    marginVertical: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  greetTitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: "#283142",
  },
  greetUserName: {
    fontFamily: 'InterSemi',
    color: "#283142",
    fontSize: 24
  },
  addNewBtnGradient: {
    borderRadius: 15,
    padding: 10,
  },
  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  switch: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  switchContainer: {
    flex:1,
  },
  switchInnerBottom: {
     padding:5,
     flex:3,
  },
  switchInnerTop: {
     flex:4,
     padding:5,
  },
  switchInnerTitle: {
    fontFamily:'InterSemi',
  },
  switchInnerCondition: {
    fontFamily: 'Inter',
    color:'#239ffb',
  },
  // greetUserContainer:{
  
  // },
  // greetProfilePic: {
  
  // },
  profilePicInner: {
    width:45,
    height:45,
    overflow:'hidden',
    borderRadius:15,
  },
  profilePicture: {
    width:45,
    height:45,
  }
});


export default HomePage;