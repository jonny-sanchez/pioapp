import { MD3LightTheme, Surface, useTheme } from 'react-native-paper';

// useTheme().colors.primaryContainer

const appThemeLight  = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#fcb900',
        surfaceVariant: '#F0F0F0', //#F6F7F8
        secondaryContainer: '#FFDD75'
    },
}

export default appThemeLight