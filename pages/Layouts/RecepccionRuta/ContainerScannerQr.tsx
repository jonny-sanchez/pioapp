import { NavigationService } from "helpers/navigator/navigationScreens"
import { View, Pressable } from "react-native"
import { Icon, useTheme, Text } from "react-native-paper"

type ContainerScannerQrProps = {
    disabled?: boolean;
}

export default function ContainerScannerQr({
    disabled = false
} : ContainerScannerQrProps) {

    const theme = useTheme()

    return (
        <Pressable onPress={disabled ? () => {} : () => NavigationService.navigate('ScannerQr') }>
            <View className={`w-full h-[250] rounded-2xl flex items-center justify-center gap-4 p-2 ${ disabled && 'opacity-50' }`} style={{ backgroundColor: theme.colors.surfaceVariant }}>
                <Icon source='qrcode-scan' size={60}/>
                <Text style={{ color: theme.colors.secondary }} variant="bodySmall">pulsa para usar camara</Text>
            </View>
        </Pressable>
    )
}