// import { useState } from "react";
import { Snackbar, useTheme } from "react-native-paper"
import { View } from 'react-native'
import alertsState from "helpers/states/alertsState";
import { OptionsTypeAlert } from "types/AlertsType";
import { AppTheme } from "types/ThemeTypes";

// export type OptionsTypeAlert = keyof typeof optionColor

export default function SnackBarAlert() {

    const theme = useTheme() as AppTheme

    const optionColor:Record<OptionsTypeAlert, string | undefined> = {
        error: theme.colors.error,
        success: theme.colors.success, 
        warning: theme.colors.warning,
        normal: undefined
    }

    const { visibleSnackBar, closeVisibleSnackBar, message, typeAlert, snackbarKey } = alertsState()

    // const [visible, setVisible] = useState<boolean>(true);

    // const onDismissSnackBar = () => setVisible(false);

    return (
        <View className="absolute bottom-5 w-full z-50">
            <Snackbar
                key={snackbarKey}
                style={( optionColor[typeAlert] && { backgroundColor: optionColor[typeAlert] })}
                visible={visibleSnackBar}
                onDismiss={closeVisibleSnackBar}
                duration={3000}
            >
                { message }
            </Snackbar>
        </View>
    )
}