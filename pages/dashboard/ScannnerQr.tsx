import { useCameraPermissions, CameraView } from "expo-camera"
import { NavigationService } from "helpers/navigator/navigationScreens";
import { View, StyleSheet } from 'react-native'
import { Text } from "react-native-paper";
import ButtonForm from "components/form/ButtonForm";

export default function ScannnerQr() {

    const [permission, requestPermission] = useCameraPermissions();

    const handleBarcodeScanned = (scanningResult: any) => {
        const { data, type } = scanningResult  
        console.log(data)
        NavigationService.goBack()
    }

    if (!permission) return <View/>;

    if (!permission?.granted) {
        return (
          <View className="w-full flex-1 items-center justify-center p-35 flex flex-col gap-3">
            <Text>Necesitamos su permiso para mostrar la cámara.</Text>
            <ButtonForm label="conceder permiso" icon="camera" onPress={requestPermission}/>
          </View>
        );
    }

    return (
        <View className="flex-1 justify-center">
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={handleBarcodeScanned}
            />
        </View>
    )

}