import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import TemplateView from "./template/TemplateView";
import { Agenda } from "react-native-calendars";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CarnetBebeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false); // action modal
  // const [date, setdate] = useState(null); // date de la donnée
  // const [coucher, setcoucher] = useState(null); //attendu heure dormi
  // const [selle, setselle] = useState(null); //etat du caca
  // const [couleur, setcouleur] = useState(null); //couleur du caca
  // const [repas, setrepas] = useState(null); //quantite du repas

  // const enfant = useSelector((state) => state.enfant.value);

  const modalCarnetBebe = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);
  const updateInfos = () => {};
  return (
    <TemplateView navigation={navigation}>
      {/* Commence propriété children */}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.carnetBebeBtn}
          onPress={() => modalCarnetBebe()}
        >
          <Text>Carnet Bebe</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => updateInfos()}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <TextInput
                  placeholder="Date"
                  style={styles.input}
                  // value={date}
                  onChangeText={(value) => setdate(value)}
                />
                <TextInput
                  placeholder="coucher"
                  style={styles.input}
                  // value={coucher}
                  onChangeText={(value) => setcoucher(value)}
                />
                <TextInput
                  placeholder="selle"
                  style={styles.input}
                  // value={selle}
                  onChangeText={(value) => setselle(value)}
                />
                <TextInput
                  placeholder="couleur selle"
                  style={styles.input}
                  // value={couleur}
                  onChangeText={(value) => setcouleur(value)}
                />
                <TextInput
                  placeholder="repas"
                  style={styles.input}
                  // value={repas}
                  onChangeText={(value) => setrepas(value)}
                />

                <Text style={styles.textButton}>enregistré modification</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={styles.btnModal}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Agenda
          style={styles.agenda}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </View>
      {/* Fin propriété children */}
      <View style={styles.container}>
        <Text>Carnet Bebe Screen </Text>
      </View>
      {/* Fin propriété children */}
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
  agenda: {
    borderWidth: 1,
    borderColor: "gray",
    height: 100,
    width: 380,
    marginBottom: 50,
    margin: "auto",
    borderRadius: 15,
  },
  carnetBebeBtn: {
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
  input: {
    width: 150,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
