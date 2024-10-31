import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Agenda } from "react-native-calendars";
import HeaderView from "./NavComposants/Header";

export default function AgendaScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState("");
  const [pourQui, setPourQui] = useState("");
  const [practicien, setPracticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [notes, setNotes] = useState("");

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  const handleSubmit = () => {
    fetch("http://192.168.100.144:3000/rdv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        pourQui,
        practicien,
        lieu,
        notes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          console.log("Youpi !");
          closeModal();
          setDate("");
          setPourQui("");
          setPracticien("");
          setLieu("");
          setNotes("");
        } else {
          console.log("Moins youpi...");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données :", error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <HeaderView navigation={navigation} />
        </View>

        <View style={styles.div_btn}>
          <TouchableOpacity style={styles.btn} onPress={openModal}>
            <Text>Ajouter un rendez-vous</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Nouveau Rendez-vous</Text>

              <TextInput
                placeholder="Date"
                style={styles.input}
                value={date}
                onChangeText={(text) => setDate(text)}
              />
              <TextInput
                placeholder="Pour Qui"
                style={styles.input}
                value={pourQui}
                onChangeText={(text) => setPourQui(text)}
              />
              <TextInput
                placeholder="Praticien"
                style={styles.input}
                value={practicien}
                onChangeText={(text) => setPracticien(text)}
              />
              <TextInput
                placeholder="Lieu"
                style={styles.input}
                value={lieu}
                onChangeText={(text) => setLieu(text)}
              />
              <TextInput
                placeholder="Notes"
                style={styles.input}
                value={notes}
                onChangeText={(text) => setNotes(text)}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Text style={styles.title}>Bienvenue sur ProjectBaby!</Text>
          <Agenda
            style={styles.agenda}
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
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    width: Dimensions.get("screen").width,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  agenda: {
    borderWidth: 1,
    borderColor: "gray",
    height: 320,
    width: 380,
    marginBottom: 100,
    margin: "auto",
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  div_btn: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 10,
  },
  modalView: {
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  input: {
    width: 150,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  textButton: {
    color: "#ffffff",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
  textrole: {
    fontSize: 20,
  },
});
