import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type TitleProps = {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

export default function Title({ 
    children,
    style 
} : TitleProps){

    const theme = useTheme()

    return (
        <Text variant='headlineLarge' style={[{ color: theme.colors.primary, fontWeight: 'condensed' }, style]}>{ children }</Text>
    )
}