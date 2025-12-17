import React from "react";
import { GestureResponderEvent } from "react-native";
import { List } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type AccordionType = {
    children?: React.ReactNode;
    title?: string;
    iconLeft?: IconSource;
    expanded?: boolean | undefined;
    onPress?: ((e: GestureResponderEvent) => void) | undefined;
}

export default function Accordion({
    children,
    title = '',
    iconLeft = '',
    expanded,
    onPress
} : AccordionType) {

    return (
        <>
            <List.Accordion 
                expanded={expanded}
                onPress={onPress}
                title={title} 
                left={
                    props => 
                        (iconLeft && <List.Icon {...props} icon={iconLeft} />)
                }
            >
                { children }
            </List.Accordion>
        </>
    )
}