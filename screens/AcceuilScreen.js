import { StyleSheet, Text, View } from 'react-native';
import HeaderView from './NavComposants/Header';

export default function AcceuilScreen() {
    return (
      <View style={styles.container}>
        <HeaderView/>
        <Text>Acceuil Screen </Text>
       
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',

      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
  });
  