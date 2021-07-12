import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/homeScreen";
import RequesterDetailsScreen from "../Screens/requesterDetails";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="RequesterDetails"
        component={RequesterDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
