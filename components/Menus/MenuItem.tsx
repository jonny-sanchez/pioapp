import { GestureResponderEvent } from "react-native";
import { Menu } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type MenuItemType = {
    onPress?: ((e: GestureResponderEvent) => void) | undefined
    title?: React.ReactNode;
    leadingIcon?: IconSource | undefined;
    trailingIcon?: IconSource | undefined;
}

export default function MenuItem ({
    title,
    onPress,
    leadingIcon,
    trailingIcon
} : MenuItemType) {

    return (
        <>
            <Menu.Item 
                onPress={onPress} 
                title={title} 
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
            />
        </>
    )
}