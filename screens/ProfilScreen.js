import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import TemplateView from "./template/TemplateView";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/user";

export default function Profil({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const token = user.token;

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [password3, setpassword3] = useState("");
  const [grossesse, setgrossesse] = useState("");
  const [menstruation, setmenstruation] = useState("");
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setusername(data.user.username);
          setemail(data.user.email);
          setgrossesse(data.user.dateDebutGrossesse);
          setmenstruation(data.user.derniereMenstruation);
        } else {
          res.json({ result: false, error: "no data" });
        }
      });
  };
  // const saveUpdate = () => {
  //   console.log("click detected");
  //   if (!emailRegExp.test(email)) {
  //     return console.log("Format d'email invalide.");
  //   }
  // };

  const handleUpdate = (rdvId) => {
    console.log("ID du rendez-vous à mettre à jour :", rdvId);
    // Création d'un objet représentant le rendez-vous mis à jour avec les nouvelles informations

    const updatedUser = {
      username: username, // Nom utilisateur
      email: email, // Email
      derniereMenstruation: menstruation, // Derbière menstruation
      dateDebutGrossesse: grossesse, // Date de début de grossesse
    };

    console.log(updatedRdv);

    // Fait une requête PUT pour mettre à jour le rendez-vous avec les nouvelles informations
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}/${rdvId}`,
      // fetch(`http://192.168.1.156:3000/rdv/${projectToken}/${rdvId}`,
      {
        method: "PUT", // Spécifie la méthode PUT pour la mise à jour
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser), // Convertit l'objet updatedUser en JSON pour l'envoyer
      }
    )
      .then((response) => response.json()) // Convertit la réponse en JSON
      .then((data) => {
        // Vérifie si la mise à jour a été réussie
        if (data.result === true) {
        }
        // Met à jour l'état des rendez-vous en remplaçant l'ancien par le nouveau rendez-vous mis à jour
        fetchData();
        closeModifierModal();
      })
      .catch((error) =>
        // Affiche un message d'erreur en cas de problème lors de la mise à jour
        console.error("Erreur lors de la mise à jour :", error)
      );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("Welcome");
  };

  return (
    <TemplateView navigation={navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Text>Nom utilisateur</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={username}
              onChangeText={(value) => setusername(value)}
              value={username}
            />
          </View>
          <Text>Email</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={email}
              onChangeText={(value) => setemail(value)}
              value={email}
            />
          </View>
          <Text> Ancien mot de Passe</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={"..."}
              onChangeText={(value) => setpassword(value)}
              value={password}
            />
          </View>
          <Text>Nouveau mot de passe</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={"..."}
              onChangeText={(value) => setpassword2(value)}
              value={password2}
            />
          </View>
          <Text>Confirmer nouveau mot de passe</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={"..."}
              onChangeText={(value) => setpassword3(value)}
              value={password3}
            />
          </View>
          <Text>Date de grossesse</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={grossesse}
              onChangeText={(value) => setgrossesse(value)}
              value={grossesse}
            />
          </View>
          <Text>Date de dernière menstruation</Text>
          <View style={styles.input}>
            <TextInput
              placeholder={menstruation}
              onChangeText={(value) => setmenstruation(value)}
              value={menstruation}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.btn}>
              <Text>Modifier accès compte invité</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.btn} onPress={() => saveUpdate()}>
              <Text>Enregistré modification</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btn} onPress={}>
          <Text>Fermer</Text>
        </TouchableOpacity> */}
            <TouchableOpacity style={styles.btn} onPress={() => handleLogout()}>
              <Text>Deconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TemplateView>
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
  input: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
    borderBottom: 1,
  },
  btn: {
    // display: "flex",
    // fontSize: 20,
    // height: 30,
    // width: 200,
    // backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    // margin: 12,
    // borderRadius: 20,
    // borderWidth: 1,
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 5,
    flexWrap: "nowrap",
  },
  header: {
    marginBottom: 20,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
