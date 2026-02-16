import React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { TouchableRipple } from "react-native-paper";

type TouchRippleType = {
    children?: React.ReactNode;
    onPress?: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void)) | undefined;
    style?: StyleProp<ViewStyle> | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
}

//si al componenete no le pasa un onPress no funciona y no se ve el efecto
export default function TouchRipple({
    children,
    onPress,
    style,
    className,
    disabled
} : TouchRippleType) {

    return (
        <>
            <TouchableRipple
              style={[style]}
              onPress={onPress}
              className={className}
              disabled={disabled}
            //   rippleColor="rgba(0, 0, 0, .32)"
            >
                { children }
            </TouchableRipple>
        </>
    )
}