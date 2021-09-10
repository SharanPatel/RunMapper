import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";

import Item from "../shared/item";
import Flatbutton from "../shared/button";
import Card from "../shared/card";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { getRunsByUserId } from "../api/databaseCalls";
import { UserContext } from "../context";

export default function Feed({ navigation }) {
  const user = useContext(UserContext);
  const [runs, setRuns] = useState();

  useEffect(() => {
    if (user?.id) {
      getRunsByUserId({ userId: user.id, cb: setRuns });
    }
  }, [user?.id]);

  const ListOfRuns = () => {
    if (!runs) {
      return (
        <View style={globalStyles.paddingVertical}>
          <Flatbutton
            text={"Loading..."}
            backgroundColor={globalDesign.primary}
            color={globalDesign.light}
          ></Flatbutton>
        </View>
      );
    } else if (!runs?.length) {
      return (
        <View style={globalStyles.paddingVertical}>
          <Flatbutton
            text={"Click to start your first run"}
            onPress={() => navigation.navigate("StartRun")}
            backgroundColor={globalDesign.primary}
            color={globalDesign.light}
          ></Flatbutton>
        </View>
      );
    }
    return (
      <FlatList
        data={runs}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card>
            <Item setRuns={setRuns} item={item} />
          </Card>
        )}
      />
    );
  };

  return (
    <View style={globalStyles.containerLight}>
      <View style={globalStyles.header}>
        <TouchableOpacity style={globalStyles.logoutHide} onPress={() => {}}>
          <MaterialIcons name="logout" size={25} color={globalDesign.primary} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
        <Text style={globalStyles.textLight}>Feed</Text>
        <TouchableOpacity
          style={globalStyles.logout}
          onPress={() => firebase.auth().signOut()}
        >
          <MaterialIcons name="logout" size={25} color={globalDesign.light} />
          {/* <Text style={globalStyles.headerTextLight}>Log Out</Text> */}
        </TouchableOpacity>
      </View>

      <SafeAreaView style={globalStyles.containerLight}>
        <ListOfRuns />
      </SafeAreaView>

      <View style={globalStyles.footer}>
        <View style={globalStyles.horizontalSpaceAroundFlex}>
          <TouchableOpacity
            style={globalStyles.center}
            onPress={() => navigation.navigate("StartRun")}
          >
            <MaterialIcons
              name="location-on"
              size={38}
              color={globalDesign.light}
            />
            <Text style={globalStyles.footerTextLight}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.center}>
            <MaterialIcons
              name="playlist-add-check"
              size={38}
              color={globalDesign.secondary}
            />
            <Text style={globalStyles.footerTextSecondary}>Feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
