import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { documentModalRestOuvert } from "../../reducers/document";
import { useSelector } from "react-redux";

export default function VwFicherType(props) {
  // console.log("- dans VwFicherType ");
  const dispatch = useDispatch();
  const documentRedux = useSelector((state) => state.document.value);

  const appuyerCamera = () => {
    // console.log("appuyerCamera");
    dispatch(documentModalRestOuvert());
    props.closeModal();
    props.navigation.navigate("Camera");
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBackground}>
        <View style={styles.vwHaut}>
          <TouchableOpacity
            onPress={props.closeModal}
            style={styles.btnModalFermer}
            activeOpacity={0.8}
          >
            <Text style={styles.textButtonX}>x</Text>
          </TouchableOpacity>
          {/* <Text style={styles.txtTitre}>Ajouter Une Document</Text> */}
          <Text style={styles.textMessage}>Quelle Type</Text>
        </View>
        <View style={styles.vwButonsEnBas}>
          <TouchableOpacity
            onPress={props.closeModal}
            style={styles.btnAjouter}
            activeOpacity={0.8}
          >
            <Text style={styles.btnAjouterText}>Ficher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => appuyerCamera()}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Caméra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  btnModal: {
    display: "flex",
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.3,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  vwHaut: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    // height: Dimensions.get("screen").height * 0.6,
  },
  vwButonsEnBas: {
    flex: 1,
    // backgroundColor: "gray",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  btnAjouter: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width * 0.7,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC", // Blue outline
    backgroundColor: "pink", // White background
    alignItems: "center",
    marginBottom: 30,
  },
  btnAjouterText: {
    fontFamily: "Caveat",
    fontSize: 20,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width * 0.7,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC", // Blue outline
    backgroundColor: "#FFFFFF", // White background
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Caveat",
    fontSize: 20,
  },
});
