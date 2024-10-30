import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HeaderView(props) {
  const { width: screenWidth } = Dimensions.get("window");

  const pressedProfil = () => {
    console.log("btn profil 🙍‍♂️");
    console.log("screenWidth: ", screenWidth);
    // console.log("props.cacheProfilevwProfil: ", props.cacheProfilevwProfil);
    props.navigation.navigate("Profil");
  };
  // Create styles with dynamic padding based on screenWidth
  const styles = createStyles(screenWidth);

  const vwProfil = (
    <View style={styles.containerProfil}>
      <TouchableOpacity style={styles.btn} onPress={() => pressedProfil()}>
        <FontAwesome name={"user"} size={25} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.image}
          source={require("../../assets/images/logo128.png")}
          alt="logo"
          resizeMode="contain"
        />
      </View>
      {vwProfil}
    </View>
  );
}

const createStyles = (screenWidth) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      padding: 5,
      backgroundColor: "#007ACC",
      height: 70,
      width: "100%",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    image: {
      height: 80,
      aspectRatio: 1,
    },
    containerLogo: {
      alignItems: "center",
      position: "absolute",
      left: screenWidth * 0.5 - 40, // Assuming 80 is the full width
    },
    containerProfil: {
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: 10,
    },
  });
