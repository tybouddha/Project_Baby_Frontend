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
  TextInput,
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
  documentModalRestOuvert,
  doucumentModalResterFermer,
  sauvgaurderDocumentInfos,
  supprimerTousLesPhotos,
} from "../reducers/document";

export default function DocumentsScreen({ navigation }) {
  const userRedux = useSelector((state) => state.user.value);
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();

  const [modalAjouterDocumentVisible, setmodalAjouterDocumentVisible] =
    useState(false);
  const [documentsDonnes, setdocumentsDonnes] = useState([]);
  const [documentsDonnesInitial, setdocumentsDonnesInitial] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Champ de recherche
  const [searchModalVisible, setSearchModalVisible] = useState("");

  const fermerModalVwAjouterDoc = () => {
    // cette fonctionne ferme le VwAjouterDocument
    // console.log("🚨 DocumentScreen > fermerModalVwAjouterDoc ");
    dispatch(sauvgaurderDocumentInfos({ nom: "", practcien: "", notes: "" }));
    dispatch(supprimerTousLesPhotos());
    dispatch(doucumentModalResterFermer());
  };

  const cameraScreenFermerModalSansEffacerRedux = () => {
    dispatch(doucumentModalResterFermer());
  };

  // let ajourdhui = new Date();

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

  // useFocusEffect(
  //   useCallback(() => {
  //     // console.log("useFocusEffect ----> useCallback");
  //     // console.log("documentRedux.modalOuvert: ", documentRedux.modalOuvert);
  //     // Code to run every time the screen comes into focus

  //     // Fetch data, reset state, or perform any necessary actions here
  //   }, [])
  // );
  useEffect(() => {
    // console.log("useEffect ----> NO callback");
    fetchData();
  }, []);

  const fetchData = () => {
    // console.log("- Mount DocumentScreen.js > useEffect ");
    // console.log(`userRedux.tokenProject: ${userRedux.tokenProject}`);
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/document/${userRedux.tokenProject}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Bien reçu reponse de backen");

        // console.log(data);
        let array = [];
        // console.log(`array.length: ${array.length}`);
        // if (array.length > 0) {
        // console.log(`---> if (array.length >0){`);
        for (const elem of data.documentsData) {
          array.push(elem);
        }
        setdocumentsDonnes(array);
        setdocumentsDonnesInitial(array);
        // }
      });
  };

  const modalAjouterDocument = (
    <Modal
      // visible={modalAjouterDocumentVisible}
      visible={documentRedux.modalOuvert}
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
              <Text style={styles.txtPracticien}>{elem.practicien}</Text>
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

  const searchDocuments = (text) => {
    setSearchInput(text);
    const newDocumentsDonnes = [];
    const normalizedSearch = text.trim().toLowerCase(); // Normalise l'entrée de recherche
    documentsDonnesInitial.forEach((doc) => {
      const matchesSearch =
        doc.nom.toLowerCase().includes(normalizedSearch) ||
        doc.practicien?.toLowerCase().includes(normalizedSearch);

      if (matchesSearch) {
        newDocumentsDonnes.push(doc);
      }
    });
    setdocumentsDonnes(newDocumentsDonnes);
  };

  const searchDocumentModal = (
    <Modal visible={searchModalVisible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Rechercher</Text>

          <View style={styles.vwSearch}>
            <TextInput
              style={styles.listItem}
              placeholder="Rechercher vos documents"
              value={searchInput}
              onChangeText={(text) => searchDocuments(text)}
            ></TextInput>
            <ScrollView style={styles.scrollView}></ScrollView>

            <TouchableOpacity
              onPress={() => console.log("handling search")}
              style={styles.btnModal}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>rechercher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSearchModalVisible(false)}
              style={styles.btnModal}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <TemplateView navigation={navigation}>
      {/* {modalAjouterDocumentVisible ? modalAjouterDocument : null} */}
      {documentRedux.modalOuvert ? modalAjouterDocument : null}
      {searchModalVisible ? searchDocumentModal : null}

      <View style={styles.container}>
        <View style={styles.vwHaut}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setSearchModalVisible(true)}
          >
            <Text>Rechercher un document</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => dispatch(documentModalRestOuvert())}
          >
            <Text>Ajoute un document</Text>
          </TouchableOpacity>
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
    flex: 1,
  },
  vwHaut: {
    display: "flex",
    width: Dimensions.get("screen").width,
    alignItems: "center",
  },
  btn: {
    display: "flex",
    backgroundColor: "white",
    width: 300,
    height: 50,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    margin: 5,
  },
  modalTitle: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalListView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBar: {
    flex: 1,
    textAlign: "center",
  },
  btnModal: {
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 5,
  },
  // input: {
  //   width: 150,
  //   borderBottomColor: "#ec6e5b",
  //   borderBottomWidth: 1,
  //   fontSize: 16,
  // },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
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
