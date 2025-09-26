import { createStackNavigator } from '@react-navigation/stack';
import routers from 'helpers/navigator/routers';
import { useTheme } from 'react-native-paper';


const Stack = createStackNavigator()

export default function StackNavigatorApp(){

    const theme = useTheme()

    const initialRouteName = routers.find(el => el.default)?.name || ""

    return (
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
    )
}