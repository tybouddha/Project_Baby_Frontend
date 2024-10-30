import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import HeaderView from "./NavComposants/Header";
import { useEffect, useState } from "react";

export default function Profil({ navigation }) {
  // const backend = "http://192.168.1.28:3000";

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
    fetch("http://192.168.100.149:3000/user/xw2bLtrCvDtBe93ZJId0IznYe8eQ3KDn")
      .then((response) => response.json())
      .then((data) => {
        console.log("coucou");
        if (data) {
          setusername(data.user.username);
          setemail(data.user.email);
          setgrossesse(data.user.dateDebutGrossesse);
          setmenstruation(data.user.derniereMenstruation);
        } else {
          res.json({ result: false, error: "no data" });
        }
      });
  }, []);

  const saveUpdate = () => {
    console.log("click detected");
    if (!emailRegExp.test(email)) {
      return console.log("Format d'email invalide.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <HeaderView />
      </View>
      <Text>Username</Text>
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
      </View>
      <View style={styles.container}>
        <Text>Page Info 1 </Text>
      </View>
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
    display: "flex",
    fontSize: 20,
    height: 30,
    width: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    borderRadius: 20,
    borderWidth: 1,
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
