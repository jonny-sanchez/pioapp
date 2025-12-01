import { NativeModules, Platform } from 'react-native';
import RNFS from 'react-native-fs';

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


export const saveQrGalery = async (refQr:any) => {
    await refQr.toDataURL(async (data: string) => {
        const filePath = `${RNFS.PicturesDirectoryPath}/qr_${Date.now()}.png`
        await RNFS.writeFile(filePath, data, 'base64');
        await addToGallery(filePath);
    })
}

export const getPathRefFile = async (refQr:any, ubicacion:'cache'|'picture') => {
    const filePath = `${ubicacion === 'cache' ? RNFS.CachesDirectoryPath : RNFS.PicturesDirectoryPath}/qr_${Date.now()}.png`;
    const base64 = await new Promise<string>((resolve, reject) => {
        refQr.toDataURL((data: string) => {
            if (!data) reject("No se pudo obtener el QR");
            resolve(data);
        });
    });
    await RNFS.writeFile(filePath, base64, "base64");
    return filePath;
}

export const base64GetRef = async (refQr:any,) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      refQr.toDataURL((data: string) => {
        if (!data) reject("No se pudo obtener el QR");
        resolve(data);
      });
    });
    // return base64
    return `data:image/png;base64,${base64}`
}