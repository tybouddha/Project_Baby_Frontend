import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function AgendaScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text>Agenda Screen </Text>
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
