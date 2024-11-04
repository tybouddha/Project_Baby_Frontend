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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CarnetBebeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false); // action modal
  const [date, setdate] = useState(null); // date de la donnée
  const [coucher, setcoucher] = useState(null); //attendu heure dormi
  const [selle, setselle] = useState(null); //etat du caca
  const [couleur, setcouleur] = useState(null); //couleur du caca
  const [repas, setrepas] = useState(null); //quantite du repas
  const [note, setnote] = useState(null); // note bonus
  const [data, setdata] = useState(false);
  const [lastInfos, setlastInfos] = useState([]);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  // Affiche le sélecteur de date pour un champ donné
  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };
  // Cache le sélecteur de date
  const hideDatePicker = () => setDatePickerVisible(false);
  // Gère la sélection de date
  const handleDatePicked = (pickedDate) => {
    const formattedDate = `${pickedDate.getDate()}-${
      pickedDate.getMonth() + 1
    }-${pickedDate.getFullYear()}`;
    if (currentField === "date") {
      setdate(formattedDate);
    }
    hideDatePicker();
  };

  // const enfant = useSelector((state) => state.enfant.value);
  const user = useSelector((state) => state.user.value);
  const tokenProject = user.tokenProject;
  const username = user.username;

  useEffect(() => {
    console.log("user:", user);
    console.log("tokenProject:", tokenProject);
    if (username && tokenProject) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${tokenProject}`)
        .then((response) => response.json())
        .then((carnetBebe) => {
          // console.log("carnetBebe:", carnetBebe);
          if (carnetBebe && carnetBebe.infos.length) {
            const lastCarnetBebe = carnetBebe.infos.reverse().slice(0, 3);
            setlastInfos(lastCarnetBebe);
          } else {
            res.json({ result: false, error: "no data" });
            console.log("Pas de données disponibles");
          }
          console.log(lastInfos);
        });
    }
  }, [username, tokenProject]);

  const modalCarnetBebe = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setdate("");
    setcoucher("");
    setcouleur("");
    setselle("");
    setrepas("");
    setnote("");
  };
  const saveInfos = () => setdata(true);

  useEffect(() => {
    // info recuperer de la modal
    if (data) {
      const bodyObj = {
        username: username,
        date: date,
        heureCoucher: coucher,
        repas: repas,
        selle: selle,
        couleurSelle: couleur,
        notes: note,
      };
      // fetch pour sauvegarder en BDD nouveau document carnet bebe
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/ajout/${tokenProject}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyObj),
        }
      )
        .then((response) => response.json())
        .then((newDocbebe) => {
          console.log("teste1", newDocbebe);
          setlastInfos([...lastInfos, newDocbebe.carnetBebe].reverse());
          console.log("test2", lastInfos);
        })
        .catch((error) => {
          console.error;
        });
      lastInfos.slice(0, 3);
      setdate("");
      setcoucher("");
      setcouleur("");
      setselle("");
      setrepas("");
      setnote("");
      setdata(false);
    }
  }, [data]);

  const lastInfosCard = lastInfos?.map((item, data) => {
    // console.log(item);

    return (
      <View key={item._id} style={styles.card}>
        <View>
          <Text>Date: {item.date} </Text>
          <Text>Coucher: {item.heureCoucher}</Text>
          <Text>Repas: {item.repas}</Text>
          <Text>Selle: {item.selle}</Text>
          <Text>Couleur Selle: {item.couleurSelle}</Text>
          <Text>Notes: {item.notes}</Text>
        </View>
        <FontAwesome
          name="trash-o"
          onPress={() => handleDelete(data.name)}
          size={10}
          color="#ec6e5b"
        />
      </View>
    );
  });
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
              <TouchableOpacity style={styles.btnModal} activeOpacity={0.8}>
                <TextInput
                  placeholder="Date"
                  style={styles.input}
                  value={date}
                  onPress={() => showDatePicker("date")}
                />
                <TextInput
                  placeholder="coucher"
                  style={styles.input}
                  value={coucher}
                  onChangeText={(value) => setcoucher(value)}
                />
                <TextInput
                  placeholder="selle"
                  style={styles.input}
                  value={selle}
                  onChangeText={(value) => setselle(value)}
                />
                <TextInput
                  placeholder="couleur selle"
                  style={styles.input}
                  value={couleur}
                  onChangeText={(value) => setcouleur(value)}
                />
                <TextInput
                  placeholder="repas"
                  style={styles.input}
                  value={repas}
                  onChangeText={(value) => setrepas(value)}
                />
                <TextInput
                  placeholder="note"
                  style={styles.input}
                  value={note}
                  onChangeText={(value) => setnote(value)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => saveInfos()}
                style={styles.btnClose}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>enregistré modification</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={styles.btnClose}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>Close</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePicked}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        </Modal>
      </View>
      {/* Fin propriété children */}
      <View style={styles.blocinfos}>
        <Text>Carnet Bebe Screen </Text>
        {lastInfosCard}
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
  // agenda: {
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   height: 100,
  //   width: 380,
  //   marginBottom: 50,
  //   margin: "auto",
  //   borderRadius: 15,
  // },
  carnetBebeBtn: {
    display: "flex",
    fontSize: 20,
    height: 50,
    width: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnModal: {
    backgroundColor: "pink",
    borderWidth: 1,
    width: 220,
    height: 300,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 2,
  },
  modalView: {
    justifyContent: "space-between",
    borderRadius: 20,
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
  btnClose: {
    backgroundColor: "pink",
    borderWidth: 1,
    width: 220,
    height: 50,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  blocinfos: {
    backgroundColor: "yellow",
    marginTop: 20,
    marginBottom: -80,
  },
});
