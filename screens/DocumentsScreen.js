import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import TemplateView from "./template/TemplateView";
import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";

import FormulaireDate from "./template/EssaiDatePicker";

export default function DocumentsScreen({ navigation }) {
  const pressAddDocument = () => {
    console.log(`pressAddDocument`);
  };

  useEffect(
    () => {
      // <-- que une seul fois, quand le composant arriver

      async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to your storage to browse files.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      };

      console.log("Mount");
    },
    [] //<--- tableaux vide
  );

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        {/* <FormulaireDate style={styles.input} /> */}
        <View style={styles.vwPlusButton}>
          <TouchableOpacity onPress={() => pressAddDocument()}>
            <Image
              source={require("../assets/images/plus.png")}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.vwBottom}>
          <Text>Documents Screen </Text>
        </View>
      </View>
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // justifyContent: "center",
    // height: Dimensions.get("screen").height,
    // backgroundColor: "green",
  },
  vwPlusButton: {
    width: Dimensions.get("screen").width,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  image: {
    height: 50,
    aspectRatio: 1,
  },
  vwBottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // input: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#aaa",
  //   marginVertical: 10,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  // },
});
