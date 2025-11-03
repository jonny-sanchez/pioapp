import Animated, { FadeInUp, FadeOutUp, Easing } from "react-native-reanimated"

type ToggleContainerAnimatedProps = {
    visible?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export default function ToggleContainerAnimated({
    visible = false,
    children,
    className = ''
}: ToggleContainerAnimatedProps) {

    return (
        <>  
            {  
                visible && (
                    <Animated.View
                        entering={FadeInUp.duration(150).easing(Easing.inOut(Easing.quad))}
                        exiting={FadeOutUp.duration(150).easing(Easing.inOut(Easing.quad))}
                        className={className}
                    >
                        { children }
                    </Animated.View>
                )
            }  
        </>
    )
}