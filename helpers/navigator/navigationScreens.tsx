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
    const isValidAuthNavigation:boolean = (name === 'Login' || name === 'Home')
    if(navigationGlobal.isReady()) {
      navigationGlobal.reset({ index: isValidAuthNavigation ? 0 : 1, routes: [
        ...(isValidAuthNavigation ? [] : [ { name: 'Home' } ]),
        { name, params }
      ] })
    }
  },

  updateCurrentRouteName: () => {
    const route = navigationGlobal.getCurrentRoute()
    if(route) currentRouteName = route.name
  }
  
}