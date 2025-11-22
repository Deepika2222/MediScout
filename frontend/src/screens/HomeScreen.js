import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MediScout</Text>
            <Button title="Find Medicine" onPress={() => navigation.navigate('Search')} />
            <Button title="Symptom Checker" onPress={() => navigation.navigate('Symptom')} />
            <Button title="Nearby Stores" onPress={() => navigation.navigate('Map')} />
            <Button title="Scan Medicine" onPress={() => navigation.navigate('Scanner')} />
            <Button title="My Prescriptions" onPress={() => navigation.navigate('Prescription')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
