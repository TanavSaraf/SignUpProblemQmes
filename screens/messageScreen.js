import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: "",
      firstName: "",
      lastName: "",
      age: "",
      email: firebase.auth().currentUser.email,
      docId: "",
      message: "",
    };
  }
  fetchUser = async () => {
    db.collection("user")
      .where("email", "==", this.state.email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((docs) => {
          var user = docs.data();
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            docId: docs.id,
          });
        });
      });
  };

  componentDidMount() {
    //this.loadFontAsync();
    this.fetchUser();
  }
  render() {
    console.log(this.props.route.params.friend)
    if (this.state.name !== "") {
      return (
        <View style={styles.container}>
          <MyHeader text={this.props.route.params.friend.firstName}/>
          <View style={styles.chat}>

          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="type message here"
              value={this.state.message}
              multiline={true}
              onChangeText={(item) => {
                this.setState({ message: item });
              }}
            />

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                db.collection("chat").add({
                 
                });
              }}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading the information :)</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,flexDirection:"column"
  },
  chat:{
    flex:0.85
  },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: 20,
    color: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
  textInput: {
    width: "75%",
    padding: 5,
    borderRadius: 10,
    borderColor: "blue",
    borderBottomWidth: 2,
    fontSize: 20,
    marginTop: 10,
    textAlign: "left",
    alignSelf: "flex-end",
    marginHorizontal: 5,
  },
  text: {
    width: "40%",
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 30,
    marginTop: 10,
    color: "grey",
    textAlign: "left",
    alignSelf: "flex-end",
  },

  buttons: {
    backgroundColor: "skyblue",
    marginTop: 30,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 25,
  },
  inputContainer: {
    flex:0.1,
    justifyContent:"space-around",
    marginTop: 20,
    flexDirection: "row",
    
  },
});
