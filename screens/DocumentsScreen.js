import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import TemplateView from "./template/TemplateView";
// import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import VwAjouterDocument from "./template/VwAjouterDocument";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sauvgaurderDocumentInfos,
  supprimerTousLesPhotos,
} from "../reducers/document";

export default function DocumentsScreen({ navigation }) {
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();

  const [modalAjouterDocumentVisible, setmodalAjouterDocumentVisible] =
    useState(documentRedux);
  const appuyerAjouterDocument = () => {
    // console.log(`appuyerAjouterDocument`);
    setmodalAjouterDocumentVisible(true);
  };

  const fermerModal = () => {
    // cette fonctionne ferme le VwAjouterDocument
    setmodalAjouterDocumentVisible(false);
    dispatch(sauvgaurderDocumentInfos({ nom: "", practcien: "", notes: "" }));
    dispatch(supprimerTousLesPhotos());
  };

  let ajourdhui = new Date();
  const fauxDonnes = [
    {
      _id: "1",
      url: "https://",
      nom: "maman",
      practcien: "gyno",
      date: ajourdhui,
      notes: "Un chasseur sachant chasser sans son chien est un bon chasseur.",
    },
    {
      _id: "2",
      url: "https://",
      nom: "bébe",
      practcien: "pediatrician",
      // date: ajourdhui.setDate(ajourdhui - 1),
      date: ajourdhui,
      notes:
        "Les chaussettes de l’archiduchesse sont-elles sèches ou archi-sèches?",
    },
  ];

  const poubelleAppuyee = (elem) => {
    // console.log("Appuyer poubelle");
    console.log(elem);
  };

  useFocusEffect(
    useCallback(() => {
      // Code to run every time the screen comes into focus
      // console.log("DocumentScreen is now in focus");
      setmodalAjouterDocumentVisible(documentRedux.modalOuvert);
      // Fetch data, reset state, or perform any necessary actions here

      // return () => {
      //   // Optional cleanup when the screen loses focus
      //   console.log("DocumentScreen is out of focus");
      // };
    }, [])
  );

  const modalAjouterDocument = (
    <Modal
      visible={modalAjouterDocumentVisible}
      animationType="fade"
      transparent={true}
    >
      <VwAjouterDocument closeModal={fermerModal} navigation={navigation} />
    </Modal>
  );

  let cardArr = [];
  fauxDonnes.map((elem, index) => {
    const card = (
      <View key={elem._id} style={styles.card}>
        <View style={styles.cardRayon1}>
          <Text style={styles.txtDate}>{elem.date.toLocaleDateString()}</Text>
        </View>
        <View style={styles.cardRayon2}>
          <View style={styles.cardRayon2Sous}>
            <View style={styles.cardRayon2SousPracticien}>
              <Text style={styles.txtLabel}>Practicien: </Text>
              <Text style={styles.txtPracticien}>{elem.practcien}</Text>
            </View>
            <View style={styles.cardRayon2SousPracticien}>
              <Text style={styles.txtLabel}>Pour qui: </Text>
              <Text style={styles.txtNom}>{elem.nom}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.touchPoubelle}
            onPress={() => poubelleAppuyee(elem)}
          >
            <FontAwesome name={"trash"} size={30} color={"red"} />
          </TouchableOpacity>
        </View>

        <Text style={styles.txtNotes}>{elem.notes}</Text>
      </View>
    );
    cardArr.push(card);
  });

  return (
    <TemplateView navigation={navigation}>
      {modalAjouterDocumentVisible ? modalAjouterDocument : null}
      <View style={styles.container}>
        <View style={styles.vwHaut}>
          <View style={styles.vwTitre}>
            <Text style={styles.txtTitre}>Documents </Text>
          </View>

          <View style={styles.vwPlusButton}>
            <TouchableOpacity onPress={() => appuyerAjouterDocument()}>
              <Image
                source={require("../assets/images/plus.png")}
                resizeMode="contain"
                style={styles.imageButon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.vwBas}>{cardArr}</View>
      </View>
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  vwHaut: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    alignItems: "center", // Move this here
    justifyContent: "flex-end",
    // backgroundColor: "gray",
  },
  vwTitre: {
    position: "absolute", // Absolute positioning to take up the full width
    left: 0,
    right: 0,
    alignItems: "center", // Center text within vwTitre
  },
  txtTitre: {
    fontSize: 25,
    fontWeight: "bold",
  },
  vwPlusButton: {
    width: Dimensions.get("screen").width * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButon: {
    height: 50,
    aspectRatio: 1,
  },

  vwBas: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#fff", // Background color for the row
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    width: Dimensions.get("screen").width * 0.8,
    // Shadow for Android
    elevation: 7,
  },
  cardRayon1: {
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  txtDate: {
    color: "gray",
  },
  cardRayon2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRayon2Sous: {},
  cardRayon2SousPracticien: {
    display: "flex",
    flexDirection: "row",
  },
  txtLabel: {
    fontWeight: "bold",
  },
});
