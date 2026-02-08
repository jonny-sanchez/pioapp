import { createNavigationContainerRef, StackActions } from '@react-navigation/native'
import { RouterName } from './routers'

export const navigationGlobal: any = createNavigationContainerRef()

export let currentRouteName:string = "";

export const NavigationService = {

  navigate: (name: RouterName, params?: any) => {
    if(navigationGlobal.isReady() && currentRouteName !== name) {
      navigationGlobal.navigate(name, params)
    }
  },

  goBack: () => {
    if(navigationGlobal.isReady() && navigationGlobal.canGoBack()) {
      navigationGlobal.goBack()
    }
  },

  reset: (name: RouterName, params: object | null | undefined = null) => {
    // const isValidAuthNavigation:boolean = (name === 'Login' || name === 'Home')
    if(navigationGlobal.isReady() && currentRouteName !== name) {
      // navigationGlobal.reset({ index: isValidAuthNavigation ? 0 : 1, routes: [
      //   ...(isValidAuthNavigation ? [] : [ { name: 'Home' } ]),
      //   { name, params }
      // ] })
      navigationGlobal.reset({
        index: 0,
        routes: [{ name, params }]
      })
    }
  },

  replace: (name: RouterName, params?: any) => { 
    if (navigationGlobal.isReady() && currentRouteName !== name) { 
      // console.log(currentRouteName) 
      if(currentRouteName == 'Home') { 
        navigationGlobal.navigate(name, params) 
        return 
      } 
      navigationGlobal.dispatch(StackActions.replace(name, params)) 
    } 
  },

  updateCurrentRouteName: () => {
    const route = navigationGlobal.getCurrentRoute()
    if(route) currentRouteName = route.name
  }
  
}