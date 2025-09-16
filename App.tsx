import { Provider as PaperProvider, configureFonts } from 'react-native-paper'
import appThemeLight from 'themes/appThemeLight';
import appThemeDark from 'themes/appThemeDark';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routers from 'helpers/navigator/routers';
import fontConfig from 'themes/fontConfig';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { navigationGlobal } from 'helpers/navigator/navigationScreens';
import globalState from 'helpers/states/globalState';
import LoadingScreen from 'components/Screens/LoadingScreen';
import PageLoadingInit from 'components/Screens/PageLoadingInit';

const Stack = createStackNavigator()

export default function App() {

  let [fontsLoaded] = useFonts({ Inter_900Black })

  // if (!fontsLoaded) return <PageLoadingInit/>;

  const { dark } = globalState()

  const themeColors = dark ? appThemeDark : appThemeLight 

  const theme = {
    ...themeColors,
    fonts: configureFonts({config: fontConfig})
  }

  const initialRouteName = routers.find(el => el.default)?.name || ""

  return (
    <PaperProvider theme={theme}>
      {
        !fontsLoaded ?
        <PageLoadingInit/>
         :
        <NavigationContainer ref={navigationGlobal}>
          <LoadingScreen/>
          <Stack.Navigator 
              initialRouteName={initialRouteName} 
              screenOptions={{ 
                headerShown: false, 
                cardStyle: { backgroundColor: theme.colors.background },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'slide_from_right' 
              }}
          >
            { 
              routers.map((el, index) => 
                <Stack.Screen 
                  key={index}
                  name={el?.name || ""} 
                  component={el?.component || null}
                />
              ) 
            }
          </Stack.Navigator>
        </NavigationContainer>
      }
    </PaperProvider>
  );
}
