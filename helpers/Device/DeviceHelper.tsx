import * as Device from 'expo-device'
import { getUniqueId } from 'react-native-device-info'

//retorna true si es real y false si es un emulador
export const isDeviceReal = () : boolean => {
    return Device.isDevice
}

//extrae el id unico del dispositivo
export const uniqueIdDevice = async () : Promise<string> => {
    return await getUniqueId()
}