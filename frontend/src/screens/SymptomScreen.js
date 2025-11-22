import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SymptomScreen = () => {
    const [symptoms, setSymptoms] = useState('');
    const [suggestion, setSuggestion] = useState(null);

    const handleCheck = () => {
        // TODO: Call backend API
        console.log('Checking symptoms:', symptoms);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter symptoms (e.g., headache, fever)"
                value={symptoms}
                onChangeText={setSymptoms}
            />
            <Button title="Get Suggestions" onPress={handleCheck} />
            {suggestion && <Text style={styles.result}>{suggestion}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    result: { marginTop: 20, fontSize: 16 },
});

export default SymptomScreen;
