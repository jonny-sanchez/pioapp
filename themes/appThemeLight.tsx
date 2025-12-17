import { MD3LightTheme, Surface, useTheme } from 'react-native-paper';
import { AppTheme } from 'types/ThemeTypes';

// useTheme().colors.primaryContainer
const appThemeLight:AppTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#fcb900',
        surfaceVariant: '#F0F0F0', //#F6F7F8
        secondaryContainer: '#FFDD75',
        //personalizado
        success: "rgb(56, 107, 1)",
        onSuccess: "rgb(255, 255, 255)",
        successContainer: "rgb(183, 244, 129)",
        onSuccessContainer: "rgb(13, 32, 0)",
        //warnigng personalizado
        warning: "rgb(150, 73, 0)",
        onWarning: "rgb(255, 255, 255)",
        warningContainer: "rgb(255, 220, 198)",
        onWarningContainer: "rgb(49, 19, 0)",
        skyBlue: "rgb(0, 99, 154)",
        onSkyBlue: "rgb(255, 255, 255)",
        skyBlueContainer: "rgb(206, 229, 255)",
        onSkyBlueContainer: "rgb(0, 29, 50)",
    },
}

export default appThemeLight