import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Flatbutton from "../shared/button";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import Card from "../shared/card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Polyline, Marker } from "react-native-maps";

export default function Review({
  time,
  distance,
  notes,
  category,
  dateAndTime,
  title,
  setTitle,
  setNotes,
  setCategory,
  backPress,
  savePress,
  deletePress,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  setIcon1,
  setIcon2,
  setIcon3,
  setIcon4,
  setIcon5,
  runPath,
  calories,
  avgSpeed,
}) {
  const setIconsToDefault = () => {
    setIcon1(globalDesign.dark);
    setIcon2(globalDesign.dark);
    setIcon3(globalDesign.dark);
    setIcon4(globalDesign.dark);
    setIcon5(globalDesign.dark);
  };

  const handleDelete = () => {
    Alert.alert("Alert", "Are you sure you would like to delete this run?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => deletePress() },
    ]);
  };
  return (
    //displays time and distance gathered in start modal and asks user for notes info
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={globalStyles.containerLight}>
          <View style={globalStyles.header}>
            <SafeAreaView style={globalStyles.headerLayout}>
              <TouchableOpacity onPress={backPress}>
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={globalDesign.light}
                />
              </TouchableOpacity>
              <Text style={globalStyles.textLight}>Review Modal</Text>
              <TouchableOpacity onPress={handleDelete}>
                <Ionicons
                  name="ios-trash"
                  size={30}
                  color={globalDesign.light}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>

          <SafeAreaView style={globalStyles.containerLight}>
            <View style={globalStyles.mapStyleFlex}>
              <MapView
                style={globalStyles.mapStyleFlex}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: runPath[0].latitude,
                  longitude: runPath[0].longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: runPath[0].latitude,
                    longitude: runPath[0].longitude,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: runPath[runPath.length - 1].latitude,
                    longitude: runPath[runPath.length - 1].longitude,
                  }}
                />
                <Polyline
                  coordinates={runPath}
                  strokeColor={globalDesign.primary}
                  strokeWidth={10}
                />
              </MapView>
            </View>

            <Card>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.reviewSubtitle}>{dateAndTime}</Text>
                <View style={globalStyles.horizontalSpaceBetween}>
                  <TextInput
                    onChangeText={(val) => setTitle(val)}
                    value={title}
                    style={styles.reviewTitle}
                  />
                  <Feather
                    name="edit-2"
                    size={18}
                    color={globalDesign.primary}
                  />
                </View>
              </View>
            </Card>

            <Card>
              <View style={globalStyles.horizontalSpaceAround}>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <Entypo
                      name="location-pin"
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>Distance</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {Math.round(distance * 100) / 100}
                      </Text>{" "}
                      km
                    </Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <Entypo
                      name="stopwatch"
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>Duration</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>{time}</Text> min
                    </Text>
                  </View>
                </View>
              </View>
              <View style={globalStyles.horizontalSpaceAround}>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <FontAwesome5
                      name="running"
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>Avg Pace</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>{avgSpeed}</Text>{" "}
                      min/km
                    </Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <View style={styles.logo}>
                    <FontAwesome5
                      name="fire"
                      size={48}
                      color={globalDesign.secondary}
                    />
                  </View>
                  <View style={styles.statBoxTextContainer}>
                    <Text style={styles.statBoxTextHeader}>Calories</Text>
                    <Text style={styles.statBoxTextHeader}>
                      <Text style={styles.statBoxTextDynamic}>
                        {Math.round(calories)}
                      </Text>{" "}
                      cals
                    </Text>
                  </View>
                </View>
              </View>
            </Card>

            <Card>
              <View style={globalStyles.paddingHorizontal}>
                <View style={globalStyles.horizontalSpaceBetween}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault();
                      setIcon1(globalDesign.secondary);
                    }}
                    name="emoticon-cry-outline"
                    size={48}
                    color={icon1}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault();
                      setIcon2(globalDesign.secondary);
                    }}
                    name="emoticon-sad-outline"
                    size={48}
                    color={icon2}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault();
                      setIcon3(globalDesign.secondary);
                    }}
                    name="emoticon-neutral-outline"
                    size={48}
                    color={icon3}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault();
                      setIcon4(globalDesign.secondary);
                    }}
                    name="emoticon-happy-outline"
                    size={48}
                    color={icon4}
                  />
                  <MaterialCommunityIcons
                    onPress={() => {
                      setIconsToDefault();
                      setIcon5(globalDesign.secondary);
                    }}
                    name="emoticon-excited-outline"
                    size={48}
                    color={icon5}
                  />
                </View>
              </View>
            </Card>

            <View style={globalStyles.inputView}>
              <Text style={globalStyles.subTextDark}>Notes: </Text>
              <TextInput
                style={globalStyles.inputPrimary}
                onChangeText={(val) => setNotes(val)}
                value={notes}
              />
            </View>
            <View style={globalStyles.inputView}>
              <Text style={globalStyles.subTextDark}>Category: </Text>
              <TextInput
                style={globalStyles.inputPrimary}
                onChangeText={(val) => setCategory(val)}
                value={category}
              />
            </View>
            <Flatbutton
              text="Save"
              onPress={savePress}
              backgroundColor={globalDesign.primary}
              color={globalDesign.light}
              width={globalDesign.width * 0.9}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  banner: {
    margin: 5,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: globalDesign.secondary,
    width: globalDesign.width * 0.4,
  },
  bannerText: {
    color: globalDesign.light,
    fontFamily: "DMSans-regular",
    fontSize: 18,
    textAlign: "center",
  },
  reviewSubtitle: {
    fontFamily: "DMSans-regular",
    color: globalDesign.dark,
    fontSize: 16,
  },
  reviewTitle: {
    fontFamily: "DMSans-bold",
    color: globalDesign.dark,
    fontSize: 24,
    flex: 1,
  },
  statBox: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 4,
  },
  statBoxTextContainer: {
    flex: 1,
    padding: 2,
    justifyContent: "space-around",
  },
  statBoxTextHeader: {
    fontFamily: "DMSans-regular",
    color: globalDesign.dark,
    fontSize: 14,
  },
  statBoxTextDynamic: {
    fontFamily: "DMSans-bold",
    color: globalDesign.dark,
    fontSize: 24,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  container: {
    flex: 1,
  },
});
