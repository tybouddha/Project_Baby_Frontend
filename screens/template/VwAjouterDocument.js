import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import VwFicherType from "./VwFicherType";

export default function VwAjouterDocument(props) {
  //   console.log("- dans vwAjouterTypeDocument ");
  const [nom, setNom] = useState("");
  const [praticien, setPraticien] = useState("");
  const [notes, setNotes] = useState("");
  const [modalFicherTypeVisible, setModalFicherTypeVisible] = useState(false);
  const fermerModal = () => setModalFicherTypeVisible(false);

  const modalFicher = (
    <Modal
      visible={modalFicherTypeVisible}
      animationType="fade"
      transparent={true}
    >
      <VwFicherType closeModal={fermerModal} />
    </Modal>
  );

  const appuyerFicherType = () => {
    console.log("appuyerFicherType");
    setModalFicherTypeVisible(true);
  };

  const appuyerSoumettre = () => {
    console.log("appuyerSoumettre");
  };

  return (
    <View style={styles.modalOverlay}>
      {modalFicherTypeVisible ? modalFicher : null}
      <View style={styles.modalBackground}>
        <View style={styles.vwHaut}>
          <TouchableOpacity
            onPress={props.closeModal}
            style={styles.btnModalFermer}
            activeOpacity={0.8}
          >
            <Text style={styles.textButtonX}>x</Text>
          </TouchableOpacity>
          <Text style={styles.txtTitre}>Ajouter Une Document</Text>
        </View>

        <View style={styles.vwAuMileu}>
          <View style={styles.vwInputSuper}>
            <View style={styles.vwInput}>
              <TextInput
                style={styles.txtInput}
                onChangeText={(value) => setNom(value)}
                placeholder="Nom"
                placeholderTextColor="#555555" // Dark gray color for the placeholder
                value={nom}
              />
            </View>
          </View>

          <View style={styles.vwInputSuper}>
            <View style={styles.vwInput}>
              <TextInput
                style={styles.txtInput}
                onChangeText={(value) => setPraticien(value)}
                placeholder="Praticien"
                placeholderTextColor="#555555" // Dark gray color for the placeholder
                value={praticien}
              />
            </View>
          </View>
          <View style={styles.vwInputSuperNotes}>
            <View style={styles.vwInputNotes}>
              <TextInput
                style={styles.txtInputNotes}
                onChangeText={(value) => setNotes(value)}
                placeholder="Notes"
                placeholderTextColor="#555555" // Dark gray color for the placeholder
                value={notes}
                multiline={true}
                numberOfLines={4} // Initial visible lines
                textAlignVertical="top" // Aligns text at the top of the input field
              />
            </View>
          </View>
        </View>
        <View style={styles.vwButonsEnBas}>
          <TouchableOpacity
            onPress={() => appuyerFicherType()}
            style={styles.btnAjouter}
            activeOpacity={0.8}
          >
            <Text style={styles.btnAjouterText}>Image / Ficher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => appuyerSoumettre()}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Soumettre</Text>
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

  modalBackground: {
    // justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.6,
    backgroundColor: "white",
    borderRadius: 12,
    // padding: 30,
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
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
    // height: Dimensions.get("screen").height,
  },
  txtTitre: {
    fontSize: 23,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    paddingBottom: 20,
  },

  btnModal: {
    display: "flex",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderColor: "pink",
    borderRadius: 12,
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnModalFermer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  textButtonX: {
    fontSize: 20,
    fontWeight: "700",
  },
  vwHaut: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    // height: Dimensions.get("screen").height * 0.6,
  },
  vwAuMileu: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    // height: Dimensions.get("screen").height * 0.6,
  },
  vwInputSuper: {
    display: "flex",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  vwInput: {
    display: "flex",
    //width: Dimensions.get("screen").width * 0.8, // Full screen width
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#007ACC", // Blue outline
    margin: 5,
  },
  txtInput: {
    // width: "100%",
    height: "100%",
    padding: 10,
    fontSize: 16,
  },
  vwInputSuperNotes: {
    display: "flex",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  vwInputNotes: {
    // display: "flex",
    // //width: Dimensions.get("screen").width * 0.8, // Full screen width
    width: "80%",
    // height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#007ACC", // Blue outline
    // margin: 5,
    // // height: "300%",
  },
  txtInputNotes: {
    // // width: "100%",
    // height: "300%",
    padding: 10,
    // fontSize: 16,
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
