import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Flatbutton from "../shared/button";
import { globalStyles, globalDesign } from "../shared/globalStyles";
import Start from "../modals/start";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";

export default function StartRun({ navigation }) {
  const [startModal, setStartModal] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [seconds, setSeconds] = useState(0);
  const handlePress = () => {
    if (location.latitude != 0) {
      setIsActive(false);
      setStartModal(true);
    }
  };
  const navigateToFeed = () => {
    setIsActive(false);
    navigation.navigate("Feed");
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});

        let tempCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setLocation(tempCoord);
        setRegion({
          latitude: tempCoord.latitude,
          longitude: tempCoord.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      })();
    }
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <View style={globalStyles.containerLight}>
      <MapView
        style={globalStyles.mapStyle}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        region={region}
        provider={MapView.PROVIDER_GOOGLE}
      >
        <Marker coordinate={location}>
          <Image
            source={require("../assets/ping.gif")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
        <AntDesign
          onPress={handlePress}
          style={{ padding: 5 }}
          name="pluscircle"
          size={56}
          color={globalDesign.secondary}
        />
      </MapView>
      <SafeAreaView>
        <Modal visible={startModal} animationType="fade">
          <Start
            setStartModal={setStartModal}
            addRun={navigation.state.params.addRun}
            navigation={navigation}
          />
        </Modal>
      </SafeAreaView>
      <View style={globalStyles.footer}>
        <View style={globalStyles.horizontalSpaceAroundFlex}>
          <TouchableOpacity style={globalStyles.center}>
            <MaterialIcons
              name="location-on"
              size={38}
              color={globalDesign.secondary}
            />
            <Text style={globalStyles.footerTextSecondary}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.center}
            onPress={navigateToFeed}
          >
            <MaterialIcons
              name="playlist-add-check"
              size={38}
              color={globalDesign.light}
            />
            <Text style={globalStyles.footerTextLight}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.center}
            onPress={() => firebase.auth().signOut()}
          >
            <MaterialIcons name="logout" size={30} color={globalDesign.light} />
            <Text style={globalStyles.footerTextLight}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
