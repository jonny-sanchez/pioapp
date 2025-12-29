import { NavigationService } from "helpers/navigator/navigationScreens"
import { setValueStorage } from "helpers/store/storeApp"

export const logout = (biometricAutomatic:boolean = true) : any => {
    setValueStorage('user', null)
    setTimeout(() => NavigationService.reset('Login', { biometricAutomatic }), 200)
}