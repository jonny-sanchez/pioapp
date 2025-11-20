import { MMKV } from "react-native-mmkv";
const storage = new MMKV({ id: 'myStorageApp' });
// import AsyncStorage from "@react-native-async-storage/async-storage"

const optionsStorage = {
    theme: {
        nameStorage: 'theme',
        valueDefault: { dark: false },
    },
    user: {
        nameStorage: 'user',
        valueDefault: null,
    },
    rememberCredentials: {
        nameStorage: 'valueCheckBoxCredentials',
        valueDefault: null,
    },
    credentialsLogin: {
        nameStorage: 'valueCredentialsLogin',
        valueDefault: null,
    },
    convivio: {
        nameStorage: 'convivioStorage',
        valueDefault: null
    }
}

//devuelve el valor
export function getValueStorage(key: keyof typeof optionsStorage) {

    const selectOptionKey = optionsStorage[key]

    // let value:any = await AsyncStorage.getItem(selectOptionKey.nameStorage)
    let value:any =  storage.getString(selectOptionKey.nameStorage)

    if(value === undefined) {

        const nwValue = JSON.stringify(selectOptionKey.valueDefault)

        // await AsyncStorage.setItem(selectOptionKey.nameStorage, nwValue)
        storage.set(selectOptionKey.nameStorage, nwValue)

        value = nwValue

    }

    return JSON.parse(value)

}

//crea o edita el valor
export async function setValueStorage(key: keyof typeof optionsStorage, nwValue: any = null) {
    
    const selectOptionKey = optionsStorage[key]

    // await AsyncStorage.setItem(selectOptionKey.nameStorage, JSON.stringify(nwValue))
    storage.set(selectOptionKey.nameStorage, JSON.stringify(nwValue))

}