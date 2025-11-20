import { View } from "react-native"
import { Text, useTheme, IconButton } from "react-native-paper"

type InfoAlertType = {
    label?: string;
    className?: string;
}

export default function InfoAlert({
    label = ''
} : InfoAlertType)
{

    const theme = useTheme()

    return (
        <View className="mt-4 flex-row items-center justify-center">
            <IconButton
                icon="alert-circle"
                iconColor={theme.colors.onErrorContainer}
                size={16}
                style={{ margin: 0 }}
            />
            <Text style={{ color: theme.colors.onErrorContainer }} className="text-sm ml-1">
                { label }
            </Text>
        </View>
    )
}