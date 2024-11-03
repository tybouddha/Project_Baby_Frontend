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
  // state for visibility of differents modals
  const [modalVisible, setModalVisible] = useState(false); // Modale pour ajouter un rendez-vous.
  const [mamanModalVisible, setMamanModalVisible] = useState(false); // Modale pour les rendez-vous de la maman.
  const [babyModalVisible, setBabyModalVisible] = useState(false); // Modale pour les rendez-vous du bébé.
  const [agendaModalVisible, setAgendaModalVisible] = useState(false); // Modale pour afficher les rendez-vous du jour.
  const [searchModalVisible, setSearchModalVisible] = useState(false); // Modale pour rechercher des rendez-vous.

  //state to stock rdv's info
  const [selectedDate, setSelectedDate] = useState(""); // Date sélectionnée dans le calendrier.
  const [pourQui, setPourQui] = useState(""); // Nom de la personne pour qui le rendez-vous est pris.
  const [practicien, setPracticien] = useState(""); // Nom du praticien.
  const [lieu, setLieu] = useState(""); // Lieu du rendez-vous.
  const [heure, setHeure] = useState(""); // Heure du rendez-vous.
  const [notes, setNotes] = useState(""); // Notes concernant le rendez-vous.
  const [searchInput, setSearchInput] = useState(""); // Champ de saisie pour la recherche.
  const [rendezVous, setRendezVous] = useState({}); // Liste des rendez-vous récupérés.
  const [rendezVousDuJour, setRendezVousDuJour] = useState({}); // Rendez-vous pour la date sélectionnée.
  const [markedDates, setMarkedDates] = useState({}); // Dates marquées dans le calendrier.
  const [filteredRendezVous, setFilteredRendezVous] = useState({}); // Rendez-vous filtrés selon la recherche.

  //recober user's data by store redux
  const user = useSelector((state) => state.user.value);
  const projectToken = user.tokenProject; // recover token project

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

  //function to open and close differents modals
  const openModal = () => setModalVisible(true); // Ouvre la modale pour ajouter un rendez-vous.
  const closeModal = () => setModalVisible(false); // Ferme la modale pour ajouter un rendez-vous.
  const openMamanModal = () => setMamanModalVisible(true); // Ouvre la modale pour les rendez-vous de la maman.
  const closeMamanModal = () => setMamanModalVisible(false); // Ferme la modale pour les rendez-vous de la maman.
  const openBabyModal = () => setBabyModalVisible(true); // Ouvre la modale pour les rendez-vous du bébé.
  const closeBabyModal = () => setBabyModalVisible(false); // Ferme la modale pour les rendez-vous du bébé.
  const openAgendaModal = () => setAgendaModalVisible(true); // Ouvre la modale pour les rendez-vous du jour.
  const closeAgendaModal = () => {
    setAgendaModalVisible(false); // Ferme la modale des rendez-vous.
    setRendezVousDuJour({}); // Réinitialise les rendez-vous du jour.
  };
  const openSearchModal = () => setSearchModalVisible(true); // Ouvre la modale de recherche.
  const closeSearchModal = () => {
    setSearchModalVisible(false); // Ferme la modale de recherche.
    setFilteredRendezVous({}); // Réinitialise les rendez-vous filtrés.
    setSearchInput(""); // Vide le champ de recherche.
    console.log(user); // Affiche les informations de l'utilisateur dans la console.
  };

  // fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`)
  // use Effect to recover rdv at mount
  useEffect(() => {
    fetch(`http://192.168.1.156:3000/rdv/${projectToken}`) // Envoie une requête pour récupérer les rendez-vous.
      .then((response) => response.json()) // Convertit la réponse en JSON.
      .then((data) => {
        if (data.rdv) {
          setRendezVous(data); // Met à jour l'état avec les rendez-vous récupérés.
          initializeMarkedDates(data.rdv); // Initialise les dates marquées avec les rendez-vous récupérés.
        } else {
          setRendezVous({ rdv: [] }); // Réinitialise les rendez-vous si aucun n'est trouvé.
          setMarkedDates({}); // Réinitialise les dates marquées.
        }
      })
      .catch(
        (error) =>
          console.error("Erreur lors de la récupération des données :", error) // Affiche une erreur en cas d'échec.
      );
  }, []); // [] signifie que cela s'exécute uniquement au premier rendu.

  // function to init the marked's appointments by appointments downloaded
  const initializeMarkedDates = (appointments) => {
    const newMarkedDates = {}; // Crée un nouvel objet pour les dates marquées.
    if (appointments && Array.isArray(appointments)) {
      appointments.forEach((appointment) => {
        const date = appointment.date.split("T")[0]; // Normalise la date au format YYYY-MM-DD.
        newMarkedDates[date] = { marked: true, dotColor: "blue" }; // Marque la date avec un point de couleur.
      });
    }
    setMarkedDates(newMarkedDates); // Met à jour l'état avec les nouvelles dates marquées.
  };

  // to select date in calendar
  const handleDayPress = (day) => {
    const dateKey = day.dateString; // Utilise le format YYYY-MM-DD.
    setSelectedDate(dateKey); // Définit la date sélectionnée.

    // Vérifie si des rendez-vous existent à cette date.
    const rendezVousDuJour = rendezVous.rdv.filter(
      (rdv) => rdv.date.split("T")[0] === dateKey // Normalise la date ici.
    );

    if (rendezVousDuJour.length > 0) {
      // S'il y a des rendez-vous, affichez-les dans une modale.
      setRendezVousDuJour(rendezVousDuJour); // Utilise un état pour stocker les RDV du jour.
      setAgendaModalVisible(true); // Ouvre la modale des rendez-vous.
    } else {
      // S'il n'y a pas de rendez-vous, ouvrez la modale pour en ajouter un.
      openModal(); // Appelle la fonction pour ouvrir la modale d'ajout.
    }
  };
  //function to create new appointments
  const handleSubmit = () => {
    const newRdv = {
      pourQui,
      practicien,
      lieu,
      notes,
      date: selectedDate,
      heure,
    };

    // Envoie une requête POST pour ajouter un nouveau rendez-vous.
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRdv),
    })
      .then((response) => response.json()) // Convertit la réponse en JSON.
      .then((data) => {
        if (data.result === true) {
          // Si le rendez-vous a été ajouté avec succès.
          setRendezVous((prevRendezVous) => ({
            ...prevRendezVous,
            rdv: [...(prevRendezVous.rdv || []), newRdv], // Ajoute le nouveau rendez-vous à l'état existant.
          }));
          initializeMarkedDates([...rendezVous.rdv, newRdv]); // Met à jour les dates marquées avec le nouveau rendez-vous.
        }
      })
      .catch((error) => console.error("Erreur lors de la requête :", error)); // Affiche une erreur en cas d'échec.

    closeModal(); // Ferme la modale d'ajout.
    // Réinitialise les champs de saisie.
    setPourQui("");
    setPracticien("");
    setLieu("");
    setNotes("");
    setHeure("");
  };
  //function to search appointment
  const handleSearch = () => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    console.log("Valeur de recherche :", searchInput);

    if (!rendezVous.rdv || !Array.isArray(rendezVous.rdv)) {
      console.error("Données de rendez-vous manquantes ou incorrectes");
      setFilteredRendezVous({});
      return;
    }

    // Structurer les rendez-vous filtrés dans un dictionnaire par date
    const structuredFilteredRdv = {};
    rendezVous.rdv.forEach((rdv) => {
      const dateKey = rdv.date.split("T")[0]; // Normalise la date au format YYYY-MM-DD.

      // Filtrer selon les champs
      const matchesSearch =
        rdv.pourQui.toLowerCase().includes(normalizedSearch) ||
        rdv.practicien.toLowerCase().includes(normalizedSearch) ||
        rdv.lieu.toLowerCase().includes(normalizedSearch) ||
        rdv.notes.toLowerCase().includes(normalizedSearch);

      if (matchesSearch) {
        // Si un rendez-vous correspond à la recherche, l'ajoute à la structure filtrée.
        if (!structuredFilteredRdv[dateKey]) {
          structuredFilteredRdv[dateKey] = []; // Crée une nouvelle entrée pour chaque date unique
        }
        structuredFilteredRdv[dateKey].push(rdv); // Ajoute le rendez-vous à la date correspondante
      }
    });

    console.log("RDV filtrés :", structuredFilteredRdv); // Affiche les rendez-vous filtrés.
    setFilteredRendezVous(structuredFilteredRdv); // Met à jour l'état avec les rendez-vous filtrés.
  };

  return (
    <TemplateView navigation={navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.div_btn}>
          <TouchableOpacity style={styles.btn} onPress={openSearchModal}>
            <Text>Rechercher un rendez-vous</Text>
          </TouchableOpacity>
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
        <Modal visible={searchModalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Rechercher</Text>
              <TextInput
                style={styles.listItem}
                placeholder="Rechercher un rendez-vous"
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
              />
              <ScrollView style={styles.scrollView}>
                {Object.keys(filteredRendezVous).map((date) => (
                  <View key={date} style={styles.listItem}>
                    <Text style={styles.dateText}>{date}</Text>
                    {filteredRendezVous[date].map((rdv, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text>Pour : {rdv.pourQui}</Text>
                        <Text>Praticien : {rdv.practicien}</Text>
                        <Text>Lieu : {rdv.lieu}</Text>
                        <Text>Heure : {rdv.heure}</Text>
                        <Text>Notes : {rdv.notes}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={handleSearch}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>rechercher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeSearchModal}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Nouveau Rendez-vous</Text>
              <Text>Date sélectionnée : {selectedDate}</Text>
              {rendezVous[selectedDate] &&
                rendezVous[selectedDate].length > 0 && (
                  <View>
                    <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                      Rendez-vous existants :
                    </Text>
                    {rendezVous[selectedDate].map((rdv, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text>Pour : {rdv.pourQui}</Text>
                        <Text>Praticien : {rdv.practicien}</Text>
                        <Text>Lieu : {rdv.lieu}</Text>
                        <Text>Heure : {rdv.heure}</Text>
                        <Text>Notes : {rdv.notes}</Text>
                      </View>
                    ))}
                  </View>
                )}
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
                value={heure}
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
              <ScrollView style={styles.scrollView}>
                <Text style={styles.modalTitle}>
                  Rendez-vous pour le {selectedDate}
                </Text>
                {rendezVousDuJour.length > 0 ? (
                  rendezVousDuJour.map((rdv, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text>Pour : {rdv.pourQui}</Text>
                      <Text>Praticien : {rdv.practicien}</Text>
                      <Text>Lieu : {rdv.lieu}</Text>
                      <Text>Heure : {rdv.heure}</Text>
                      <Text>Notes : {rdv.notes}</Text>
                    </View>
                  ))
                ) : (
                  <Text>Aucun rendez-vous trouvé pour cette date.</Text>
                )}
              </ScrollView>
              <Calendar
                onDayPress={handleDayPress}
                style={{ borderRadius: 10, elevation: 4, margin: 40 }}
                minDate={"2024-10-31"}
                maxDate={"2035-12-31"}
                markedDates={markedDates}
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
  searchBar: {
    flex: 1,
    textAlign: "center",
  },
  rdvContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 5,
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
