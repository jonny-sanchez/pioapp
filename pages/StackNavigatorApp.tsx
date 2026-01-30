import { createStackNavigator } from '@react-navigation/stack';
import routers, { RouterName } from 'helpers/navigator/routers';
import { useTheme } from 'react-native-paper';

type StackNavigatorAppProps = {
  initialRouteName?: RouterName
}

const Stack = createStackNavigator()

export default function StackNavigatorApp({
  initialRouteName = 'Login'
} : StackNavigatorAppProps){

    const theme = useTheme()

    // const initialRouteName = routers.find(el => el.default)?.name || ""

    return (
        <Stack.Navigator 
            initialRouteName={initialRouteName} 
            screenOptions={{ 
              headerShown: false, 
              cardStyle: { backgroundColor: theme.colors.background },
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              gestureResponseDistance: 65
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
    )
}