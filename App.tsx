import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import appThemeLight from 'themes/appThemeLight';
import appThemeDark from 'themes/appThemeDark';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import fontConfig from 'themes/fontConfig';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { navigationGlobal, NavigationService } from 'helpers/navigator/navigationScreens';
import globalState from 'helpers/states/globalState';
import LoadingScreen from 'components/Screens/LoadingScreen';
import PageLoadingInit from 'components/Screens/PageLoadingInit';
import SnackBarAlert from 'components/Alerts/SnackBarAlert';
import StackNavigatorApp from 'pages/StackNavigatorApp';
import DrawerDashboard from 'components/container/DrawerDashboard'; 
import { useEffect, useState } from 'react';
import { RouterName } from 'helpers/navigator/routers';
import { getValueStorage, setValueStorage } from 'helpers/store/storeApp';
import { generateJsonError, ResponseService } from 'types/RequestType';
import { AJAX, URLPIOAPP } from 'helpers/http/ajax';

export default function App() {

  let [fontsLoaded] = useFonts({ Inter_900Black })

  const [validSession, setValidSession] = useState<boolean>(false)

  const [routerInit, setRouterInit] = useState<RouterName>('Login');

  // if (!fontsLoaded) return <PageLoadingInit/>;

  const { dark } = globalState()

  const themeColors = dark ? appThemeDark : appThemeLight 

  const theme = {
    ...themeColors,
    fonts: configureFonts({config: fontConfig})
  }

  const postValidToken = async (token:string) : Promise<ResponseService<any>> => {
    try {
      const result:ResponseService = await AJAX(`${URLPIOAPP}/jwt/valid`, 'POST', {
        tokenText: token
      })
      return result
    } catch (error:any) {
      return generateJsonError(`${ error }`, 'object')
    }
  }

  const validToken = async()=>{
    const user = getValueStorage('user')
    const token = user?.token || ''
    let router:RouterName = token ? 'Home' : 'Login'
    if(token) {
      const resultValid = await postValidToken(token)
      router = resultValid.status ? 'Home' : 'Login'
      !resultValid.status && setValueStorage('user', null)
    }
    setRouterInit(router)
    setValidSession(true)
  }

  useEffect(() => {
    validToken()
  }, [])

  return (
    <PaperProvider theme={theme}>
      {
        !fontsLoaded || !validSession ?
        <PageLoadingInit/>
         :
        <NavigationContainer 
          ref={navigationGlobal}
          onReady={NavigationService.updateCurrentRouteName}
          onStateChange={NavigationService.updateCurrentRouteName}
        >
          <DrawerDashboard/>
          {/* Loading screen global */}
          <LoadingScreen/>
          {/* snackbar alerts global */}
          <SnackBarAlert/>

          <StackNavigatorApp initialRouteName={routerInit}/>
        </NavigationContainer>
      }
    </PaperProvider>
  );
}
