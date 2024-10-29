import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import TemplateViewNoNav from "./template/TemplateViewNoNav";

export default function WelcomeScreen() {

    const pressedLogin = () => {
        console.log('- aller à LoginScreen 📢')
    }

    const pressedInscrire = () => {
        console.log('- aller à pressedInscrire 📢')
    }

    const pressedInviter = () => {
        console.log('- pressedInviter 📢')
    }

    const welcomeScreenView = (
    <View style={styles.container}>

        <View style={styles.vwBtn}>
            <TouchableOpacity style={styles.btn} onPress={() => pressedLogin()}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.vwBtn}>
            <TouchableOpacity style={styles.btn} onPress={() => pressedInscrire()}>
                <Text style={styles.btnText}>Inscrire</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.vwBtn}>
            <TouchableOpacity style={styles.btn} onPress={() => pressedInviter()}>
                <Text style={styles.btnText}>Inviter</Text>
            </TouchableOpacity>
        </View>

    </View>
    )
    return (
        <TemplateViewNoNav view={welcomeScreenView}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    vwBtn: {
        display: "flex",
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center",
        padding:10,
    },
    btn:{
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: Dimensions.get("screen").width * 0.8,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#007ACC',  // Blue outline
        backgroundColor: '#FFFFFF',  // White background
        alignItems: 'center',
    },
    btnText:{
        fontFamily: 'Caveat',
        fontSize: 30
    }

});
