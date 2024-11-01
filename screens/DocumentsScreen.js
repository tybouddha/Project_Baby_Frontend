import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import TemplateView from "./template/TemplateView";
import FormulaireDate from "./template/EssaiDatePicker";

export default function DocumentsScreen({ navigation }) {
  return (
    <TemplateView navigation={navigation}>
      {/* Commence propriété children */}

      <View style={styles.container}>
        <FormulaireDate style={styles.input} />
        <Text>Documents Screen </Text>
      </View>
      {/* Fin propriété children */}
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
