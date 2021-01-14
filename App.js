import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./src/routes/homeStack";

const getFonts = () =>
  Font.loadAsync({
    "DMSans-regular": require("./src/assets/fonts/DMSans-Regular.ttf"),
    "DMSans-bold": require("./src/assets/fonts/DMSans-Bold.ttf"),
    "FiraCode-regular": require("./src/assets/fonts/FiraCode-Regular.ttf"),
    "FiraCode-bold": require("./src/assets/fonts/FiraCode-Bold.ttf"),
    "CourierPrime-regular": require("./src/assets/fonts/CourierPrime-Regular.ttf"),
    "CourierPrime-bold": require("./src/assets/fonts/CourierPrime-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <Navigator />;
  } else {
    return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />;
  }
}
