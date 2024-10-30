import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import TemplateViewNoNav from "../template/TemplateViewNoNav";
import { useState, useEffect } from "react";
import DatePickerComposant from "../template/DatePickerComposant";

export default function CreerProjetScreen({ navigation }) {
  console.log("CreerProjetScreen");
  const [username, usernameSetter] = useState("");
  const [prenom, prenomSetter] = useState("");
  const [nomDeFamille, nomDeFamilleSetter] = useState("");
  const [dateDeMenstru, dateDeMenstruSetter] = useState(new Date());
  const [dateDeGrossess, dateDeGrossessSetter] = useState("");
  const [email, emailSetter] = useState("");
  const [password, passwordSetter] = useState("");
  const [envoyerData, envoyerDataSetter] = useState(false);

  const chopperDateDeMenstru = (datePickerDate) => {
    console.log(`date reçu: ${datePickerDate}`);
    dateDeMenstruSetter(datePickerDate);
  };

  const chopperDateDeGrossess = (datePickerDate) => {
    console.log(`date reçu: ${datePickerDate}`);
    dateDeGrossessSetter(datePickerDate);
  };

  const pressedCreerProjet = () => {
    console.log("- aller à LoginScreen 📢");
    console.log(`dateDeMenstru: ${dateDeMenstru}`);
    console.log(`dateDeGrossess: ${dateDeGrossess}`);
  };

  useEffect(
    () => {
      // <-- que une seul fois, quand le composant arriver
      console.log("-Mount 📌");

      // fetch('http://192.168.100.47/', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      // })
    },
    [] //<--- tableaux vide
  );

  const creerProjectScreenView = (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentView}>
          <View style={styles.vwInstructions}>
            <Text style={styles.txtInstructions}>Créez votre compte</Text>
          </View>

          <View style={styles.vwInput}>
            <TextInput
              style={styles.txtInput}
              onChangeText={(value) => usernameSetter(value)}
              placeholder="Username"
              placeholderTextColor="#555555" // Dark gray color for the placeholder
              value={username}
            />
          </View>

          <View style={styles.vwInput}>
            <TextInput
              style={styles.txtInput}
              onChangeText={(value) => prenomSetter(value)}
              placeholder="Prénom"
              placeholderTextColor="#555555" // Dark gray color for the placeholder
              value={prenom}
            />
          </View>

          <View style={styles.vwInput}>
            <TextInput
              style={styles.txtInput}
              onChangeText={(value) => nomDeFamilleSetter(value)}
              placeholder="Nom De Famille"
              placeholderTextColor="#555555" // Dark gray color for the placeholder
              value={nomDeFamille}
            />
          </View>

          {/* Ici Date De dernieres Menstruation */}
          <View style={styles.vwInputDatePicker}>
            <DatePickerComposant
              style={styles.datePickerStyle}
              btnText={"Date de Menstruation"}
              chopperDate={chopperDateDeMenstru}
            />
          </View>

          <View style={styles.vwInputDatePicker}>
            <DatePickerComposant
              style={styles.datePickerStyle}
              btnText={"Date de Grossess"}
              chopperDate={chopperDateDeGrossess}
            />
          </View>

          <View style={styles.vwInput}>
            <TextInput
              style={styles.txtInput}
              onChangeText={(value) => emailSetter(value)}
              placeholder="Email"
              placeholderTextColor="#555555" // Dark gray color for the placeholder
              value={email}
            />
          </View>

          <View style={styles.vwInput}>
            <TextInput
              style={styles.txtInput}
              onChangeText={(value) => passwordSetter(value)}
              placeholder="Password"
              placeholderTextColor="#555555" // Dark gray color for the placeholder
              value={password}
            />
          </View>

          <View style={styles.vwBtn}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => pressedCreerProjet()}
            >
              <Text style={styles.btnText}>Créer Projet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  return (
    <TemplateViewNoNav
      view={creerProjectScreenView}
      navigation={navigation}
      afficherArriére={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    height: Dimensions.get("screen").height * 1.25,
    alignItems: "center",
  },
  vwInstructions: {
    padding: 20,
  },
  txtInstructions: {
    fontSize: 24,
  },
  vwInput: {
    display: "flex",
    width: Dimensions.get("screen").width * 0.8, // Full screen width
    paddingHorizontal: "10%", // Align content centrally
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#007ACC", // Blue outline
    margin: 5,
  },
  vwInputDatePicker: {
    display: "flex",
    width: Dimensions.get("screen").width * 0.8, // Full screen width
    paddingHorizontal: "10%", // Align content centrally
    // height: 100,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#007ACC", // Blue outline
    margin: 5,
  },
  txtInput: {
    width: "100%", // 80% of parent (vwInput)
    height: "100%", // Ensure the TextInput fills its container
    padding: 10,
    fontSize: 16,
  },
  vwBtn: {
    display: "flex",
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC", // Blue outline
    backgroundColor: "#FFFFFF", // White background
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Caveat",
    fontSize: 30,
  },
});
