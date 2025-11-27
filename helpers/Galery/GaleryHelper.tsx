import { NativeModules, Platform } from 'react-native';

export const addToGallery = async (filePath: string) => {
    if (Platform.OS !== 'android') return;

    const { RNFSManager } = NativeModules;

    if (RNFSManager && RNFSManager.scanFile) {
        // Función interna de react-native-fs
        return RNFSManager.scanFile(filePath);
    }

    // Último fallback (Android moderno)
    return NativeModules.MediaScannerConnection.scanFile(
        { path: filePath, mime: 'image/png' }
    );
};