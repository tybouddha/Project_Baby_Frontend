import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import React, { useState } from "react";

export default function AgendaScreen() {
  const [items, setItems] = useState({
    "2024-04-29": [{ name: "Meeting with client", time: "10:00 AM" }],
    "2024-04-30": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
      { name: "Project presentation", time: "5:00 PM" },
    ],
    "2024-05-01": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
    "2024-05-02": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
  });
  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No events for this day</Text>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            marginTop: 30,
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <View
            style={{
              marginVertical: 10,
              marginTop: 30,
              backgroundColor: "white",
              marginHorizontal: 10,
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{items.name}</Text>
            <Text>{items.time}</Text>
          </View>
          <Agenda items={items} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    heigth: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },

  // container: {

  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
