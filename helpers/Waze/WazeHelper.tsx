import { Linking } from "react-native";
import { LatLng } from "react-native-maps";

export const openWazeNavigation = (origen:LatLng, destino:LatLng):any => {
    // https://waze.com/ul?ll=${destLat},${destLng}&from=${originLat},${originLng}&navigate=yes
    // https://waze.com/ul?ll=${destLat},${destLng}&navigate=yes
    Linking.openURL(`https://waze.com/ul?ll=${destino.latitude},${destino.longitude}&from=${origen.latitude},${origen.longitude}&navigate=yes`)
}