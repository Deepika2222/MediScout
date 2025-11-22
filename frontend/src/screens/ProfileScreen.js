import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const { logout, user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Profile</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#fff" />
                    </View>
                    <Text style={styles.userName}>{user?.email || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Prescription')}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                        </View>
                        <Text style={styles.menuText}>My Prescriptions</Text>
                        <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Ionicons name="settings-outline" size={24} color="#007AFF" />
                        </View>
                        <Text style={styles.menuText}>Settings</Text>
                        <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={logout}>
                        <View style={[styles.menuIcon, styles.logoutIcon]}>
                            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                        </View>
                        <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    content: { flex: 1, padding: 20 },
    userInfo: { alignItems: 'center', marginBottom: 30 },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    userName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    userEmail: { fontSize: 14, color: '#666' },
    menuContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 8 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    menuIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f9ff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    menuText: { flex: 1, fontSize: 16, color: '#333' },
    logoutButton: { borderBottomWidth: 0, marginTop: 8 },
    logoutIcon: { backgroundColor: '#fff0f0' },
    logoutText: { color: '#FF3B30' },
});

export default ProfileScreen;
