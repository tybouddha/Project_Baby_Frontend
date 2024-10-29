import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,

    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import TemplateViewNoNav from "../template/TemplateViewNoNav";
import { useState, useEffect } from 'react';

export default function CreerProjetScreen() {

    const [username, usernameSetter] = useState('');
    const [prenom, prenomSetter] = useState('');
    const [nomDeFamille, nomDeFamilleSetter] = useState('');
    const [dateDeMenstru, dateDeMenstruSetter] = useState('');
    const [dateDeGrossess, dateDeGrossessSetter] = useState('');
    const [email, emailSetter] = useState('');
    const [password, passwordSetter] = useState('');

    const pressedCreerProjet = () => {
        console.log('- aller à LoginScreen 📢')
    }

    const creerProjectScreenView = (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.contentView}>
                    <View style={styles.vwInstructions}>
                        <Text style={styles.txtInstructions}>
                            Créez votre compte pour suivre votre grossesse
                        </Text>

                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => usernameSetter(value)}
                            placeholder="username"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={username} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="prénom"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="Nom De Famille"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="dateDeMenstru"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="dateDeGrossess"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="email"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>

                    <View style={styles.vwInput}>
                        <TextInput style={styles.txtInput}
                            onChangeText={(value) => prenomSetter(value)}
                            placeholder="password"
                            placeholderTextColor="#555555" // Dark gray color for the placeholder
                            value={prenom} />
                    </View>


                    <View style={styles.vwBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => pressedCreerProjet()}>
                            <Text style={styles.btnText}>Créer Projet</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </View>
    )
    return (
        <TemplateViewNoNav view={creerProjectScreenView} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentView: {
        height: Dimensions.get("screen").height * 1.25,
        alignItems: 'center',
    },
    vwInstructions: {
        padding: 20,
    },
    txtInstructions:{
        fontSize: 24,
    },
    vwInput: {
        display: 'flex',
        width: Dimensions.get("screen").width * 0.8,   // Full screen width
        paddingHorizontal: '10%', // Align content centrally
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#007ACC',  // Blue outline
        margin: 5,
    },
    txtInput: {
        width: '100%',  // 80% of parent (vwInput)
        height: '100%', // Ensure the TextInput fills its container
        padding: 10,
        fontSize: 16,
    },
    vwBtn: {
        display: "flex",
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: Dimensions.get("screen").width * 0.8,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#007ACC',  // Blue outline
        backgroundColor: '#FFFFFF',  // White background
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'Caveat',
        fontSize: 30
    }

});
