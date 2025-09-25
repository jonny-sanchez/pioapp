import { useTheme } from "react-native-paper"
import { View } from "react-native"
import BoxImage from "components/container/BoxImage"

export default function PageLoadingInit(){
    const theme = useTheme()

    return (
        <View className="flex-1 w-full items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
            <BoxImage width={70} height={80} img={require('assets/images/LOGOPINULITOORIGINAL.png')}/>
        </View>
    )
}