// import * as React from 'react';
import { Appbar  } from 'react-native-paper';
import globalState from 'helpers/states/globalState';
import { NavigationService } from 'helpers/navigator/navigationScreens';

type AppBarHomeProps = {
    title?: string;
    goBack?: boolean;
    themeApp?: boolean;
    menuApp?: boolean;
}

export default function AppBarHome({
    title = '',
    goBack = false,
    themeApp = true,
    menuApp = true
} : AppBarHomeProps){

    const { dark, setDark, setOpenDrawer } = globalState()

    return (
        <Appbar.Header>
            {
                goBack && <Appbar.BackAction onPress={ () => NavigationService.goBack() } /> 
            }
            <Appbar.Content title={title}/>
            { themeApp && <Appbar.Action onPress={setDark} icon={ dark ? 'weather-night' : 'weather-sunny' }/>}
            { menuApp && <Appbar.Action onPress={setOpenDrawer} icon="menu"/>}
        </Appbar.Header>
    )

}