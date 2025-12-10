import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { LatLng } from 'react-native-maps'

export const locationPermission = async () => {

    const { status } = await requestForegroundPermissionsAsync()

    if(status !== 'granted') return false

    return true

}

export const getLocation = async () => {

    try {
        const location = await getCurrentPositionAsync()

        return location
        
    } catch (error) {

        return null

    }
    
}

export const getUbicacionActual = async () : Promise<LatLng|null> => {

    const locationPermisos = await locationPermission()
        
    if(!locationPermisos) return null

    const resultLocation = await getLocation()
        
    return resultLocation 
        ? { latitude: resultLocation.coords.latitude, longitude: resultLocation.coords.longitude } 
        : null
}