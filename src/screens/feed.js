import React, { useState } from "react";
import { StyleSheet, View, Modal, Text, FlatList, SafeAreaView, Button } from "react-native";

import Item from "../shared/item";
import Flatbutton from "../shared/button";
import Card from "../shared/card";
import Start from "../modals/start";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

import { MaterialIcons } from "@expo/vector-icons";
export default function Feed({ navigation }) {
  const [array, setArray] = useState([
    // {
    //   time: "5:31",
    //   distance: "2.34",
    //   notes: "Lorem Ipsum",
    //   category: "Jog",
    //   dateAndTime: "March 12, 2002 - 8:03am",
    //   title: "Friday Morning Run",
    //   icon1: globalDesign.dark,
    //   icon2: globalDesign.dark,
    //   icon3: globalDesign.dark,
    //   icon4: globalDesign.dark,
    //   icon5: globalDesign.dark,
    //   key: "1",
    // },
  ]);

  //adds an item to the array
  const addRun = (item) => {
    item.key = Math.random().toString();
    setArray((currentArray) => {
      return [item, ...currentArray];
    });
  };

  //deletes an item from the array
  const deleteRun = (key) => {
    setArray((currentArray) => {
      return currentArray.filter((item) => item.key != key);
    });
  };

  const ListOfRuns = () => {
    if (array.length == 0) {
      return (
        <View style={globalStyles.paddingVertical}>
          <Flatbutton
            text="Click here to add your first run!"
            onPress={() => navigation.navigate("StartRun", { addRun: addRun })}
            backgroundColor={globalDesign.primary}
            color={globalDesign.light}
          ></Flatbutton>
        </View>
      );
    }
    return (
      <FlatList
        data={array}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card>
            <Item item={item} deleteRun={deleteRun} />
          </Card>
        )}
      />
    );
  };

  return (
    <View style={globalStyles.containerLight}>
      <View style={globalStyles.header}>
        <SafeAreaView style={globalStyles.center}>
          <Text style={globalStyles.textLight}>Feed</Text>
        </SafeAreaView>
      </View>
      <SafeAreaView style={globalStyles.containerLight}>
        <ListOfRuns />
      </SafeAreaView>
      <View style={globalStyles.footer}>
        <View style={globalStyles.horizontalSpaceAroundFlex}>
          <TouchableOpacity style={globalStyles.center} onPress={() => navigation.navigate("StartRun", { addRun: addRun })}>
            <MaterialIcons name="location-on" size={38} color={globalDesign.light} />
            <Text style={globalStyles.footerTextLight}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.center}>
            <MaterialIcons name="playlist-add-check" size={38} color={globalDesign.secondary} />
            <Text style={globalStyles.footerTextSecondary}>Feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
