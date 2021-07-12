import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import AppDrawerNavigator from "../Navigators/appDrawerNavigator";
import RecievedWorksScreen from "../Screens/recievedWorksScreen";
export default class RequesterDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",

      requesterId: this.props.route.params.details.user_id,
      requestId: this.props.route.params.details.user_id,
      helpRequired: this.props.route.params.details.help_required,
      reasonForHelp: this.props.route.params.details.reason_for_help,
      contact: this.props.route.params.details.contact_number,
      address: this.props.route.params.details.address,
      receiverName: "",
      receiverRequestDocId: "",
    };
  }

  getUserDetails = (userId) => {
    db.collection("users")
      .where("userName", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  getReceiverDetails = () => {
    db.collection("users")
      .where("userName", "==", this.state.requesterId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
          });
        });
      });

    db.collection("request_help")
      .where("request_id", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverRequestDocId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
  }

  updateBookStatus = () => {
    db.collection("works_to_do").add({
      help_required: this.state.helpRequired,
      request_id: this.state.requestId,
      requested_by: this.state.receiverName,
      helper_id: this.state.userId,
      user_id: this.state.requesterId,
      request_status: "In Progress",
    });
  };

  addNotification = () => {
    var message = this.state.userName + " has shown interest in helping you";
    db.collection("all_notifications").add({
      targeted_user_id: this.state.requesterId,
      helper_id: this.state.userId,
      request_id: this.state.requestId,
      help_required: this.state.helpRequired,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Home",
              style: {
                color: "#ffffff",
                fontSize: RFValue(20),
                fontWeight: "bold",
              },
            }}
            backgroundColor="#32867d"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              paddingTop: RFValue(30),
              paddingLeft: RFValue(10),
            }}
          >
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: RFValue(25),
                  textAlign: "center",
                }}
              >
                {this.state.helpRequired}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(15),
                  textAlign: "center",
                  marginTop: RFValue(15),
                }}
              >
                {this.state.reason_for_help}
              </Text>
              <Text
                style={styles.txt}
              >
                Contact: {this.state.contact}
              </Text>
              <Text
                style={styles.txt}
              >
                Address: {this.state.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.7,
              padding: RFValue(20),
            }}
          >
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFValue(50),
                borderWidth: 1,
                borderColor: "#deeedd",
                padding: RFValue(10),
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(30),
                }}
              >
                Requester Information
              </Text>
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                }}
              >
                Name : {this.state.receiverName}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.requesterId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateBookStatus();
                    this.addNotification();
                    this.props.navigation.navigate("RecievedWorks");
                  }}
                >
                  <Text style={{color:"#fff", fontSize:20,}}>I want to Help</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(60),
    backgroundColor: "#1f4172",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
    marginTop: RFValue(50),
  },
  txt: {
      fontWeight: "300",
      fontSize: RFValue(20),
      textAlign: "center",
  },
});


