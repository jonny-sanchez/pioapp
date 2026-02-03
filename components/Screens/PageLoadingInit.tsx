import { ActivityIndicator, useTheme } from "react-native-paper"
import { View } from "react-native"
import BoxImage from "components/container/BoxImage"
import { LOGOPINULITOORIGINAL } from "assets/Providers/ImageProvider"
import ProgressBarItem from "components/Progress/ProgressBarItem"
import { useEffect, useState } from "react"
import BoxImageAnimatedFloat from "components/Animaciones/BoxImageAnimatedFloat"

type PageLoadingInitProps = {
    loading: boolean;
}

export default function PageLoadingInit({
    loading
} : PageLoadingInitProps){

    const theme = useTheme()
    const [progressLoading, setProgressLoading] = useState<number>(0)

    // const handleProgressInit = () => {
    //     const interval = setInterval(() => {
    //         setProgressLoading(prev => {
    //             if (prev >= 1) return 1
    //             return prev + 0.05         
    //         })
    //     }, 80)
    //     return () => clearInterval(interval);
    // }

    // useEffect(() => { !loading && setProgressLoading(1) }, [loading])

    // useEffect(() => { handleProgressInit() }, [])

    return (
        <View className="flex-1 w-full items-center justify-center gap-10" style={{ backgroundColor: theme.colors.background }}>
            <ActivityIndicator animating={true} size={'large'} color={theme.colors.primary} />
            {/* <BoxImageAnimatedFloat width={70} height={80} img={LOGOPINULITOORIGINAL}/>
            <ProgressBarItem width={120} height={10} style={{ borderRadius: 3 }} progress={progressLoading}/> */}
        </View>
    )
}