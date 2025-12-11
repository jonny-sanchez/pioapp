import * as Device from 'expo-device'

//retorna true si es real y false si es un emulador
export const isDeviceReal = () : boolean => {
    return Device.isDevice
}