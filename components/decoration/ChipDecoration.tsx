import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Chip, Text } from "react-native-paper";

type ChipDecorationProps = {
    title?: string;
    icon?: string;
    style?: StyleProp<ViewStyle>;
    mode?: "flat" | "outlined" | undefined;
    onPress?: ((e: GestureResponderEvent) => void) | undefined;
    disabled?: boolean | undefined;
}

export default function ChipDecoration({
    title = '',
    icon = '',
    style = {},
    mode = 'outlined',
    onPress,
    disabled
} : ChipDecorationProps){

    return (
        <Chip style={[style]} mode={mode} icon={icon} onPress={onPress} disabled={disabled}>
            <Text variant="labelSmall">{ title }</Text>
        </Chip>
    )
}