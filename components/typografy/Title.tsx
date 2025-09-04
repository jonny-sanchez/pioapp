import React from 'react';
import { Text, useTheme } from 'react-native-paper';

type TitleProps = {
    children: React.ReactNode
}

export default function Title({ 
    children 
} : TitleProps){

    const theme = useTheme()

    return (
        <Text variant='headlineLarge' style={{ color: theme.colors.primary, fontWeight: 'condensed' }}>{ children }</Text>
    )
}