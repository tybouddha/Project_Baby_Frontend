import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import TemplateView from "./template/TemplateView";

export default function CarnetBebeScreen({ navigation }) {
  return (
    <TemplateView navigation={navigation}>
      {/* Commence propriété children */}
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
