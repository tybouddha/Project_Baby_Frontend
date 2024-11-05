import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ScrollView,
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
  const userRedux = useSelector((state) => state.user.value);
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();

  const [modalAjouterDocumentVisible, setmodalAjouterDocumentVisible] =
    useState(documentRedux);
  const [documentsDonnes, setdocumentsDonnes] = useState([]);

  const appuyerAjouterDocument = () => {
    // console.log(`appuyerAjouterDocument`);
    setmodalAjouterDocumentVisible(true);
  };

  const fermerModalVwAjouterDoc = () => {
    // cette fonctionne ferme le VwAjouterDocument
    console.log("🚨 DocumentScreen > fermerModalVwAjouterDoc ");
    setmodalAjouterDocumentVisible(false);
    dispatch(sauvgaurderDocumentInfos({ nom: "", practcien: "", notes: "" }));
    dispatch(supprimerTousLesPhotos());
  };

  const cameraScreenFermerModalSansEffacerRedux = () => {
    console.log("**** shutting down modal ***");
    setmodalAjouterDocumentVisible(false);
  };

  let ajourdhui = new Date();

  const poubelleAppuyee = (elem) => {
    // console.log("Appuyer poubelle");
    console.log(`a le poubelle avec: `);
    console.log(elem);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/document/${elem._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          fetchData();
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
  };

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect ----> useCallback");
      console.log("documentRedux.modalOuvert: ", documentRedux.modalOuvert);
      // Code to run every time the screen comes into focus
      setmodalAjouterDocumentVisible(documentRedux.modalOuvert);
      // Fetch data, reset state, or perform any necessary actions here
    }, [])
  );
  useEffect(() => {
    console.log("useEffect ----> NO callback");
    fetchData();

    setmodalAjouterDocumentVisible(documentRedux.modalOuvert);
  }, []);

  const fetchData = () => {
    console.log("- Mount DocumentScreen.js > useEffect ");
    // console.log(`userRedux.tokenProject: ${userRedux.tokenProject}`);
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/document/${userRedux.tokenProject}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Bien reçu reponse de backen");

        // console.log(data);
        let array = [];
        for (const elem of data.documentsData) {
          array.push(elem);
        }
        setdocumentsDonnes(array);
      });
  };

  const modalAjouterDocument = (
    <Modal
      visible={modalAjouterDocumentVisible}
      animationType="fade"
      transparent={true}
    >
      <VwAjouterDocument
        fermerModal={fermerModalVwAjouterDoc}
        fermerModalSansEffacer={cameraScreenFermerModalSansEffacerRedux}
        navigation={navigation}
        fetchDocumentsData={fetchData}
      />
    </Modal>
  );

  let cardArr = [];
  documentsDonnes.map((elem, index) => {
    const card = (
      <View key={elem._id} style={styles.card}>
        <View style={styles.cardRayon1}>
          <Text style={styles.txtDate}>{elem.dateAjoute.substring(0, 10)}</Text>
          {/* <Text style={styles.txtDate}>Date</Text> */}
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
        <View style={styles.vwInputPhotos}>
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: elem.url[0] }} style={styles.imgElemStyle} />
          </View>
        </View>
      </View>
    );
    cardArr.push(card);
  });

  // const testDocs = () => {
  //   console.log("---- testDocs ----");

  //   documentsDonnes.map((elem, index) => {
  //     console.log("elem.nom: ", elem.nom);
  //     console.log("elem.url: ", elem.url);
  //   });

  //   console.log("---- testDocs END ----");
  // };

  return (
    <TemplateView navigation={navigation}>
      {modalAjouterDocumentVisible ? modalAjouterDocument : null}

      <View style={styles.container}>
        <View style={styles.vwHaut}>
          {/* <Button title="Check Documents" onPress={() => testDocs()} /> */}
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
        <ScrollView>
          <View style={styles.vwBas}>{cardArr}</View>
        </ScrollView>
      </View>
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // width: Dimensions.get("screen").width,
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
  vwInputPhotos: {
    // backgroundColor: "gray",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgElemStyle: {
    // margin: 10,
    width: 100,
    height: 100,
  },
  photoContainer: {
    alignItems: "flex-end",
    margin: 5,
  },
});
