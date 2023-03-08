import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather,Entypo,FontAwesome,Ionicons} from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Weather extends React.Component {
  
    checkWeatherType = (params) => {
        switch(params){
            case 'Clouds' : 
               return 'cloud';
            break;
            case 'Clear' :
               return 'sunny';
            break;
            case 'Rain' :
                return 'rainy'; 
            break;
            case 'Haze' :
                return 'cloud';
            break;
            }
    }

    render() {
        return (
            <LinearGradient colors={["#2641c2","#01bffd"]} style={styles.container}>
                <View style={styles.inner1}>
                  <View>
                    <Ionicons name={this.checkWeatherType(this.props.weatherType)} size={80} color="white"/>
                  </View>
                    <View style={styles.city}>
                    <Entypo name="location-pin" size={25} color="white" />
                    <Text style={styles.cityName}>{this.props.cityName}</Text>
                    </View>
                </View>
                <View style={styles.inner2}>
                <Text style={styles.temp}>{`${Math.floor(this.props.temp)}°`}</Text>
                <Text style={styles.weatherType}>{this.props.weatherType}</Text>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight / 4.5,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    inner1: {
        flex: 4,
    },
    inner2: {
        flex: 2,
        alignItems:'center',
        marginTop:4,
    },
    city: {
       flexDirection:'row',
       alignItems:'center',
    },
    cityName: {
        fontFamily:'Rubik',
        color:'white',
        fontSize:25,
    },
    temp: {
        color:'white',
        fontFamily: 'Inter',
        fontWeight:'600',
        fontSize:60,
    },
    weatherType: {
        fontFamily:'Rubik',
        color:'#ddd',
        fontSize:20,
        justifyContent:'center',
    }
})
