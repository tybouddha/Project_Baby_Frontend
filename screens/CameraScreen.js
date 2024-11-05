import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { ajouterPhoto, documentModalRestOuvert } from "../reducers/document";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log("CameraScreen useEffect");
      const result = await Camera.requestCameraPermissionsAsync();
      if (result) {
        setHasPermission(result.status === "granted");
        console.log("reussite");
      } else {
        console.log("echeur");
      }
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    const uriCache = photo?.uri;

    dispatch(ajouterPhoto(uriCache));
    console.log("leaving Camera Screen, and documentModalRestOuvert ");
    dispatch(documentModalRestOuvert());
    // navigation.navigate("Documents");
    navigation.navigate("TabNavigator", {
      screen: "Documents",
    });

    // formData.append("photoFromFront", {
    //   uri: uri,
    //   name: "photo.jpg",
    //   type: "image/jpeg",
    // });

    // Deplacer photo a une dossier permenanant

    // // etap 1: creer nom de nouveau dossier /photos
    // const nomDeFicher = `photo_${Date.now()}.jpg`;
    // const cheminDeFicher = `${FileSystem.documentDirectory}photos`;
    // const newUri = `${cheminDeFicher}/${nomDeFicher}`;
    // console.log("----- permenant locaiton: ----");
    // console.log(newUri);

    // // etap 2: verifie si /photos exists ou non
    // // --- créer nouveau dossier pour stocker les photos
    // try {
    //   // Ensure the photos directory exists
    //   // ---> if folder does not exist it will create it
    //   // ---> if it does exist it will do nothing
    //   await FileSystem.makeDirectoryAsync(
    //     `${FileSystem.documentDirectory}photos`,
    //     {
    //       intermediates: true,
    //     }
    //   );
    //   await FileSystem.moveAsync({
    //     from: uriCache,
    //     to: uriPermanent,
    //   });
    //   console.log(`waited on newURI: ${uriPermanent}`);
    //   //setPhotoUri(newUri); // Update the URI to point to the new permanent location
    //   // dispatch(setPhotoPermenantUri(newUri));
    //   dispatch(ajouterPhoto(uriPermanent));
    // } catch (error) {
    //   console.error("Error moving photo:", error);
    // }
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Documents")}
          style={styles.button}
        >
          <FontAwesome name="arrow-left" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name="circle-thin" size={95} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
});
