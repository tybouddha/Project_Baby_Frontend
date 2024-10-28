import React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function ProjectScreen() {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur BabyProject!</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    heigth: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    height: 350,
  },
});
