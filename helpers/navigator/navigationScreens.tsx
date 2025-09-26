import { createNavigationContainerRef } from '@react-navigation/native'
import { RouterName } from './routers'

export const navigationGlobal: any = createNavigationContainerRef()

export let currentRouteName:string = "";

export const NavigationService = {

  navigate: (name: RouterName, params?: any) => {
    if(navigationGlobal.isReady()) {
      navigationGlobal.navigate(name, params)
      currentRouteName = name
    }
  },

  goBack: () => {
    if(navigationGlobal.isReady() && navigationGlobal.canGoBack()) {
      navigationGlobal.goBack()
      const route = navigationGlobal.getCurrentRoute()
      currentRouteName = route.name
    }
  },

  reset: (name: RouterName, params: object | null | undefined = null) => {
    if(navigationGlobal.isReady()) {
      navigationGlobal.reset({ index: 0, routes: [{ name, params }] })
      currentRouteName = name
    }
  }
  
}