import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TemplateView from "./template/TemplateView";

export default function AgendaScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);
  const [babyModalVisible, setBabyModalVisible] = useState(false);
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [pourQui, setPourQui] = useState("");
  const [practicien, setPracticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [heure, setHeure] = useState("");
  const [notes, setNotes] = useState("");
  const [rendezVous, setRendezVous] = useState({});
  const projectToken = useSelector((state) => state.user.value.projectId);

  const mamanRendezVousList = [
    "1er trimestre : Prendre rendez-vous avec un médecin généraliste, gynécologue ou sage-femme pour confirmer la grossesse.",
    "Déclarer la grossesse à la Caf et à l'assurance maladie.",
    "Planifier la 1ère échographie.",
    "Bilan prénatal de prévention avec une sage-femme pour les habitudes de vie.",
    "2ème trimestre : Planifier le 2ème examen prénatal.",
    "Planifier l'entretien prénatal précoce avec sage-femme ou médecin.",
    "3ème trimestre : Prévoir le rendez-vous avec l'anesthésiste.",
    "Déclarer la naissance à l'état civil dans les 5 jours suivant l'accouchement.",
    "Planifier les premiers examens de santé du bébé.",
    "Consulter une sage-femme pour un suivi postnatal.",
    "Prévoir la rééducation périnéale et abdominale.",
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
  const openMamanModal = () => setMamanModalVisible(true);
  const closeMamanModal = () => setMamanModalVisible(false);
  const openBabyModal = () => setBabyModalVisible(true);
  const closeBabyModal = () => setBabyModalVisible(false);
  const openAgendaModal = () => setAgendaModalVisible(true);
  const closeAgendaModal = () => setAgendaModalVisible(false);
  useEffect(() => {
    fetch(`http://192.168.100.149:3000/rdv/${projectToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setRendezVous(data);
        } else {
          res.json({ result: false, error: "no data" });
        }
      });
  });

  // to select date in calendar
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    openModal();
  };

  const handleSubmit = () => {
    const newRdv = {
      pourQui,
      practicien,
      lieu,
      notes,
      heure,
    };

    // add rdv to date
    setRendezVous((prevRendezVous) => ({
      ...prevRendezVous,
      [selectedDate]: [{ ...newRdv }],
    }));

    closeModal();
    setPourQui("");
    setPracticien("");
    setLieu("");
    setNotes("");
  };

  return (
    <TemplateView navigation={navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.div_btn}>
          <TouchableOpacity style={styles.btn} onPress={openAgendaModal}>
            <Text>Voir agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={openBabyModal}>
            <Text>Voir les baby rendez-vous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={openMamanModal}>
            <Text>Voir les maman rendez-vous</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Nouveau Rendez-vous</Text>
              <Text>Date sélectionnée : {selectedDate}</Text>
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
                placeholder="Heure"
                style={styles.input}
                value={notes}
                onChangeText={(text) => setHeure(text)}
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
        <Modal visible={mamanModalVisible} animationType="slide" transparent>
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
                onPress={closeMamanModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={babyModalVisible} animationType="slide" transparent>
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
                onPress={closeBabyModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={agendaModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Agenda</Text>
              <Calendar
                onDayPress={handleDayPress}
                style={{ borderRadius: 10, elevation: 4, margin: 40 }}
                minDate={"2024-10-31"}
                maxDate={"2035-12-31"}
              />
              <TouchableOpacity
                onPress={closeAgendaModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TemplateView>
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
  containerAgenda: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  div_btn: {
    display: "flex",
    width: 300,
    height: 500,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "space-around",
    margin: 30,
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
  modalTitle: {
    fontSize: 20,
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
