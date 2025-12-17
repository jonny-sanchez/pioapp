// import * as React from 'react';
import { Appbar, useTheme  } from 'react-native-paper';
import globalState from 'helpers/states/globalState';
import { NavigationService } from 'helpers/navigator/navigationScreens';
import { AppTheme } from 'types/ThemeTypes';

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

    const theme:AppTheme = useTheme() as AppTheme

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
                    <Appbar.Action 
                        onPress={() => NavigationService.navigate('Notificaciones')} 
                        icon={'bell-outline'} 
                        iconColor={theme.colors.error}
                    /> 
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