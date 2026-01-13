// import PageLoadingInit from "components/Screens/PageLoadingInit";
// import React, { useEffect, useState } from "react";
// import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated"

// type AppInitTransitionType = {
//     loading:boolean;
//     children?:React.ReactNode
// }

// export default function AppInitTransition({ 
//   loading, 
//   children 
// } : AppInitTransitionType) {

//     const [showContent, setShowContent] = useState(false);

//     useEffect(() => {
//         const timeout = setTimeout( () => {
//             setShowContent(true)
//         }, 500)
//         return () => clearTimeout(timeout)
//     }, [loading])

//     if (loading || !showContent) {
//       return (
//         <Animated.View
//             entering={FadeIn.duration(400).easing(Easing.out(Easing.ease))}
//             style={{ flex: 1 }}
//         >
//           <PageLoadingInit loading={loading}/>
//         </Animated.View>
//       )
//     }  

//     return children;
// }

import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  Easing
} from "react-native-reanimated";
import PageLoadingInit from "components/Screens/PageLoadingInit";
import { useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

type AppInitTransitionType = {
  loading: boolean;
  children?: React.ReactNode;
};

export default function AppInitTransition({
  loading,
  children
}: AppInitTransitionType) {

  const theme = useTheme() as AppTheme

  return (
    <Animated.View style={{ flex: 1, backgroundColor: theme.colors.background }} layout={Layout.duration(400)}>
      
      {loading ? (
        <Animated.View
          key="loader"
          entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
          // entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
          exiting={FadeOut.duration(200).easing(Easing.inOut(Easing.quad))}
          style={{ flex: 1 }}
        >
          <PageLoadingInit loading/>
        </Animated.View>
      ) : (
        <Animated.View
          key="app"
          entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
          exiting={FadeOut.duration(200).easing(Easing.inOut(Easing.quad))}
          style={{ flex: 1 }}
        >
          {children}
        </Animated.View>
      )}

    </Animated.View>
  );
}
