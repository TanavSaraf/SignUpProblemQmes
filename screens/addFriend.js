import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/header";

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docId: "",
      allUsers: [],
      email: firebase.auth().currentUser.email,
      searchValue: "",
    };
  }
  fetchUser = async () => {
    await db.collection("user").onSnapshot((snapshot) => {
      var userSnapshot = snapshot.docs.map((doc) => doc.data());

      var temporary = [];
      userSnapshot.map((user) => {
        if (user.email.toLowerCase() == firebase.auth().currentUser.email) {
        } else {
          temporary.push(user);
        }
      });
      this.setState({ allUsers: temporary });
    });
  };
  fetchMyId = async () => {
    db.collection("user")
      .where("email", "==", this.state.email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((docs) => {
          var user = docs.data();
          this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            docId: docs.id,
          });
        });
      });
  };
  //requestee is the person sent to
  //requestor is u
  friendRequest = (requestee) => {
    var requestor = this.state.docId;
    var requestorName = this.state.firstName + "  " + this.state.lastName;
    db.collection("friendRequests").add({
      requestorId: requestor,
      requestorName: requestorName,
      requesteeId: requestee,
    });
  };
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.flatlistButton}
        onPress={() => {
          this.friendRequest(item.uid);
        }}
      >
        <View style={styles.flatlistCont}>
          <Text style={styles.flatlistName}>{item.firstName}</Text>
          <Text style={styles.flatlistName}>{item.lastName}</Text>
        </View>
        <Text style={[styles.flatlistName, { fontSize: 15, marginBottom: 5 }]}>
          User Id:{item.email}
        </Text>
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this.fetchUser();
    this.fetchMyId();
  }

  render() {
    if (this.state.docId == "") {
      return (
        <View>
          <MyHeader />
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MyHeader />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TextInput
              placeholder="Search for people by the id"
              style={styles.textInput}
              onChangeText={(item) => {
                this.setState({ searchValue: item });
              }}
            />
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                db.collection("user")
                  .where("docId", "==", this.state.searchValue)
                  .onSnapshot((snapshot) => {
                    var userSnapshot = snapshot.docs.map((doc) => doc.data());

                    var temporary = [];
                    userSnapshot.map((user) => {
                      if (user.email == this.state.email) {
                      } else {
                        temporary.push(user);
                      }
                    });
                    this.setState({ allUsers: temporary });
                  });
              }}
            >
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.allUsers}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  text: { color: "black", fontSize: 30 },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: 20,
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
  buttons: {
    width: 70,
    height: 30,
    backgroundColor: "red",
    marginTop: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  flatlistButton: {
    width: "100%",
    backgroundColor: "beige",
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  flatlistCont: { flexDirection: "row" },
  flatlistName: {
    fontSize: 30,
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 20,
    marginTop: 37,
    textAlign: "center",
    alignSelf: "center",
  },
});
