import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const DatePickerComposant = (props) => {
  const [dateDeIntret, dateDeIntretSetter] = useState(new Date());
  const [afficherPicker, afficherPickerSetter] = useState(false);
  const [btnText, btnTextSetter] = useState(props.btnText);

  const changeDateDeInteret = (event, dateChoisi) => {
    const currentDate = dateChoisi || dateDeIntret;
    // afficherPickerSetter(Platform.OS === 'ios'); // Keep picker open on iOS
    dateDeIntretSetter(currentDate);
    props.chopperDate(currentDate);
  };

  const appuyerButon = () => {
    afficherPickerSetter(!afficherPicker);
    if (!afficherPicker) {
      const ajourdhui = new Date();
      dateDeIntretSetter(ajourdhui);
      props.chopperDate(ajourdhui);
    } else {
      props.chopperDate("");
    }
  };

  const btnDemandDate = (
    <TouchableOpacity style={styles.touchDate} onPress={() => appuyerButon()}>
      <Text style={styles.txtDemandDate}>{btnText}</Text>
    </TouchableOpacity>
  );
  const btnSupprimer = (
    <TouchableOpacity
      style={styles.touchPoubelle}
      onPress={() => appuyerButon()}
    >
      <FontAwesome name={"trash"} size={20} color={"red"} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.vwMain}>
      {afficherPicker ? (
        <DateTimePicker
          style={styles.pickerStyle}
          value={dateDeIntret}
          mode="date"
          display="default"
          onChange={changeDateDeInteret}
        />
      ) : (
        btnDemandDate
      )}

      {afficherPicker && btnSupprimer}
    </View>
  );
};
const styles = StyleSheet.create({
  vwMain: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  touchDate: {
    width: Dimensions.get("screen").width * 0.9,
    backgroundColor: "rgb(255, 255, 255, 0.2)",
  },
  pickerStyle: {
    width: Dimensions.get("screen").width * 0.4,
    padding: 0,
    backgroundColor: "transparent",
  },
  touchPoubelle: {
    width: Dimensions.get("screen").width * 0.15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  txtDemandDate: {
    fontSize: 16,
    color: "#555555",
  },
  textSupprimer: {
    color: "red",
  },
});
export default DatePickerComposant;
