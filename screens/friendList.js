import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/header";

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docId: firebase.auth().currentUser.uid,
      allUsers: [],
      friendsId: [],
      allUsersData: [],
      email: firebase.auth().currentUser.email,
      searchValue: "",
    };
  }
  fetchFriendIds = () => {
    this.state.allUsers.map((user) => {
      if (user.friends[0] == this.state.docId) {
        this.setState({
          friendsId: [...this.state.friendsId, user.friends[1]],
        });
      } else {
        this.setState({
          friendsId: [...this.state.friendsId, user.friends[0]],
        });
      }
    });
    console.log(this.state.friendsId)
    this.fetchFriendData();
  };

  fetchFriendData = () => {
    this.state.friendsId.map(async (friend) => {
      var friendRef = db.collection("user").where("uid", "==", friend);
      friendRef.get().then((snapshot) => {
        var userSnapshot = snapshot.docs.map((doc) => doc.data());
        console.log(userSnapshot);
        var temporary = [];
        userSnapshot.map((user) => {
          temporary.push(user);
        });
        this.setState({
          allUsersData: [...this.state.allUsersData, ...temporary],
        });
      });
    });
  };

  fetchUser = async () => {
    db.collection("friendList")
      .where("friends", "array-contains", this.state.docId)
      .get()
      .then((snapshot) => {
        var userSnapshot = snapshot.docs.map((doc) => doc.data());
        var temporary = [];
        userSnapshot.map((user) => {
          temporary.push(user);
        });
        this.setState({ allUsers: [...this.state.allUsers, ...temporary] });
      })
      .then(() => {
        if (this.state.allUsers.length !== 0){ this.fetchFriendIds()}
      });
  };

  renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.flatlistButton}
          onPress={() => {
            this.props.navigation.navigate("chat",{"friend":item});
          }}
        >
          <View style={styles.flatlistCont}>
            <Text style={styles.flatlistName}>{item.name}</Text>
            <Text style={styles.flatlistName}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount = async () => {
    await this.fetchUser();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader />
        <FlatList
          data={this.state.allUsersData}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    margin: 2,
    borderWidth: 2,
    borderRadius: 20,
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

  text: { color: "black", fontSize: 30 },
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
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: "blue",
    borderBottomWidth: 2,
    fontSize: 30,
    marginTop: 10,
    textAlign: "center",
    alignSelf: "flex-end",
  },

  buttons: {
    width: 90,
    height: 30,
    backgroundColor: "red",
    margin: 10,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
