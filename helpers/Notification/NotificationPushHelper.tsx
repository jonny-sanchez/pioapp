import { 
    getPermissionsAsync, 
    requestPermissionsAsync, 
    getExpoPushTokenAsync,
    setNotificationHandler 
} from 'expo-notifications'
import Constants from 'expo-constants';

export const notificationPermissionGranted = async () : Promise<boolean> => {
    const { status } = await requestPermissionsAsync()
    if(status !== 'granted') return false
    return true
}

export const generateTokenNotificationPush = async () => {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) 
        throw new Error('Project ID not found')
    const token = await getExpoPushTokenAsync({
        projectId: projectId
    })
    return token?.data ?? null 
}

export const configureNotificationHandler  = () => {
    setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    })
}