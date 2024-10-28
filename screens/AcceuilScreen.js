import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function AcceuilScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.div_btn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => console.log("btn fonctionnel")}
          >
            <Text>Inviter un proche</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Bienvenue sur BabyProject!</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
        </View>
      </KeyboardAvoidingView>
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

  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    height: 320,
    width: 380,
  },
  title: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  btn: {
    display: "flex",
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
  },
  div_btn: {
    display: "flex,",
  },
});
