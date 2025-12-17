import React from "react";
import { ColorValue, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";

type ListItemComponentType = {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    iconLeft?: string;
    styleList?: StyleProp<ViewStyle>;
    rightElements?: React.ReactNode;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    className?: string;
    rippleColor?: ColorValue | undefined;
    leftElements?: React.ReactNode;
    descriptionNumberOfLines?: number | undefined;
    onPress?: (((event: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void) & ((e: GestureResponderEvent) => void)) | undefined
}

export default ListItemComponentType