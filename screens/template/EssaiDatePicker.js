import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function FormulaireDate(navigation) {
  // États pour les dates
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
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
    if (currentField === "date1") {
      setDate1(formattedDate);
    } else if (currentField === "date2") {
      setDate2(formattedDate);
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => showDatePicker("date1")}>
        <TextInput
          style={styles.input}
          placeholder="Choisir la date"
          value={date1}
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showDatePicker("date2")}>
        <TextInput
          style={styles.input}
          placeholder="Choisir la date"
          value={date2}
          editable={false}
        />
      </TouchableOpacity>

      {/* <Button title="Envoyer les données" onPress={submitData} /> */}

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
