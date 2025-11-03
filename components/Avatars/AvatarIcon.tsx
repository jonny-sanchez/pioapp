import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

type AvatarIconType = {
    icon?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
    color?: string | undefined;
}

export default function AvatarIcon({
    icon = '',
    size,
    style,
    color
} : AvatarIconType) {

    return (
        <>
            <Avatar.Icon icon={icon} size={size} style={[style]} color={color}/>
        </>
    )
}