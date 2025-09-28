import { useCameraPermissions, CameraView } from "expo-camera"
import { NavigationService } from "helpers/navigator/navigationScreens";
import { View, StyleSheet } from 'react-native'
import { Text } from "react-native-paper";
import ButtonForm from "components/form/ButtonForm";
import Svg, { Rect, Mask } from "react-native-svg";
import PageLayout from "components/Layouts/PageLayout";

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
          <PageLayout goBack={true}>
            <View className="w-full flex-1 items-center justify-center flex flex-col gap-3" style={{ padding: 25 }}>
              <Text style={{ textAlign: 'center' }}>Necesitamos su permiso para mostrar la cámara.</Text>
              <ButtonForm label="conceder permiso" icon="camera" onPress={requestPermission}/>
            </View>
          </PageLayout>
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
            {/* Decorador */}
            <View style={StyleSheet.absoluteFillObject}>
              <Svg height="100%" width="100%">
                <Mask id="mask">
                  <Rect width="100%" height="100%" fill="white" />
                  <Rect
                    x="50%"
                    y="50%"
                    width="250"
                    height="250"
                    rx="24"
                    ry="24"
                    fill="black"
                    transform="translate(-125, -125)"
                  />
                </Mask>
                <Rect
                  width="100%"
                  height="100%"
                  fill="rgba(15,23,42,0.6)"
                  mask="url(#mask)"
                />
              </Svg>
            </View>
        </View>
    )

}