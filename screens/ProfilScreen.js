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
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [grossesse, setgrossesse] = useState("");
  const [menstruation, setmenstruation] = useState("");

  const saveUpdate = () => {};

  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <HeaderView />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => setusername(value)}
          value={username}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="email"
          onChangeText={(value) => setemail(value)}
          value={email}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Password"
          onChangeText={(value) => setpassword(value)}
          value={password}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="début de grossesse"
          onChangeText={(value) => setgrossesse(value)}
          value={grossesse}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="date de dernière menstruation"
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
    margin: 15,
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
    margin: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  header: {
    marginBottom: 100,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
