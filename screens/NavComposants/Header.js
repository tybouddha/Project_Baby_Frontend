import { StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HeaderView() {
    console.log('dans HeaderView')
    console.log(`focused: ${props.focused}`)
    console.log(`focused: ${props.screenName}`)
    return (
      <View style={ styles.container }>
        <View styles={styles.container}>

        <View style={styles.containerLogo}>
        <Image style={styles.image} source={require('../../assets/images/logo128.png')} 
            alt="logo" resizeMode="contain"/>
        </View>
        
        <View style={styles.containerProfil}>
        <FontAwesome name='user' size={25} color={'white'} />
        </View>

        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#007ACC',
        height: 70,
        width:'100%',
        borderBottomLeftRadius: 10,    // Radius for top-left corner
        borderBottomRightRadius: 10,   // Radius for top-right corner
    },
    containerLogo:{
      width: '70%'
    },
    image:{
        //width: 30, // Set width to 50% of its original size
        height: 80,
        aspectRatio: 1, // Maintains the aspect ratio
        //marginBottom: 4, // Add spacing if necessary
    }
});