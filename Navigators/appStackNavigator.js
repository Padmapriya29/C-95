import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/welcomeScreen";
import HomeScreen from "../Screens/homeScreen";
import AppDrawerNavigator from "./appDrawerNavigator";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={AppDrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack;
