import React from "react"
import { Card } from "react-native-paper"

type CardContentType = {
    children?: React.ReactNode;
    className?: string;
}

export default function CardContent({
    children,
    className = ''
} : CardContentType) {

    return (
        <>
            <Card className={className}>
                <Card.Content>
                    { children }
                </Card.Content>
            </Card>
        </>
    )
}