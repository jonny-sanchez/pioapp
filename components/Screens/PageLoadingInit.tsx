import { Text } from "react-native-paper"
import { View } from "react-native"
import BoxImage from "components/container/BoxImage"

export default function PageLoadingInit(){
    return (
        <View className="flex-1 w-full items-center justify-center">
            <BoxImage width={70} height={80} img={require('assets/images/LOGOPINULITOORIGINAL.png')}/>
        </View>
    )
}