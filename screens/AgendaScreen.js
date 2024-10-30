import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Agenda } from "react-native-calendars";
import React, { useState } from "react";

export default function AgendaScreen(navigation) {
  const [modalVisible, setModalVisible] = useState(false);
  const addRdv = () => {
    setModalVisible(true);
    console.log("btn fonctionnel");
  };
  const closeRdv = () => {
    setModalVisible(false);
  };
  const [items, setItems] = useState({
    "2024-04-29": [{ name: "Meeting with client", time: "10:00 AM" }],
    "2024-04-30": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
      { name: "Project presentation", time: "5:00 PM" },
    ],
    "2024-05-01": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
    "2024-05-02": [
      { name: "Team brainstorming session", time: "9:00 AM" },
      { name: "Project presentation", time: "2:00 PM" },
    ],
  });
  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No events for this day</Text>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.header}>
        <HeaderView navigation={navigation} />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            marginTop: 30,
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <View
            style={{
              marginVertical: 10,
              marginTop: 30,
              backgroundColor: "white",
              marginHorizontal: 10,
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{items.name}</Text>
            <Text>{items.time}</Text>
          </View>
          <Agenda items={items} />
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput placeholder="code d'invitation" style={styles.input} />
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
    borderWidth: 1,
  },
  textrole: {
    fontSize: 20,
  },
});
