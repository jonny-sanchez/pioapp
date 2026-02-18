import { NativeModules, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import { Alert, Platform } from "react-native";
import alertsState from 'helpers/states/alertsState';

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

// export const DownloadImageToGalery = async (uri: string) => {
//   try {
//     // Pedir permisos de galería
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//         alertsState.getState().openVisibleSnackBar(`Permiso denegado. Se necesita acceso a la galería`, 'error')
//         return;
//     }

//     const fileName = uri.split('/').pop() || `image_${Date.now()}.jpg`;
//     const fileUri = FileSystem.documentDirectory + fileName;

//     // Descargar imagen
//     const downloadResult = await FileSystem.downloadAsync(uri, fileUri);

//     // Guardar en galería
//     const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);

//     // (Opcional) Crear álbum
//     // await MediaLibrary.createAlbumAsync("MiApp", asset, false);

//     alertsState.getState().openVisibleSnackBar(`Descargado, Imagen guardada en la galería`, 'success')

//   } catch (error) {
//     alertsState.getState().openVisibleSnackBar(`${error}`, 'error')
//   }
// };

export const DownloadImageToGalery = async (uri: string) => {
  try {
    const fileName = uri.split('/').pop() || `image_${Date.now()}.jpg`;

    const fileUri = FileSystem.documentDirectory + fileName;

    await FileSystem.downloadAsync(uri, fileUri);

    alertsState
      .getState()
      .openVisibleSnackBar(`Imagen descargada`, 'success');

    return fileUri;

  } catch (error) {
    alertsState.getState().openVisibleSnackBar(`${error}`, 'error');
  }
};
