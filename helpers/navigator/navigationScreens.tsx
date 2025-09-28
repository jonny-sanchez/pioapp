import { createNavigationContainerRef } from '@react-navigation/native'
import { RouterName } from './routers'

export const navigationGlobal: any = createNavigationContainerRef()

export let currentRouteName:string = "";

export const NavigationService = {

  navigate: (name: RouterName, params?: any) => {
    if(navigationGlobal.isReady()) {
      navigationGlobal.navigate(name, params)
    }
  },

  goBack: () => {
    if(navigationGlobal.isReady() && navigationGlobal.canGoBack()) {
      navigationGlobal.goBack()
    }
  },

  reset: (name: RouterName, params: object | null | undefined = null) => {
    if(navigationGlobal.isReady()) {
      navigationGlobal.reset({ index: 0, routes: [{ name, params }] })
    }
  },

  updateCurrentRouteName: () => {
    const route = navigationGlobal.getCurrentRoute()
    if(route) currentRouteName = route.name
  }
  
}