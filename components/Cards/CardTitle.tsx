import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Avatar, Card, IconButton, useTheme } from 'react-native-paper';
import { Pressable } from 'react-native';
import React from 'react';

type CardTitleProps = {
  title?: string;
  subtitle?: string;
  size?: number;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  rightElement?: React.ReactNode
}

export default function CardTitle({ 
  title = '',
  subtitle = '',
  size = 45,
  icon = '',
  style = {},
  onPress = () => {},
  rightElement
} : CardTitleProps){

    const theme = useTheme()

    return (
      <Pressable onPress={onPress}>
        <Card.Title
          style={[
            { borderColor: theme.colors.surfaceVariant, borderWidth: 1, borderRadius: 4 },
            style
          ]}
          title={title}
          subtitle={subtitle}
          left={(props) => <Avatar.Icon { ...props } size={size}  icon={icon} />}
          right={
            () => (
              rightElement
              // <IconButton  icon="dots-vertical"/>
            ) 
          }
        />
      </Pressable>
    )

}