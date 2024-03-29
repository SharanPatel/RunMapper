import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "../screens/onboarding";
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signUp";
import React, { useEffect } from "react";
import { Button, View } from "react-native";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLauched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ header: () => null }}
          // SHOULD ADD A BACK BUTTON HERE!!!
        />
      </Stack.Navigator>
    );
  } else {
    return <LoginScreen />;
  }
};

export default AuthStack;
