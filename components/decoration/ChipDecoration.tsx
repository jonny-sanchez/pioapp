import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Chip, Text } from "react-native-paper";

type ChipDecorationProps = {
    title?: string;
    icon?: string;
    style?: StyleProp<ViewStyle>;
    mode?: "flat" | "outlined" | undefined;
    onPress?: ((e: GestureResponderEvent) => void) | undefined
}

export default function ChipDecoration({
    title = '',
    icon = '',
    style = {},
    mode = 'outlined',
    onPress
} : ChipDecorationProps){

    return (
        <Chip style={[style]} mode={mode} icon={icon} onPress={onPress}>
            <Text variant="labelSmall">{ title }</Text>
        </Chip>
    )
}