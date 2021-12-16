import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer"
import AddFriend from "../screens/addFriend"
import Requests from '../screens/requestScreens';
import StackNav from './stackNav';
import Profile from '../screens/profile';
import LogOut from '../screens/logout';
const Drawer=createDrawerNavigator()

export default class DrawerNav extends React.Component {
  render(){
  return (
 
     <Drawer.Navigator screenOptions={{headerShown:false}}>
       <Drawer.Screen name="Friends" component={StackNav}/>
       <Drawer.Screen name="Requests" component={Requests}/>
       <Drawer.Screen name="AddFriend" component={AddFriend}/>
       <Drawer.Screen name="Profile" component={Profile}/>
       <Drawer.Screen name="LogOut" component={LogOut}/>
     </Drawer.Navigator>

  );
  }
}