import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Chip, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type ChipDecorationProps = {
    title?: string;
    icon?: string;
    style?: StyleProp<ViewStyle>;
    mode?: "flat" | "outlined" | undefined;
    onPress?: ((e: GestureResponderEvent) => void) | undefined;
    disabled?: boolean | undefined;
    closeIcon?: IconSource | undefined;
    onClose?: (() => void) | undefined;
}

export default function ChipDecoration({
    title = '',
    icon = '',
    style = {},
    mode = 'outlined',
    onPress,
    disabled,
    closeIcon,
    onClose
} : ChipDecorationProps){

    return (
        <Chip 
            style={[style]} 
            mode={mode} 
            icon={icon} 
            onPress={onPress} 
            disabled={disabled} 
            closeIcon={closeIcon}
            onClose={onClose}
        >
            <Text variant="labelSmall">{ title }</Text>
        </Chip>
    )
}