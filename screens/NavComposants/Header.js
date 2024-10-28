import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HeaderView(props) {
  console.log('dans HeaderView')

  const pressedProfil = () =>{
    console.log("btn profil 🙍‍♂️")
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.image} source={require('../../assets/images/logo128.png')} alt="logo"
          resizeMode="contain" />
      </View>
      <View style={styles.containerProfil}>
      <TouchableOpacity style={styles.btn} onPress={() => pressedProfil()}>
        <FontAwesome name={'user'} size={25} color={'#FFFFFF'}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#007ACC',
    height: 70,
    width: '100%',
    borderBottomLeftRadius: 10,    // Radius for top-left corner
    borderBottomRightRadius: 10,   // Radius for top-right corner
  },
  image: {
    height: 80,
    aspectRatio: 1, // Maintains the aspect ratio

  },
  containerLogo: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerProfil: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});