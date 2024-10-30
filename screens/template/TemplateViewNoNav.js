import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,

} from "react-native";

import HeaderView from "../NavComposants/Header";

export default function TemplateViewNoNav(props) {
  return (
    <ImageBackground
      source={require("../../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.vwHeader}>
        <HeaderView cacheProfilevwProfil={true} />
      </View>
      <View style={styles.vwMain}>
        {props.view}
      </View>
      <View style={styles.vwFooter}>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    heigth: Dimensions.get("screen").height,
  },
  vwMain: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vwFooter: {
    height: 60,
    backgroundColor: '#007ACC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
