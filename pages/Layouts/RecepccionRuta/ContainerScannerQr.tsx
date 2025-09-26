import { NavigationService } from "helpers/navigator/navigationScreens"
import { View, Pressable } from "react-native"
import { Icon, useTheme, Text } from "react-native-paper"

export default function ContainerScannerQr() {

    const theme = useTheme()

    return (
        <Pressable onPress={() => NavigationService.navigate('ScannerQr') }>
            <View className="w-full h-[250] rounded-2xl flex items-center justify-center gap-4 p-2" style={{ backgroundColor: theme.colors.surfaceVariant }}>
                <Icon source='qrcode-scan' size={60}/>
                <Text style={{ color: theme.colors.secondary }} variant="bodySmall">pulsa para usar camara</Text>
            </View>
        </Pressable>
    )
}