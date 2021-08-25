import React, { useEffect } from "react";

import { useFonts } from "expo-font";
import Providers from "./src/navigation";
import * as firebase from "firebase";

import ApiKeys from "./firebase";

const App = () => {
  const [loaded] = useFonts({
    "DMSans-regular": require("./src/assets/fonts/DMSans-Regular.ttf"),
    "DMSans-bold": require("./src/assets/fonts/DMSans-Bold.ttf"),
    "FiraCode-regular": require("./src/assets/fonts/FiraCode-Regular.ttf"),
    "FiraCode-bold": require("./src/assets/fonts/FiraCode-Bold.ttf"),
    "CourierPrime-regular": require("./src/assets/fonts/CourierPrime-Regular.ttf"),
    "CourierPrime-bold": require("./src/assets/fonts/CourierPrime-Bold.ttf"),
    "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./src/assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("./src/assets/fonts/Lato-Italic.ttf"),
    "Lato-BoldItalic": require("./src/assets/fonts/Lato-BoldItalic.ttf"),
    "Kufam-SemiBoldItalic": require("./src/assets/fonts/Kufam-SemiBoldItalic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  return <Providers />;
};

export default App;
