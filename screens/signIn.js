import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
  SafeAreaView,Platform,StatusBar
} from "react-native";
import db from "../config";
import * as firebase from "firebase";

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      passcode: "",
      showModal: false,
      firstName: "",
      lastName: "",
      confirmPasscode: "",
      age: "",
    };
  }
  modalDisplay = () => {
    return (
      <Modal
        visible={this.state.showModal}
        animationType="slide"
        transparent={false}
      >
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          multiline={true}
          onChangeText={(item) => {
            this.setState({ firstName: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          multiline={true}
          onChangeText={(item) => {
            this.setState({ lastName: item });
          }}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Age"
          onChangeText={(item) => {
            this.setState({ age: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="email"
          multiline={true}
          onChangeText={(item) => {
            this.setState({ email: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="passcode"
          secureTextEntry
          onChangeText={(item) => {
            this.setState({ passcode: item });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm passcode"
          secureTextEntry
          onChangeText={(item) => {
            this.setState({ confirmPasscode: item });
          }}
        />

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            this.signUp();
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            this.setState({ showModal: false });
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    );
  };
  signUp = async () => {
    if (this.state.passcode === this.state.confirmPasscode) {
      if (this.state.firstName.length >= 3 && this.state.lastName.length >= 3) {
        if (this.state.age >= 13) {
          try {
            const response = await firebase
              .auth()
              .createUserWithEmailAndPassword(
                this.state.email,
                this.state.passcode
              );
            if (response) {
              Alert.alert("User Succesfully Added");
              db.collection("user")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  firstName: this.state.firstName.toLowerCase(),
                  lastName: this.state.lastName.toLowerCase(),
                  age: this.state.age,
                  email: this.state.email.toLowerCase(),
                  name: this.state.firstName.toLowerCase() + " " + this.state.lastName.toLowerCase(),
                  uid:firebase.auth().currentUser.uid.slice(2,6)
                });
              this.login();
            }
          } catch (error) {
            Alert.alert(error.message);
          }
        } else {
          ToastAndroid.show("the minimum Age is 13", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          "The first and the last name should atlease contain 3 letters",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show("the passcode does not match!", ToastAndroid.SHORT);
    }
  };
  login = async () => {
    if (this.state.email && this.state.passcode) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.passcode);
        if (response) {

          this.setState({
            email: "",
            passcode: "",
            showModal: false,
            firstName: "",
            lastName: "",
            confirmPasscode: "",
            age: "",
          })
          this.props.navigation.navigate("DrawerNav");
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      ToastAndroid.show("Enter the Credentials", ToastAndroid.SHORT);
    }
  };
  render() {
    /*<Header
          centerComponent={{
            text: "WILLY",
            style: { color: "white", fontSize: 20 },
          }}
          backgroundColor="black"
        />*/
    if (this.state.showModal === false) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}/>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(data) => {
              this.setState({ email: data });
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Passcode"
            onChangeText={(data) => {
              this.setState({ passcode: data });
            }}
            value={this.state.passcode}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              this.login();
            }}
          >
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              this.setState({ showModal: true });
            }}
          >
            <Text style={styles.text}>SignUp</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View>{this.modalDisplay()}</View>;
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  text: { color: "blue", fontSize: 20 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttons: {
    width: 90,
    height: 30,
    backgroundColor: "red",
    borderRadius: 2,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textInput: {
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    borderBottomWidth: 2,
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  InputContainer: { flexDirection: "row" },
});
