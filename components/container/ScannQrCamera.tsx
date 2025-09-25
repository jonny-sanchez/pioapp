// import { useCameraPermissions, CameraView } from "expo-camera"
// import scannerQrState from "helpers/states/scannerQrState";
// import { useEffect, useState } from "react";
// import { View, StyleSheet, Text, Button } from 'react-native'

// export default function ScannQrCamera() {

//     //estadoGlobal 
//     const { openScannerQr, setOpenScannerQr } = scannerQrState()

//     const [permission, requestPermission] = useCameraPermissions()
//     const [showScanner, setShowScanner] = useState(false)

//     const startScanner = async () => {
//       if (!permission?.granted) {
//         const result = await requestPermission()
//         if(!result?.granted) return
//       }
//       setShowScanner(true)
//     }

//     const handleBarcodeScanned = (scanningResult: any) => {
//       const { data, type } = scanningResult
//     //   console.log("QR leído:", data, "tipo:", type)

//       setShowScanner(false)      
//       // setOpenScannerQr(false)    
//     }

//     useEffect(() => {
//       openScannerQr && startScanner()
//       // setShowScanner(false)
//       setOpenScannerQr(false)
//       console.log(openScannerQr)
//     }, [openScannerQr])

//     return (
//         <>
//             {
//                 showScanner && 
//                 <View className="flex-1 justify-center">
//                     <CameraView
//                       style={StyleSheet.absoluteFillObject}
//                       facing="back"
//                       barcodeScannerSettings={{
//                         barcodeTypes: ["qr"],
//                       }}
//                       onBarcodeScanned={handleBarcodeScanned}
//                     />
//                 </View>
//             }
//         </>
//     )

// }