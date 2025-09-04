import { MMKV } from "react-native-mmkv";
const storage = new MMKV();
// import AsyncStorage from "@react-native-async-storage/async-storage"

const optionsStorage = {
    theme: {
        nameStorage: 'theme',
        valueDefault: { dark: false },
    }
}

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

export async function setValueStorage(key: keyof typeof optionsStorage, nwValue: any = null) {
    
    const selectOptionKey = optionsStorage[key]

    // await AsyncStorage.setItem(selectOptionKey.nameStorage, JSON.stringify(nwValue))
    storage.set(selectOptionKey.nameStorage, JSON.stringify(nwValue))

}