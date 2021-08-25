import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FlatButton from "./button";
import Flatbutton from "../shared/button";
import Review from "../modals/review";
import { globalDesign, globalStyles } from "../shared/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Polyline, Marker } from "react-native-maps";

export default function Item({ item, deleteRun }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState(item.notes);
  const [category, setCategory] = useState(item.category);
  const [title, setTitle] = useState(item.title);
  const [icon1, setIcon1] = useState(item.icon1);
  const [icon2, setIcon2] = useState(item.icon2);
  const [icon3, setIcon3] = useState(item.icon3);
  const [icon4, setIcon4] = useState(item.icon4);
  const [icon5, setIcon5] = useState(item.icon5);

  const onBackPress = () => {
    setNotes(item.notes);
    setCategory(item.category);
    setTitle(item.title);
    setIcon1(item.icon1);
    setIcon2(item.icon2);
    setIcon3(item.icon3);
    setIcon4(item.icon4);
    setIcon5(item.icon5);
    setModalOpen(false);
  };
  const onSavePress = () => {
    item.notes = notes;
    item.category = category;
    item.title = title;
    item.icon1 = icon1;
    item.icon2 = icon2;
    item.icon3 = icon3;
    item.icon4 = icon4;
    item.icon5 = icon5;

    setModalOpen(false);
  };

  const onDeletePress = () => {
    deleteRun(item.key);
    setModalOpen(false);
  };

  function SelectIcon() {
    //round distance as well
    item.distance = Math.round(item.distance * 100) / 100;
    if (icon1 != globalDesign.dark)
      return (
        <MaterialCommunityIcons
          name="emoticon-cry-outline"
          size={48}
          color={globalDesign.secondary}
        />
      );
    else if (icon2 != globalDesign.dark)
      return (
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={48}
          color={globalDesign.secondary}
        />
      );
    else if (icon3 != globalDesign.dark)
      return (
        <MaterialCommunityIcons
          name="emoticon-neutral-outline"
          size={48}
          color={globalDesign.secondary}
        />
      );
    else if (icon4 != globalDesign.dark)
      return (
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={48}
          color={globalDesign.secondary}
        />
      );
    else
      return (
        <MaterialCommunityIcons
          name="emoticon-excited-outline"
          size={48}
          color={globalDesign.secondary}
        />
      );
  }

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <Review
          time={item.time}
          distance={item.distance}
          dateAndTime={item.dateAndTime}
          runPath={item.runPath}
          calories={item.calories}
          avgSpeed={item.avgSpeed}
          backPress={onBackPress}
          savePress={onSavePress}
          deletePress={onDeletePress}
          notes={notes}
          category={category}
          setNotes={setNotes}
          setCategory={setCategory}
          title={title}
          setTitle={setTitle}
          icon1={icon1}
          icon2={icon2}
          icon3={icon3}
          icon4={icon4}
          icon5={icon5}
          setIcon1={setIcon1}
          setIcon2={setIcon2}
          setIcon3={setIcon3}
          setIcon4={setIcon4}
          setIcon5={setIcon5}
        />
      </Modal>

      <TouchableOpacity onLongPress={() => setModalOpen(true)}>
        <View style={styles.card}>
          <View style={globalStyles.paddingHorizontal}>
            <View style={styles.cardHorizonatal}>
              <SelectIcon />
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.reviewSubtitle}>{item.dateAndTime}</Text>
                <Text style={styles.reviewTitle}>{item.title}</Text>
              </View>
              <TouchableOpacity
                style={styles.logo}
                onPress={() => setModalOpen(true)}
              >
                <AntDesign
                  name="infocirlceo"
                  size={24}
                  color={globalDesign.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <MapView
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            style={styles.mapStyle}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={{
              latitude: item.runPath[0].latitude,
              longitude: item.runPath[0].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: item.runPath[0].latitude,
                longitude: item.runPath[0].longitude,
              }}
            />
            <Polyline
              coordinates={item.runPath}
              strokeColor={globalDesign.primary}
              strokeWidth={5}
            />
          </MapView>

          <View style={globalStyles.paddingHorizontal}>
            <View style={globalStyles.horizontalSpaceBetween}>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {item.time}
                  <Text style={styles.subtitle}> m</Text>
                </Text>
                <Text style={styles.subtitle}>Time</Text>
              </View>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {Math.round(item.distance * 100) / 100}
                  <Text style={styles.subtitle}> km</Text>
                </Text>
                <Text style={styles.subtitle}>Distance</Text>
              </View>
              <View style={globalStyles.paddingHorizontal}>
                <Text style={styles.title}>
                  {item.avgSpeed}
                  <Text style={styles.subtitle}> m/km</Text>
                </Text>
                <Text style={styles.subtitle}>Avg Pace</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <View style={styles.card}>
        <View style={styles.cardLeft}>
          <View style={styles.cardHorizonatal}>
            <Text style={styles.modalText}>Time: </Text>
            <Text style={styles.cardText}>{item.time}</Text>
          </View>
          <View style={styles.cardHorizonatal}>
            <Text style={styles.modalText}>Distance: </Text>
            <Text style={styles.cardText}>{item.distance}</Text>
          </View>
          <View style={styles.cardHorizonatal}>
            <Text style={styles.modalText}>Notes: </Text>
            <Text style={styles.cardText}>{item.notes}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <AntDesign name="infocirlceo" size={24} color={dark} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalText: {
    color: globalDesign.dark,
    fontSize: 20,
    fontFamily: "DMSans-bold",
  },
  card: {
    flex: 1,
  },
  cardLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  cardHorizonatal: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  cardText: {
    color: globalDesign.dark,
    fontSize: 18,
    fontFamily: "DMSans-regular",
  },
  infoModalView: {
    padding: 10,
    flexDirection: "row",
  },
  titleView: {
    alignItems: "center",
  },

  reviewTitle: {
    fontFamily: "DMSans-bold",
    color: globalDesign.dark,
    fontSize: 20,
    flex: 1,
  },
  reviewSubtitle: {
    fontFamily: "DMSans-regular",
    color: globalDesign.dark,
    fontSize: 15,
  },
  title: {
    color: globalDesign.secondary,
    fontSize: 18,
    fontFamily: "DMSans-bold",
  },
  subtitle: {
    color: globalDesign.dark,
    fontSize: 12,
    fontFamily: "DMSans-regular",
  },

  mapStyle: {
    flexDirection: "row",
    flex: 1,
    //width: "100%",
    height: 150,
    marginVertical: 10,
  },
  logo: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
});
