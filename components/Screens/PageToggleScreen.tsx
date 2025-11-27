import ToggleContainerAnimated from "components/Animaciones/ToggleContainerAnimated"
import React from "react"
import { GestureResponderEvent, View } from "react-native"
import { IconButton, useTheme } from "react-native-paper"
import { AppTheme } from "types/ThemeTypes"

type PageToggleScreenType = {
    onPressIconClose?: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void)) | undefined;
    visible?: boolean;
    children?: React.ReactNode;
}

export default function PageToggleScreen({
    onPressIconClose,
    visible = false,
    children
} : PageToggleScreenType) {

    const theme:AppTheme = useTheme() as AppTheme

    return (
        <>
            <ToggleContainerAnimated 
                className="flex-1 absolute w-full h-full top-0 left-0 z-10 px-[18]" 
                style={{ backgroundColor: theme.colors.background }}
                visible={visible}
            >       
                <View className="w-full h-full relative">
                    <IconButton 
                        style={{ position: 'absolute', top: 10, left: 0, zIndex: 10 }}
                        icon={'close'} 
                        size={30} 
                        onPress={onPressIconClose}
                    />
                    { children }
                </View>
            </ToggleContainerAnimated>
        </>
    )
}