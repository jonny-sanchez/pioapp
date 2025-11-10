import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type ListItemComponentType = {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    iconLeft?: string;
    styleList?: StyleProp<ViewStyle>;
    rightElements?: React.ReactNode;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
}

export default ListItemComponentType