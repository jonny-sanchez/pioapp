import React from "react";
import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

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
}

export default ListItemComponentType