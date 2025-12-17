import PageLoadingInit from "components/Screens/PageLoadingInit";
import React, { useEffect, useState } from "react";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated"

type AppInitTransitionType = {
    loading:boolean;
    children?:React.ReactNode
}

export default function AppInitTransition({ 
  loading, 
  children 
} : AppInitTransitionType) {

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timeout = setTimeout( () => {
            setShowContent(true)
        }, 500)
        return () => clearTimeout(timeout)
    }, [loading])

    if (loading || !showContent) {
      return (
        <Animated.View
            entering={FadeIn.duration(400).easing(Easing.out(Easing.ease))}
            style={{ flex: 1 }}
        >
          <PageLoadingInit loading={loading}/>
        </Animated.View>
      )
    }  

    return children;
}
