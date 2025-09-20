import { MD3DarkTheme } from 'react-native-paper'
import { AppTheme } from 'types/ThemeTypes'

const appThemeDark:AppTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#DEB73A',
        secondaryContainer: '#C79C00',
        //personalizado
        success: "rgb(156, 215, 105)",
        onSuccess: "rgb(26, 55, 0)",
        successContainer: "rgb(40, 80, 0)",
        onSuccessContainer: "rgb(183, 244, 129)",
        //warning personalizado
        warning: "rgb(255, 183, 134)",
        onWarning: "rgb(80, 36, 0)",
        warningContainer: "rgb(114, 54, 0)",
        onWarningContainer: "rgb(255, 220, 198)"
    }
}


export default appThemeDark