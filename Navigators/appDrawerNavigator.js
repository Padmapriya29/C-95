import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppTabs from "./appTabNavigator";
import SettingsScreen from "../Screens/settingsScreen";
import RecievedWorksScreen from "../Screens/recievedWorksScreen";
import AssignedWorksScreen from "../Screens/assignedWorksScreen";
import NotificationScreen from "../Screens/notificationScreen";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={AppTabs} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="AssignedWorks" component={AssignedWorksScreen} />
      <Drawer.Screen
        name="RecievedWorksScreen"
        component={RecievedWorksScreen}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
