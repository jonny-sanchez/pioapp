import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type TextInfoProps = {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>
}

export default function TextInfo({
    children,
    style
} : TextInfoProps){

    const theme = useTheme()

    return (
        <Text variant='titleMedium' style={[
            { color: theme.colors.secondary },
            style
        ]}>{ children }</Text>
    );
}