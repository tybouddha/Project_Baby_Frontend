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
  ScrollView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import HeaderView from "./NavComposants/Header";

export default function AgendaScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);

  const [date, setDate] = useState("");
  const [pourQui, setPourQui] = useState("");
  const [practicien, setPracticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [notes, setNotes] = useState("");

  const mamanRendezVousList = [
    "1er trimestre : Prendre rendez-vous pour confirmer la grossesse.",
    "Déclarer la grossesse à la Caf et à l'assurance maladie.",
    "Planifier la 1ère échographie.",
    "Bilan prénatal de prévention.",
    "2ème trimestre : Planifier le 2ème examen prénatal.",
    "Planifier l'entretien prénatal précoce.",
    "3ème trimestre : Rendez-vous avec l'anesthésiste.",
    "Déclarer la naissance de l'enfant.",
    "Planifier les premiers examens de santé.",
    "Consultation postnatale et rééducation périnéale.",
  ];

  const babyRendezVousList = [
    "Dans les 8 jours suivant la naissance",
    "Au cours de la 2ème semaine",
    "Avant la fin du 1er mois",
    "1 mois",
    "2 mois",
    "3 mois",
    "4 mois",
    "5 mois",
    "8 mois",
    "11 mois",
    "12 mois",
    "Entre 16 et 18 mois",
    "Entre 23 et 24 mois",
    "2 ans",
    "3 ans",
    "4 ans",
    "5 ans",
    "Entre 8 et 9 ans",
    "Entre 11 et 13 ans",
    "Entre 15 et 16 ans",
  ];

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openListModal = () => setListModalVisible(true);
  const closeListModal = () => setListModalVisible(false);
  const openMamanModal = () => setMamanModalVisible(true);
  const closeMamanModal = () => setMamanModalVisible(false);

  const handleSubmit = () => {
    // Simulation d'enregistrement
    closeModal();
    setDate("");
    setPourQui("");
    setPracticien("");
    setLieu("");
    setNotes("");
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
          <TouchableOpacity style={styles.btn} onPress={openListModal}>
            <Text>Voir les Baby rendez-vous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={openMamanModal}>
            <Text>Voir les Maman rendez-vous</Text>
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

        <Modal visible={listModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Maman rendez-vous</Text>
              <ScrollView style={styles.scrollView}>
                {mamanRendezVousList.map((rdv, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>{rdv}</Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={closeListModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={mamanModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Baby rendez-vous</Text>
              <ScrollView style={styles.scrollView}>
                {babyRendezVousList.map((rdv, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>{rdv}</Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={closeMamanModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  scrollView: {
    width: "100%",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  input: {
    width: 150,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
