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
      <View>
        <Text>Documents Screen </Text>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({});
