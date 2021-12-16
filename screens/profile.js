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
    if (this.state.name !== "") {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>First Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                value={this.state.firstName}
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ firstName: item });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Last Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                value={this.state.lastName}
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ lastName: item });
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Age:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Age"
                value={this.state.age}
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ age: item });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Email:</Text>
              <Text style={styles.textInput}>{this.state.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                db.collection("user").doc(this.state.docId).update({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  age: this.state.age,
                  docId: this.state.docId,
                });
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    flex: 1,
    margin: 2,
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
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
    width: "60%",
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: "blue",
    borderBottomWidth: 2,
    fontSize: 30,
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
    backgroundColor: "red",
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
    marginTop: 20,
    flexDirection: "row",
  },
});
