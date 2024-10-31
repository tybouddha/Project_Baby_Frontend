import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import TemplateView from "./template/TemplateView";

export default function DocumentsScreen({ navigation }) {
  return (
    <TemplateView navigation={navigation}>
      {/* Commence propriété children */}
      <View>
        <Text>Documents Screen </Text>
      </View>
      {/* Fin propriété children */}
    </TemplateView>
  );
}

const styles = StyleSheet.create({});
