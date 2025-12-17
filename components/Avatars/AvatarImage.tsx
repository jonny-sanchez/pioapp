import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

type AvatarImageType = {
    size?: number | undefined;
    img: ImageSourcePropType;
    style?: StyleProp<ViewStyle>;
}

export default function AvatarImage({
    size = 24,
    img,
    style
} : AvatarImageType) {

    return (
        <>
            <Avatar.Image style={[style]} size={size} source={img} />
        </>
    )

}