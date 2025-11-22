import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const SymptomScreen = ({ navigation }) => {
    const [symptoms, setSymptoms] = useState('');
    const [suggestions, setSuggestions] = useState(null);

    const handleCheck = () => {
        // Mock data for demonstration
        setSuggestions([
            {
                id: '1',
                medicine: 'Paracetamol (Acetaminophen)',
                usage: 'Take 1 tablet every 4-6 hours for fever or pain.',
                warning: 'Do not exceed 4g per day. Avoid alcohol.',
                type: 'Pain Reliever / Fever Reducer'
            },
            {
                id: '2',
                medicine: 'Ibuprofen',
                usage: 'Take 1 tablet every 6-8 hours with food.',
                warning: 'Avoid if you have stomach ulcers or kidney issues.',
                type: 'Anti-inflammatory (NSAID)'
            }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Get Medicine Suggestions</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Describe your symptoms</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter symptoms (e.g., headache, fever)..."
                        value={symptoms}
                        onChangeText={setSymptoms}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
                        <Text style={styles.checkButtonText}>Get Suggestions</Text>
                    </TouchableOpacity>
                </View>

                {suggestions && (
                    <View style={styles.resultsContainer}>
                        <Text style={styles.resultsTitle}>Suggested OTC Medicines</Text>
                        {suggestions.map((item) => (
                            <View key={item.id} style={styles.suggestionCard}>
                                <View style={styles.cardHeader}>
                                    <FontAwesome5 name="pills" size={20} color="#007AFF" />
                                    <Text style={styles.medicineName}>{item.medicine}</Text>
                                </View>
                                <Text style={styles.medicineType}>{item.type}</Text>

                                <View style={styles.infoSection}>
                                    <Text style={styles.infoLabel}>Usage:</Text>
                                    <Text style={styles.infoText}>{item.usage}</Text>
                                </View>

                                <View style={styles.warningSection}>
                                    <Ionicons name="warning" size={16} color="#FF9500" style={styles.warningIcon} />
                                    <Text style={styles.warningText}>{item.warning}</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={styles.disclaimer}>
                            *These are general suggestions. Please consult a doctor for accurate diagnosis.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        marginBottom: 16,
        backgroundColor: '#fafafa',
    },
    checkButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginBottom: 40,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    suggestionCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    medicineName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    medicineType: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        marginLeft: 30,
    },
    infoSection: {
        marginBottom: 12,
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 8,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    warningSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff8e1',
        padding: 10,
        borderRadius: 8,
    },
    warningIcon: {
        marginTop: 2,
        marginRight: 8,
    },
    warningText: {
        fontSize: 13,
        color: '#d84315',
        flex: 1,
        lineHeight: 18,
    },
    disclaimer: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 8,
    },
});

export default SymptomScreen;
