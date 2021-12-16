import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import firebase from "firebase";


export default class LogOut extends React.Component {
    componentDidMount(){
        firebase.auth().signOut()
        this.props.navigation.navigate("SignIn")
    }
    render(){
        return(
            <View></View>
        )
    }
}