// import * as React from 'react';
import { Appbar, Badge, Text, useTheme  } from 'react-native-paper';
import globalState from 'helpers/states/globalState';
import { NavigationService } from 'helpers/navigator/navigationScreens';
import { AppTheme } from 'types/ThemeTypes';
import { Pressable, StyleSheet, View } from 'react-native';
import notificationState from 'helpers/states/notificationState';

type AppBarHomeProps = {
    title?: string;
    goBack?: boolean;
    themeApp?: boolean;
    menuApp?: boolean;
    notification?: boolean;
}

export default function AppBarHome({
    title = '',
    goBack = false,
    themeApp = true,
    menuApp = true,
    notification = true
    
} : AppBarHomeProps){

    const { dark, setDark, setOpenDrawer } = globalState()
    const { countNotificacions } = notificationState()

    const theme:AppTheme = useTheme() as AppTheme

    const styleAppBar = StyleSheet.create({
        noti_aviso: {
            position: 'absolute',
            top: 10, 
            right: 5, 
            zIndex: 1, 
            // width: 23, 
            // height: 23, 
            // borderRadius: 8, 
            backgroundColor: theme.colors.error, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
        }
    })

    return (
        <Appbar.Header>
            {
                goBack && <Appbar.BackAction onPress={ () => NavigationService.goBack() } /> 
            }
            <Appbar.Content title={title}/>
            { 
                themeApp && 
                    <Appbar.Action 
                        onPress={setDark} 
                        icon={ dark ? 'weather-night' : 'weather-sunny' }
                    />
            }
            {/* bell-badge-outline */}
            { 
                notification && 
                <View style={{ position: 'relative' }}>
                    {/* <Pressable onPress={() => NavigationService.navigate('Notificaciones')} style={styleAppBar.noti_aviso}>
                        <Text variant='bodySmall' style={{ color: theme.colors.background }}>9+</Text>
                    </Pressable> */}
                    <Badge 
                        style={styleAppBar.noti_aviso} 
                        onPress={() => NavigationService.navigate('Notificaciones')}
                        visible={countNotificacions > 0}
                    >
                        { countNotificacions > 9 ? '9+' : countNotificacions }
                    </Badge>
                    <Appbar.Action 
                        onPress={() => NavigationService.navigate('Notificaciones')} 
                        icon={'bell-outline'} 
                        // iconColor={theme.colors.error}
                    />
                </View> 
            }
            { 
                menuApp && 
                    <Appbar.Action 
                        onPress={setOpenDrawer} 
                        icon="menu"
                    />
            }
        </Appbar.Header>
    )

}