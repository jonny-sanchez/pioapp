import React from "react";
import { GestureResponderEvent } from "react-native";
import { TouchableRipple } from "react-native-paper";

type TouchRippleType = {
    children?: React.ReactNode;
    onPress?: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void)) | undefined
}

//si al componenete no le pasa un onPress no funciona y no se ve el efecto
export default function TouchRipple({
    children,
    onPress
} : TouchRippleType) {

    return (
        <>
            <TouchableRipple
              onPress={onPress}
            //   rippleColor="rgba(0, 0, 0, .32)"
            >
                { children }
            </TouchableRipple>
        </>
    )
}