import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Welcome to MediScout 🏥</Text>
                    <Text style={styles.subtext}>
                        Your smart companion to find medicines nearby or online, and get safe suggestions based on your symptoms.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <MaterialIcons name="search" size={24} color="#fff" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.buttonTitle}>Search Medicine</Text>
                            <Text style={styles.buttonSubtitle}>Find nearby pharmacies & online stock</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => navigation.navigate('Symptom')}
                    >
                        <FontAwesome5 name="thermometer-half" size={24} color="#007AFF" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.secondaryButtonTitle}>Check Symptoms</Text>
                            <Text style={styles.secondaryButtonSubtitle}>Get safe OTC medicine suggestions</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.disclaimer}>
                        Always consult a doctor for serious conditions. MediScout provides guidance only.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    headerContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    secondaryButtonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    secondaryButtonSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    footer: {
        marginBottom: 20,
    },
    disclaimer: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default HomeScreen;
