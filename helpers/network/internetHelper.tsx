import NetInfo from '@react-native-community/netinfo'

export const validateConnectionInternetActive = async () : Promise<boolean> => {

    try {
        const { isInternetReachable, isConnected } = await NetInfo.fetch()
        const connected:boolean = (isConnected ?? false) && (isInternetReachable ?? false);
        return connected        
    } catch (error) {
        console.log(error)
        return false
    }

}