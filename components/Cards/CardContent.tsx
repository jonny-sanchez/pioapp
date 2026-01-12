import React from "react"
import { StyleProp, ViewStyle } from "react-native";
import { Card } from "react-native-paper"

type CardContentType = {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
    classNameCardContent?: string; 
}

export default function CardContent({
    children,
    className = '',
    style,
    classNameCardContent
} : CardContentType) {

    return (
        <>
            <Card style={[style]} className={className}>
                <Card.Content className={classNameCardContent}>
                    { children }
                </Card.Content>
            </Card>
        </>
    )
}