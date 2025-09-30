import { NavigationService } from "helpers/navigator/navigationScreens"
import { setValueStorage } from "helpers/store/storeApp"

export const logout = () : any => {
    setValueStorage('user', null)
    setTimeout(() => NavigationService.reset('Login'), 200)
}