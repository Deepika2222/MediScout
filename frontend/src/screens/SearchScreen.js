import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = () => {
        // Mock data for demonstration
        setResults({
            nearby: [
                { id: '1', name: 'Apollo Pharmacy', distance: '0.5 km', stock: 'Available', price: '$12' },
                { id: '2', name: 'MedPlus', distance: '1.2 km', stock: 'Low Stock', price: '$11.5' },
            ],
            online: [
                { id: '3', name: '1mg', delivery: 'Tomorrow', price: '$10', availability: 'In Stock' },
                { id: '4', name: 'Pharmeasy', delivery: '2 Days', price: '$9.5', availability: 'In Stock' },
            ]
        });
    };

    const renderPharmacyItem = ({ item }) => (
        <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <View style={styles.resultDetails}>
                <Text style={[styles.stockStatus, item.stock === 'Available' ? styles.stockGreen : styles.stockOrange]}>
                    {item.stock}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );

    const renderOnlineItem = ({ item }) => (
        <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.delivery}>Delivery: {item.delivery}</Text>
            </View>
            <View style={styles.resultDetails}>
                <Text style={styles.availability}>{item.availability}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Find Your Medicine</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter medicine name..."
                        value={query}
                        onChangeText={setQuery}
                        placeholderTextColor="#999"
                    />
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.resultsContainer}>
                {results && (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
                            <FlatList
                                data={results.nearby}
                                renderItem={renderPharmacyItem}
                                keyExtractor={item => item.id}
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Online Stores</Text>
                            <FlatList
                                data={results.online}
                                renderItem={renderOnlineItem}
                                keyExtractor={item => item.id}
                                scrollEnabled={false}
                            />
                        </View>
                    </>
                )}

                {!results && (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="local-pharmacy" size={64} color="#ddd" />
                        <Text style={styles.emptyStateText}>Search for medicines to see results</Text>
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
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultsContainer: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    resultCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    storeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    distance: {
        color: '#666',
        fontSize: 14,
    },
    delivery: {
        color: '#007AFF',
        fontSize: 14,
    },
    resultDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stockStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
    stockGreen: {
        color: '#34C759',
    },
    stockOrange: {
        color: '#FF9500',
    },
    availability: {
        color: '#34C759',
        fontSize: 14,
        fontWeight: '500',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyStateText: {
        marginTop: 16,
        color: '#999',
        fontSize: 16,
    },
});

export default SearchScreen;
