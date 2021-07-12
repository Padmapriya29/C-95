import React from "react";
import LottieView from "lottie-react-native";
export default class HelpAnimation extends React.Component {
  render() {
    return (
      <LottieView
        source={require("../assets/help.json")}
        style={{ width: "60%" }}
        autoPlay
        loop
      />
    );
  }
}
