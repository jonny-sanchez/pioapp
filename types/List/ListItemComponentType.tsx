import React from "react";
import { StyleProp, ViewStyle } from "react-native";

type ListItemComponentType = {
    title?: string;
    description?: string;
    iconLeft?: string;
    styleList?: StyleProp<ViewStyle>;
    rightElements?: React.ReactNode
}

export default ListItemComponentType