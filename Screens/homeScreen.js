import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import MyHeader from "../Components/myHeader";
import db from "../config";
import firebase from "firebase";
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedHelpsList: [],
    };
    this.requestRef = null;
  }

  getRequestedHelpList = () => {
    this.requestRef = db.collection("request_help").onSnapshot((snapshot) => {
      var requestedHelpsList = snapshot.docs.map((document) => document.data());

      this.setState({ requestedHelpsList: requestedHelpsList });
      //console.log(this.state.requestedBooksList);
    });
    //console.log(this.state.requestedBooksList);
  };

  componentDidMount() {
    this.getRequestedHelpList();
  }

  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem 
        key={i}
        title={item.help_required}
        subtitle={item.address}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RequesterDetails", {
                details: item,
              });
            }}
          >
            <Text style={styles.requestbuttontxt}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#febbbb" }]}>
        <MyHeader title="Home" navigation={this.props.navigation} />
        <View style={styles.container}>
          {this.state.requestedHelpsList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of All Helps</Text>
            </View>
          ) : (
            <FlatList 
              keyExtractor={this.keyExtractor}
              data={this.state.requestedHelpsList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#febbbb",
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  requestbuttontxt: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#febbbb",
  },
  button: {
    width: "25%",
    height: RFValue(40),
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
