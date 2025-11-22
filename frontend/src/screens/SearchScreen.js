import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        // TODO: Call backend API
        console.log('Searching for:', query);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for medicine..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default SearchScreen;
