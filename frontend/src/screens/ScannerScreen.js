import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScannerScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedImage, setScannedImage] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            setScannedImage(photo.uri);
            // TODO: Send photo.uri to backend for OCR
        }
    };

    return (
        <View style={styles.container}>
            {scannedImage ? (
                <View style={styles.preview}>
                    <Image source={{ uri: scannedImage }} style={styles.image} />
                    <Button title="Scan Again" onPress={() => setScannedImage(null)} />
                </View>
            ) : (
                <CameraView style={styles.camera} ref={ref => setCameraRef(ref)}>
                    <View style={styles.buttonContainer}>
                        <Button title="Capture" onPress={takePicture} />
                    </View>
                </CameraView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    message: { textAlign: 'center', paddingBottom: 10 },
    camera: { flex: 1 },
    buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64 },
    preview: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    image: { width: 300, height: 400, marginBottom: 20 },
});

export default ScannerScreen;
