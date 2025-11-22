import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PrescriptionScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Prescriptions</Text>
            <Text>No prescriptions uploaded yet.</Text>
            <Button title="Upload New" onPress={() => console.log('Upload')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default PrescriptionScreen;
