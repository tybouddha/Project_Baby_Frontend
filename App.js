import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AcceuilScreen from './screens/AcceuilScreen';
import AgendaScreen from './screens/AgendaScreen';
import DocumentsScreen from './screens/DocumentsScreen'
import CarnetBebeScreen from './screens/CarnetBebeScreen'
import WelcomeScreen from "./screens/WelcomeScreen";

import IconView from './screens/NavComposants/IconView'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = '';
        let screenName = '';
        if (route.name === 'Acceuil') {
          iconName = 'home';
          screenName=  'acceuil'
        } else if (route.name === 'Agenda') {
          iconName = 'calendar';
          screenName=  'agenda'
        } 
        else if (route.name === 'Documents') {
          iconName = 'file';
          screenName=  'documents'
        } 
        else if (route.name === 'CarnetBebe') {
          iconName = 'reddit-alien';// changee
          screenName=  'carnet bebé'
        } 
        else {
          iconName = 'reddit-alien';
        }

        return <IconView iconName={iconName} size={size} color={color} focused={focused}  screenName={screenName}/>;
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#FFFFFF',
      headerShown: false,
      tabBarShowLabel:false,
      tabBarStyle: {
        backgroundColor: '#007ACC',
        borderTopLeftRadius: 10,    // Radius for top-left corner
        borderTopRightRadius: 10,   // Radius for top-right corner
        height: 60,
      }
    })}>
      <Tab.Screen name="Acceuil" component={AcceuilScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="CarnetBebe" component={CarnetBebeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
