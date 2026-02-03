import React, { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";

type AvatarIconType = {
    icon?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
    trigger?: any;
}

export default function AvatarIcon({
    icon = '',
    size = 40,
    style,
    color,
    trigger
}: AvatarIconType) {

    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (trigger === undefined) return;

        scale.value = withSpring(1.4, { damping: 8 });
        rotation.value = withTiming(rotation.value + 1, { duration: 400 });

        setTimeout(() => {
            scale.value = withSpring(1, { damping: 10 });
        }, 150);

    }, [trigger]);

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = `${interpolate(
            rotation.value,
            [0, 1],
            [0, 360]
        )}deg`;

        return {
            transform: [
                { scale: scale.value },
                { rotate }
            ]
        };
    });

    return (
        <Animated.View style={[animatedStyle]}>
            <Avatar.Icon icon={icon} size={size} color={color} style={style}/>
        </Animated.View>
    );
}
