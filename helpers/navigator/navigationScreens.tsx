import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationGlobal: any = createNavigationContainerRef()

export const NavigationService = {

  navigate: (name: string, params?: any) => navigationGlobal.isReady() && navigationGlobal.navigate(name, params),

  goBack: () => (navigationGlobal.isReady() && navigationGlobal.canGoBack()) && navigationGlobal.goBack(),

  reset: (name: string) => navigationGlobal.isReady() && navigationGlobal.reset({ index: 0, routes: [{ name }] })
  
}