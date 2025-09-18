import { StyleProp, ViewStyle } from "react-native";
import { Chip, Text } from "react-native-paper";

type ChipDecorationProps = {
    title?: string;
    icon?: string;
    style?: StyleProp<ViewStyle>
}

export default function ChipDecoration({
    title = '',
    icon = '',
    style = {}
} : ChipDecorationProps){

    return (
        <Chip style={[style]} mode="outlined" icon={icon}>
            <Text variant="labelSmall">{ title }</Text>
        </Chip>
    )
}