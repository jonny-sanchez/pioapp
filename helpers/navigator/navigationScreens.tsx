import { createNavigationContainerRef } from '@react-navigation/native'
import { RouterName } from './routers'

export const navigationGlobal: any = createNavigationContainerRef()

export const NavigationService = {

  navigate: (name: RouterName, params?: any) => navigationGlobal.isReady() && navigationGlobal.navigate(name, params),

  goBack: () => (navigationGlobal.isReady() && navigationGlobal.canGoBack()) && navigationGlobal.goBack(),

  reset: (name: RouterName, params: object | null | undefined = null) => navigationGlobal.isReady() && navigationGlobal.reset({ index: 0, routes: [{ name, params }] })
  
}