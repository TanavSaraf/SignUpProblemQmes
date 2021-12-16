import React from "react";
import { Header, Icon } from "react-native-elements";

export default class MyHeader extends React.Component {
    constructor(props){
        super(props)
        this.state={
            text:this.props.text?this.props.text: "MessagingApp"
        }
    }
  render() {
    return (
      <Header
        backgroundColor="navy"
        centerComponent={{
          text: this.state.text,
          style: { color: "white", fontSize: 25, fontWeight: "bold" },
        }}
        leftComponent={() => {
          return (
            <Icon name="bars" type="font-awesome" color="white" size={20} />
          );
        }}
      />
    );
  }
}
