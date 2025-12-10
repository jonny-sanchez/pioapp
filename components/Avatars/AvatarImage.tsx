import { ImageSourcePropType } from "react-native";
import { Avatar } from "react-native-paper";

type AvatarImageType = {
    size?: number | undefined;
    img: ImageSourcePropType;
}

export default function AvatarImage({
    size = 24,
    img
} : AvatarImageType) {

    return (
        <>
            <Avatar.Image size={size} source={img} />
        </>
    )

}