import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../screens/friendList";
import ChatScreen from "../screens/messageScreen";

const Stack = createStackNavigator();

export default class StackNav extends React.Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="stack" component={Friends} />
        <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
    );
  }
}
