import { StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInUp, FadeOutUp, Easing, AnimatedStyle } from "react-native-reanimated"

type ToggleContainerAnimatedProps = {
    visible?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}

export default function ToggleContainerAnimated({
    visible = false,
    children,
    className = '',
    style
}: ToggleContainerAnimatedProps) {

    return (
        <>  
            {  
                visible && (
                    <Animated.View
                        entering={FadeInUp.duration(150).easing(Easing.inOut(Easing.quad))}
                        exiting={FadeOutUp.duration(150).easing(Easing.inOut(Easing.quad))}
                        className={className}
                        style={[style]}
                    >
                        { children }
                    </Animated.View>
                )
            }  
        </>
    )
}