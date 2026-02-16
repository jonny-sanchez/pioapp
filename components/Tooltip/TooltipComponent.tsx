import React from "react";
import { Tooltip } from "react-native-paper";

type TooltipComponentProps = {
    title: string;
    children?: React.ReactElement;
}

export default function TooltipComponent({
    title,
    children
}:TooltipComponentProps) {

    return (
        <>
            <Tooltip title={title}>
                {children??<React.Fragment/>}
            </Tooltip>
        </>
    )
}