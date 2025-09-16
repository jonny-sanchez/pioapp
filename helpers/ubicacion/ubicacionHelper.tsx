import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

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