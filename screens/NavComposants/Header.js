import { StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HeaderView(props) {
    console.log('dans HeaderView')
    console.log(`focused: ${props.focused}`)
    console.log(`focused: ${props.screenName}`)
    return (
      <View style={ styles.container }>
        <View style={props.focused ? styles.sousContainerFocused : styles.sousContainer }>
        <FontAwesome name={props.iconName} size={props.size} color={props.color} />

        <Image style={styles.image} source={require('../../assets/images/logo128.png')} 
       alt="logo"
    //    width={50}
    //    height={50}
       resizeMode="contain"
     />
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
    image:{
        //width: 30, // Set width to 50% of its original size
        height: 80,
        aspectRatio: 1, // Maintains the aspect ratio
        //marginBottom: 4, // Add spacing if necessary
    }
});