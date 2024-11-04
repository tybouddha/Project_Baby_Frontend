import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HeaderView from "./NavComposants/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AcceuilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const projectToken = user.tokenProject;
  //hook for update the modal and open the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [role, setrole] = useState("lecteur");
  const [textrole, settextrole] = useState("attribuer accès");
  const [markedDates, setMarkedDates] = useState({}); // Dates marquées sur le calendrier
  const [idArray, setIdArray] = useState([]); // L'id du rendez-vous
  const [rendezVous, setRendezVous] = useState({ rdv: [] }); // Liste des rendez-vous récupérés
  const handleSubmit = () => {
    setModalVisible(true);
    console.log("btn fonctionnel");
    console.log(projectToken);
    console.log(user);
  };
  // useEffect to recover data at mount of component
  useEffect(() => {
    if (projectToken) {
      fetch(
        // Fait une requête pour récupérer les rendez-vous de l'utilisateur
        `${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`
      )
        // fetch(`http://192.168.1.156:3000/rdv/${projectToken}`)
        .then((response) => response.json()) // Transforme la réponse en JSON
        .then((data) => {
          if (data.rdv) {
            for (const elem of data.rdv) {
              setIdArray([...idArray, elem._id]);
            }
            // Si des rendez-vous sont trouvés
            setRendezVous({ rdv: data.rdv }); // Stocke les rendez-vous récupérés
            initializeMarkedDates(data.rdv);

            // Initialise les dates marquées avec les rendez-vous récupérés
          } else {
            setRendezVous({ rdv: [] }); // Sinon, définit les rendez-vous comme vide
            setMarkedDates({}); // Réinitialise les dates marquées
          }
        })
        .catch(
          (
            error // Gère les erreurs de requête
          ) =>
            console.error("Erreur lors de la récupération des données :", error)
        );
    }
  }, [projectToken]);

  const initializeMarkedDates = (appointments) => {
    const newMarkedDates = {};
    if (Array.isArray(appointments)) {
      for (const appointment of appointments) {
        const date = appointment.date.split("T")[0];
        newMarkedDates[date] = { marked: true, dotColor: "blue" };
      }
    }
    setMarkedDates(newMarkedDates);
  };

  //function for set and choose the acces for invite
  const toggleSwitch = () => {
    setrole(role === "lecteur" ? "editeur" : "lecteur");
    if (role === "lecteur") {
      settextrole("lecteur");
    } else {
      settextrole("editeur");
    }
    console.log(role);
  };

  // const generateCode = () => {
  //   const bodyObj = {
  //     token: projectToken,
  //     role: role,
  //   };
  //   if (bodyObj)
  //     fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/invite`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(bodyObj),
  //     })
  //       .then((response) => response.json())
  //       .then((inviteLink) => {
  //         console.log("test1", inviteLink);
  //       });

  //   console.log("123456");
  // };
  //function to get the page for guide
  const directionalimentation = () => {
    console.log("switch vers la page guide alimentation");
  };
  const handleClose = () => {
    setModalVisible(false);
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
        <Text style={styles.title}>Bienvenue {username} sur BabyProject!</Text>
        <View style={styles.div_btn}>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text>Inviter un proche</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="code d'invitation"
                // value={inviteLink}
                style={styles.input}
              />
              <Text style={styles.textrole}>{textrole}</Text>
              <Switch
                style={styles.toggle}
                thumbColor={role === "lecteur" ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="black"
                onValueChange={toggleSwitch}
                onToggle={(role) => toggleSwitch()}
                value={role === "lecteur"}
              />
              <TouchableOpacity
                onPress={() => generateCode()}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>envoyer code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleClose()}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <Text style={styles.title}>Voici votre calendrier actualisé!</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            minDate={"2024-10-31"}
            maxDate={"2035-12-31"}
            markedDates={markedDates}
          />
        </View>
        <TouchableOpacity
          style={styles.alimentationBTN}
          onPress={() => directionalimentation()}
        >
          <Text>Conseils Alimentation</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    heigth: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },

  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    height: 320,
    width: 380,
    marginBottom: 100,
    margin: "auto",
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  btn: {
    display: "flex",
    backgroundColor: "white",
    borderWidth: 1,
    width: 120,
    height: 30,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    margin: 5,
  },
  div_btn: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    width: Dimensions.get("screen").width,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  toggle: {
    display: "flex",
    width: 120,
    marginTop: 10,
    justifyContent: "center",
  },
  alimentationBTN: {
    display: "flex",
    fontSize: 20,
    height: 50,
    width: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    margin: "auto",
    borderRadius: 20,
    // borderWidth: 1,
  },
  textrole: {
    fontSize: 20,
  },
});
