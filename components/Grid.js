import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from "expo-linear-gradient";


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;


export default class Grid extends React.Component {
    render() {
        return (
                <LinearGradient
                    colors={["#F2F3F2", "#ffffff"]}
                    style={style.container}>
                    {this.props.children}
                </LinearGradient>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: Width / 2.3,
        height: Height / 5,
        borderWidth: 1,
        margin: 2.52,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        borderColor: '#ddd',
        backgroundColor: 'white',
    }
});