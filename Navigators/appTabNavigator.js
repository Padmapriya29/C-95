import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RequestHelpScreen from "../Screens/requestHelpScreen";
import RemarksScreen from "../Screens/remarksScreen";
import HomeStack from "./homeStackNavigator";

const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { marginTop: 30 },
        activeTintColor: "tomato",
        inactiveTintColor: "green",
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="RequestHelp" component={RequestHelpScreen} />
      <Tab.Screen name="Remarks" component={RemarksScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
