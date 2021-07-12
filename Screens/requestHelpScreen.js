import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Alert } from "react-native";
import { Input } from "react-native-elements";
import db from "../config";
import MyHeader from "../Components/myHeader";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class RequestHelpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      helpRequired: "",
      reasonForHelp: "",
      requestId: "",
      helpStatus: "",
      contact: "",
      address: "",
    };
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  addRequest = async (helpRequired, reasonForHelp, contact, address) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("request_help").add({
      user_id: userId,
      help_required: helpRequired,
      reason_for_help: reasonForHelp,
      address: address,
      contact_number: contact,
      request_id: randomRequestId,
      request_status: "requested",
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    this.setState({
      helpRequired: "",
      reasonForHelp: "",
      address: "",
      contact: "",
    });

    return Alert.alert("Help requested successfully!");
  };

  render() {
    return (
      <View style={{backgroundColor:"#febbbb",}}>
        <MyHeader title="Request Help" navigation={this.props.navigation} />
        <View>
          <Input
            style={styles.formInputText}
            placeholder="Type your Help Here"
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) => {
              this.setState({
                helpRequired: text,
              });
            }}
            value={this.state.helpRequired}
          />
          <Input
            style={styles.formInputText}
            containerStyle={{ marginTop: RFValue(30),  }}
            multiline={true}
            numberOfLines={8}
            placeholder="What Help Do You Need?"
            onChangeText={(text) => {
              this.setState({ reasonForHelp: text });
            }}
            value={this.state.reasonForHelp}
          />
          <Input
            style={styles.formInputText}
            placeholder="Enter Contact Number"
            containerStyle={{ marginTop: RFValue(60) }}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />
          <Input
            style={styles.formInputText}
            containerStyle={{ marginTop: RFValue(30) }}
            multiline={true}
            numberOfLines={5}
            placeholder="Type Your Address"
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
            value={this.state.address}
          />

          <TouchableOpacity
            style={[styles.button, { marginTop: RFValue(30) }]}
            onPress={() => {
              this.addRequest(
                this.state.helpRequired,
                this.state.reasonForHelp,
                this.state.contact,
                this.state.address
              );
            }}
          >
            <Text style={styles.requestbuttontxt}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formInputText: {
    width: "75%",
    height: RFValue(35),
    borderWidth: 1,
    padding: RFValue(10),
  },
  requestbuttontxt: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "65%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#1f4172",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
